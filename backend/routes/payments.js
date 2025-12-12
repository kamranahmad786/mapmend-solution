// backend/routes/payments.js
const express = require("express");
const crypto = require("crypto");
const { authMiddleware } = require("../middleware/auth");
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const { generateInvoiceBuffer } = require("../services/invoiceService");
const { sendMail } = require("../utils/mail");
const router = express.Router();

const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// create-order
router.post("/create-order", authMiddleware, async (req, res) => {
  const { planId } = req.body;
  // map planId to amount & title
  const plans = {
    starter: { amount: 99900, title: "Starter" },
    business: { amount: 199900, title: "Business" },
    premium: { amount: 449900, title: "Premium" }
  };
  const plan = plans[planId] || plans.business;
  const order = await rz.orders.create({ amount: plan.amount, currency: "INR", receipt: `rcpt_${Date.now()}` });
  // store payment record
  const p = await Payment.create({
    user: req.user._id,
    userEmail: req.user.email,
    planId,
    planTitle: plan.title,
    amount: plan.amount,
    razorpayOrderId: order.id,
    status: "created"
  });
  res.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID, amount: plan.amount, paymentId: p._id });
});

// verify (webhook or after checkout)
router.post("/verify", authMiddleware, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");
  if (expected !== razorpay_signature) return res.status(400).json({ error: "Invalid signature" });

  // find payment by order id
  const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id });
  if (!payment) return res.status(404).json({ error: "Payment record not found" });

  payment.razorpayPaymentId = razorpay_payment_id;
  payment.razorpaySignature = razorpay_signature;
  payment.status = "paid";
  await payment.save();

  // generate invoice PDF and email to customer
  const pdfBuf = await generateInvoiceBuffer({ payment });
  await sendMail({
    to: payment.userEmail,
    subject: "Your MapMend Invoice",
    html: `<p>Thanks for your purchase.</p>`,
    attachments: [{ filename: `invoice_${payment._id}.pdf`, content: pdfBuf }]
  });

  res.json({ ok: true });
});

// get invoice
router.get("/:id/invoice", authMiddleware, async (req, res) => {
  const pay = await Payment.findById(req.params.id);
  if (!pay) return res.status(404).json({ error: "Not found" });
  // security: allow owner or admin
  if (String(pay.user) !== String(req.user._id) && req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const buf = await generateInvoiceBuffer({ payment: pay });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=invoice_${pay._id}.pdf`);
  res.send(buf);
});

module.exports = router;
