// backend/routes/admin.js
const express = require("express");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const router = express.Router();

const rz = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

// admin payments list
router.get("/payments", authMiddleware, adminMiddleware, async (req, res) => {
  const list = await Payment.find().sort({ createdAt: -1 }).limit(200);
  res.json(list);
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
