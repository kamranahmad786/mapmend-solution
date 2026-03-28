// backend/models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  review: String,
  rating: { type: Number, default: 5 },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);
