// backend/routes/admin.js
const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Site = require("../models/Site");
const Contact = require("../models/Contact");
const Razorpay = require("razorpay");
const { generateInvoiceBuffer } = require("../services/invoiceService");
const { sendMail } = require("../utils/mail");
const { siteStatusUpdateEmail, paymentConfirmationEmail } = require("../services/emailTemplates");
const router = express.Router();

const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// --- Admin Endpoints ---

// 1. Get all Users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get User by ID (Admin only)
router.get("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a User
router.delete("/users/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.id) {
      return res.status(400).json({ error: "Cannot delete yourself." });
    }
    await User.findByIdAndDelete(req.params.id);
    await Site.deleteMany({ userId: req.params.id }); // Clean up attached sites
    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 1.5 System Metrics for Overview Dashboard
router.get("/metrics", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const leadsCount = await Contact.countDocuments({ status: "unread" });
    const sitesCount = await Site.countDocuments();

    // Count both Razorpay 'captured' AND manual 'paid' payments
    const payments = await Payment.find({ status: { $in: ["paid", "captured"] } });
    const revenueSum = payments.reduce((acc, curr) => acc + curr.amount, 0) / 100;
    const paymentsCount = payments.length;

    // Last 5 transactions for visual overview
    const recentRecent = await Payment.find({ status: { $in: ["paid", "captured"] } })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      users:    usersCount,
      leads:    leadsCount,
      sites:    sitesCount,
      revenue:  revenueSum,
      payments: paymentsCount,
      recent:   recentRecent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Get all Leads (Inbox)
router.get("/contacts", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const leads = await Contact.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update lead status (e.g. mark as read/resolved)
router.put("/contacts/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const lead = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Get all Sites
router.get("/sites", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const sites = await Site.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN: Add a website for any user
router.post("/sites", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, domain, name, seoScore, pagespeedScore, status } = req.body;
    if (!userId || !domain) return res.status(400).json({ error: "userId and domain are required" });

    const owner = await User.findById(userId).select("name email");
    if (!owner) return res.status(404).json({ error: "User not found" });

    const site = await Site.create({
      user:          userId,
      domain:        domain.trim().replace(/^https?:\/\//i, ""),
      name:          name || domain,
      seoScore:      seoScore || null,
      pagespeedScore: pagespeedScore || null,
      status:        status || "pending",
    });

    // Notify the client via email
    if (owner.email) {
      const tpl = siteStatusUpdateEmail({
        name:   owner.name || owner.email,
        email:  owner.email,
        domain: site.domain,
        status: site.status,
      });
      sendMail({ to: owner.email, ...tpl });
    }

    res.json(site);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update Site (status, scores, domain, name, handoverDate)
router.put("/sites/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status, seoScore, pagespeedScore, domain, name, handoverDate } = req.body;
    const updateFields = { lastChecked: Date.now() };
    if (status         !== undefined) updateFields.status         = status;
    if (seoScore       !== undefined) updateFields.seoScore       = seoScore;
    if (pagespeedScore !== undefined) updateFields.pagespeedScore = pagespeedScore;
    if (domain         !== undefined) updateFields.domain         = domain.trim().replace(/^https?:\/\//i, "");
    if (name           !== undefined) updateFields.name           = name;

    // handoverDate: explicit value takes priority, otherwise auto-set when going active/completed
    if (handoverDate !== undefined) {
      updateFields.handoverDate = handoverDate ? new Date(handoverDate) : null;
    } else if ((status === "active" || status === "completed")) {
      // Auto-set handover date the first time site goes live
      const existing = await Site.findById(req.params.id).select("handoverDate");
      if (existing && !existing.handoverDate) {
        updateFields.handoverDate = new Date();
      }
    }

    const site = await Site.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    if (!site) return res.status(404).json({ error: "Site not found" });

    // Send status update email only when status explicitly changes
    if (status !== undefined) {
      const owner = await User.findById(site.user).select("name email");
      if (owner?.email) {
        const tpl = siteStatusUpdateEmail({
          name:         owner.name || owner.email,
          email:        owner.email,
          domain:       site.domain,
          status:       status,
          handoverDate: site.handoverDate
            ? new Date(site.handoverDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
            : null,
        });
        sendMail({ to: owner.email, ...tpl });
      }
    }

    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a Site
router.delete("/sites/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Site.findByIdAndDelete(req.params.id);
    res.json({ ok: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get all Payments (Razorpay + Manual)
router.get("/payments", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const list = await Payment.find().populate("user", "name email").sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADMIN: Record a manual payment (cash/offline) + send invoice email
router.post("/payments/manual", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { userId, planId, planTitle, amount, note } = req.body;
    if (!userId || !amount) return res.status(400).json({ error: "userId and amount are required" });

    const owner = await User.findById(userId).select("name email");
    if (!owner) return res.status(404).json({ error: "User not found" });

    const amountInPaise = Math.round(Number(amount) * 100);

    const payment = await Payment.create({
      user:          userId,
      userEmail:     owner.email,
      planId:        planId || "manual",
      planTitle:     planTitle || "Manual / Offline Payment",
      amount:        amountInPaise,
      razorpayOrderId: `MANUAL-${Date.now()}`,
      status:        "paid",
      note:          note || "",
    });

    // Generate PDF and email it to client
    const pdfBuf = await generateInvoiceBuffer({ payment });
    const tpl = paymentConfirmationEmail({
      name:        owner.name || owner.email,
      email:       owner.email,
      planTitle:   payment.planTitle,
      amount:      amountInPaise,
      orderId:     payment.razorpayOrderId,
      paymentId:   "Manual / Offline",
      invoiceDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    });
    sendMail({
      to: owner.email,
      ...tpl,
      attachments: [{ filename: `MapMend_Invoice_${payment._id}.pdf`, content: pdfBuf, contentType: "application/pdf" }],
    });

    res.json({ ok: true, payment });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// refund
router.post("/payments/refund", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { paymentId } = req.body;
    const p = await Payment.findById(paymentId);
    if (!p) return res.status(404).json({ error: "Payment not found" });
    if (p.status === "refunded") return res.status(400).json({ error: "Already refunded" });
    const refund = await rz.payments.refund(p.razorpayPaymentId);
    p.status = "refunded";
    p.refundId = refund.id;
    await p.save();
    res.json({ ok: true, refund });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
