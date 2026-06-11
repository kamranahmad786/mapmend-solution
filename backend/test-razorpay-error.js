const Razorpay = require('razorpay');
try {
  const rz = new Razorpay({ key_id: undefined, key_secret: undefined });
} catch (err) {
  console.log("Error:", err.message);
}
