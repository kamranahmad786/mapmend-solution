// backend/services/razorpayService.js
const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const User = require("../models/User");

const rz = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async ({ amount, receipt }) => {
  // amount in paise (e.g. 199900)
  const order = await rz.orders.create({ amount, currency: "INR", receipt, payment_capture: 1 });
  return order;
};

exports.refund = async ({ payment_id, amount }) => {
  // returns refund object
  return rz.payments.refund(payment_id, { amount });
};

exports.verifySignature = (body) => {
  // use server-side verify in controller using razorpay-signature library or manual HMAC
  // We'll verify later in controller using crypto
};
