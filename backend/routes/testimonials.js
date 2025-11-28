const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");

// GET /api/testimonials - public
router.get("/", async (req, res) => {
  try {
    const list = await Testimonial.find().sort({ createdAt: -1 }).limit(50);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/testimonials - protected
router.post("/", auth, async (req, res) => {
  const { name, review, rating } = req.body;
  if (!name || !review) return res.status(400).json({ error: "Name and review required" });
  try {
    const t = new Testimonial({ name, review, rating: rating || 5 });
    await t.save();
    res.status(201).json(t);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /api/testimonials/:id - protected
router.delete("/:id", auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
