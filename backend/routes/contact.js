// backend/routes/contact.js
const express = require("express");
const { sendMail } = require("../utils/mail");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, business, email, phone, message } = req.body;
    const html = `
      <p>New contact request</p>
      <ul>
        <li>Name: ${name}</li>
        <li>Business: ${business}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
      </ul>
      <p>Message: ${message}</p>
    `;
    await sendMail({ to: process.env.EMAIL_TO || process.env.SMTP_USER, subject: "New contact from site", html });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
