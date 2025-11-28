const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);
