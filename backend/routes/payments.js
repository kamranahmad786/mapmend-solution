// backend/routes/payments.js
const express = require("express");
const crypto = require("crypto");
const { authMiddleware } = require("../middleware/auth");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Razorpay = require("razorpay");
const { generateInvoiceBuffer } = require("../services/invoiceService");
const { sendMail } = require("../utils/mail");
const { paymentConfirmationEmail } = require("../services/emailTemplates");
const router = express.Router();

const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// Shared Logic: Fullfill Order (Mark Paid, Send Email, Generate Invoice)
async function completePayment({ orderId, paymentId, signature, mode = "verify" }) {
  try {
    const payment = await Payment.findOne({ razorpayOrderId: orderId });
    if (!payment) {
      console.error(`[PAYMENT ERROR] Record not found for Order ${orderId}`);
      return { error: "Payment record not found" };
    }

    // Already processed (webhook and verify can both hit this)
    if (payment.status === "paid" || payment.status === "captured") {
      return { ok: true, alreadyProcessed: true };
    }

    payment.razorpayPaymentId = paymentId;
    payment.razorpaySignature = signature;
    payment.status = "paid";
    await payment.save();

    console.log(`[PAYMENT SUCCESS] ${payment.userEmail} paid ₹${payment.amount/100} for ${payment.planTitle} (${mode})`);

    // 1. Get user details for the email
    const user = await User.findById(payment.user);
    const userName = user?.name || payment.userEmail?.split("@")[0] || "Customer";

    // 2. Generate PDF invoice buffer
    const pdfBuf = await generateInvoiceBuffer({ payment }).catch(err => {
      console.error("[INVOICE PDF ERROR]", err);
      return null;
    });

    // 3. Send payment confirmation email with PDF attached
    const tpl = paymentConfirmationEmail({
      name:        userName,
      email:       payment.userEmail,
      planTitle:   payment.planTitle,
      amount:      payment.amount,
      orderId:     orderId,
      paymentId:   paymentId,
      invoiceDate: new Date(payment.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    });

    const attachments = pdfBuf ? [{
      filename: `MapMend_Invoice_${payment._id}.pdf`,
      content:  pdfBuf,
      contentType: "application/pdf",
    }] : [];

    await sendMail({ to: payment.userEmail, ...tpl, attachments });

    // 4. Alert Admin
    await sendMail({
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      subject: `💰 New Payment: ₹${(payment.amount / 100).toLocaleString("en-IN")} — ${payment.planTitle} Plan`,
      html: `<p>New payment received from <strong>${payment.userEmail}</strong> for the <strong>${payment.planTitle}</strong> plan.</p><p>Order ID: ${orderId}</p><p>Mode: ${mode}</p>`,
    });

    return { ok: true };
  } catch (err) {
    console.error(`[CRITICAL PAYMENT ERROR] Order ${orderId}:`, err);
    return { error: err.message };
  }
}

// get my payments
router.get("/my", authMiddleware, async (req, res) => {
  let targetUser = req.user._id;

  // Admin override for impersonation
  const impersonateId = req.query.userId || req.headers["x-impersonate-user"];
  if (req.user.role === "admin" && impersonateId) {
    targetUser = impersonateId;
  }

  try {
    const list = await Payment.find({ user: targetUser }).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// create-order
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const { planId } = req.body;
    const plans = {
      starter:  { amount: 99900,  title: "Starter" },
      business: { amount: 199900, title: "Business" },
      premium:  { amount: 449900, title: "Premium" },
    };
    const plan = plans[planId] || plans.business;

    // This is where 401 Authentication Error happens if keys are bad
    const order = await rz.orders.create({ 
      amount: plan.amount, 
      currency: "INR", 
      receipt: `rcpt_${Date.now()}` 
    });

    const p = await Payment.create({
      user: req.user._id,
      userEmail: req.user.email,
      planId,
      planTitle: plan.title,
      amount: plan.amount,
      razorpayOrderId: order.id,
      status: "created",
    });

    res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount: plan.amount, paymentId: p._id });
  } catch (err) {
    console.error("[CREATE ORDER ERROR]", err);
    res.status(500).json({ error: err.message || "Could not create Razorpay order" });
  }
});

// verify (after Razorpay checkout success)
router.post("/verify", authMiddleware, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    // 1. Local Signature Verification
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      console.warn(`[PAYMENT WARNING] Invalid Signature for Order ${razorpay_order_id}`);
      return res.status(400).json({ error: "Invalid signature" });
    }

    // 2. Fulfill Payment
    const result = await completePayment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      mode: "verify"
    });

    if (result.error) return res.status(404).json(result);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Webhook for high-reliability production payments
router.post("/webhook", async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    if (!req.rawBody) {
      console.warn("[WEBHOOK WARNING] No raw body found for signature verification");
      return res.status(400).send("No raw body");
    }

    // Use rawBody from server.js verify middleware
    const expected = crypto
      .createHmac("sha256", secret)
      .update(req.rawBody)
      .digest("hex");

    if (expected !== signature) {
      console.warn("[WEBHOOK WARNING] Invalid signature");
      return res.status(400).send("Invalid signature");
    }

    const { event, payload } = req.body;

    if (event === "payment.captured") {
      const orderId = payload.payment.entity.order_id;
      const paymentId = payload.payment.entity.id;
      
      console.log(`[WEBHOOK] Payment Captured for Order ${orderId}`);
      await completePayment({
        orderId,
        paymentId,
        signature: "WEBHOOK_VERIFIED",
        mode: "webhook"
      });
    }

    res.json({ status: "ok" });
  } catch (err) {
    console.error("[WEBHOOK ERROR]", err);
    res.status(500).send(err.message);
  }
});

// get invoice PDF
router.get("/:id/invoice", authMiddleware, async (req, res) => {
  try {
    const pay = await Payment.findById(req.params.id);
    if (!pay) return res.status(404).json({ error: "Not found" });

    let targetUser = req.user._id;
    const impersonateId = req.query.userId || req.headers["x-impersonate-user"];
    if (req.user.role === "admin" && impersonateId) {
      targetUser = impersonateId;
    }

    // security: allow owner or admin
    if (String(pay.user) !== String(targetUser) && req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const buf = await generateInvoiceBuffer({ payment: pay });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=MapMend_Invoice_${pay._id}.pdf`);
    res.send(buf);
  } catch (err) {
    console.error("[INVOICE ERROR]", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
