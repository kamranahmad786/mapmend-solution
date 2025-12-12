// backend/routes/testimonials.js
const express = require("express");
const Testimonial = require("../models/Testimonial");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const router = express.Router();

// public list (approved)
router.get("/", async (req, res) => {
  const list = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
  res.json(list);
});

// create (public)
router.post("/", async (req, res) => {
  const { name, review, rating } = req.body;
  const t = await Testimonial.create({ name, review, rating: rating || 5, approved: false });
  res.json({ ok: true, id: t._id });
});

// admin approve
router.post("/:id/approve", authMiddleware, adminMiddleware, async (req, res) => {
  const t = await Testimonial.findById(req.params.id);
  if (!t) return res.status(404).json({ error: "Not found" });
  t.approved = true;
  await t.save();
  res.json({ ok: true });
});

module.exports = router;
