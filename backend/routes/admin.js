// backend/routes/admin.js
const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Site = require("../models/Site");
const Contact = require("../models/Contact");
const Razorpay = require("razorpay");
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

// 3. Get all Sites / Audits mapping
router.get("/sites", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    // Populate the userId to see who owns it
    const sites = await Site.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get all Payments
router.get("/payments", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const list = await Payment.find().populate("userId", "name email").sort({ createdAt: -1 }).limit(200);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// refund
router.post("/payments/refund", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { paymentId } = req.body; // our Payment._id
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
