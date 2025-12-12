// backend/models/Testimonial.js
const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: { type: Number, default: 5 },
  approved: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);
