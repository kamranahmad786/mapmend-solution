// backend/routes/auth.js
const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { authMiddleware } = require("../middleware/auth");
const { sendMail } = require("../utils/mail");
const { welcomeEmail } = require("../services/emailTemplates");
const router = express.Router();

// register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Missing fields" });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, passwordHash });

    // Send welcome email (non-blocking)
    const tpl = welcomeEmail({ name: name || email.split("@")[0] });
    sendMail({ to: email, ...tpl });

    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    if (user.authProvider === "google") {
      return res.status(400).json({ error: "This account uses Google Sign-In. Please use the Google button to log in." });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// google sign-in
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ error: "Missing ID token" });

    // Verify the Firebase ID token via Identity Toolkit REST API
    const googleRes = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FIREBASE_API_KEY}`,
      { idToken },
      { headers: { Referer: "https://project-cost-tracker-6866f.firebaseapp.com/" } }
    );
    const userInfo = googleRes.data.users?.[0];
    if (!userInfo || !userInfo.email) {
      return res.status(400).json({ error: "Google token verification failed" });
    }

    const { email, displayName, photoUrl } = userInfo;

    // Find or create user
    let user = await User.findOne({ email });
    if (user) {
      // Update Google profile info if missing
      if (!user.photoURL && photoUrl) user.photoURL = photoUrl;
      if (!user.name && displayName) user.name = displayName;
      if (user.authProvider === "local") user.authProvider = "google";
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        name: displayName || email.split("@")[0],
        email,
        authProvider: "google",
        photoURL: photoUrl || "",
      });

      // Send welcome email (non-blocking)
      const tpl = welcomeEmail({ name: displayName || email.split("@")[0] });
      sendMail({ to: email, ...tpl });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("Google auth error:", err.response?.data || err.message);
    res.status(401).json({ error: "Google authentication failed" });
  }
});

// me
router.get("/me", authMiddleware, (req, res) => {
  const { _id, name, email, role, authProvider, photoURL } = req.user;
  res.json({ id: _id, name, email, role, authProvider: authProvider || "local", photoURL: photoURL || "" });
});

// update profile (name / email)
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (existing) return res.status(400).json({ error: "Email already in use" });
    }
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { ...(name && { name }), ...(email && { email }) },
      { new: true }
    ).select("-passwordHash");
    res.json({ ok: true, user: updated });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// change password
router.put("/password", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.authProvider === "google") {
      return res.status(400).json({ error: "Google-authenticated accounts cannot change password here. Manage your password via Google Account settings." });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ error: "Both fields required" });
    if (newPassword.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters" });
    const match = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!match) return res.status(400).json({ error: "Current password is incorrect" });
    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();
    res.json({ ok: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
