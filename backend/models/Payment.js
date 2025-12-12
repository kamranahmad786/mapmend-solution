// backend/models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: String,
  planId: String,
  planTitle: String,
  amount: Number,    // amount in paise
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: { type: String, default: "created" }, // created, paid, refunded
  refundId: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
