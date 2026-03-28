// backend/routes/sites.js
const express = require("express");
const Site = require("../models/Site");
const { authMiddleware } = require("../middleware/auth");
const router = express.Router();

// create a site (user)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const s = await Site.create({ ...req.body, user: req.user._id });
    res.json(s);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// user's sites
router.get("/my", authMiddleware, async (req, res) => {
  let targetUser = req.user._id;

  // Admin override for impersonation
  const impersonateId = req.query.userId || req.headers["x-impersonate-user"];
  if (req.user.role === "admin" && impersonateId) {
    targetUser = impersonateId;
  }

  const sites = await Site.find({ user: targetUser }).populate("lastPaymentId");
  res.json(sites);
});

// get single site (public)
router.get("/:id", async (req, res) => {
  const site = await Site.findById(req.params.id);
  if (!site) return res.status(404).json({ error: "Not found" });
  res.json(site);
});

module.exports = router;
