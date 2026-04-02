// backend/routes/testimonials.js
const express = require("express");
const Testimonial = require("../models/Testimonial");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");
const { sendMail } = require("../utils/mail");
const { reviewSubmittedEmail } = require("../services/emailTemplates");
const router = express.Router();

// public list (approved) for main website
router.get("/", async (req, res) => {
  const list = await Testimonial.find({ approved: true }).sort({ createdAt: -1 });
  res.json(list);
});

// get my review status (client dashboard)
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const t = await Testimonial.findOne({ user: req.user._id });
    res.json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// create (authenticated submission)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { review, rating, name } = req.body;

    // Client check (prevent duplicates)
    if (req.user.role !== "admin") {
      const existing = await Testimonial.findOne({ user: req.user._id });
      if (existing) return res.status(400).json({ error: "You already submitted a review." });
    }

    const t = await Testimonial.create({
      user: req.user._id,
      name: req.user.role === "admin" && name ? name : req.user.name,
      review,
      rating: rating || 5,
      approved: req.user.role === "admin",
    });

    // Email confirmation to reviewer
    const tpl = reviewSubmittedEmail({
      name: req.user.name || req.user.email,
      review,
      rating: rating || 5,
    });
    sendMail({ to: req.user.email, ...tpl });

    res.json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: Get All (including unapproved)
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
  const list = await Testimonial.find().sort({ createdAt: -1 });
  res.json(list);
});

// ADMIN: Approve/Edit
router.put("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADMIN: Delete
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
