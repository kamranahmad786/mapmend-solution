// backend/routes/contact.js
const express = require("express");
const { sendMail } = require("../utils/mail");
const Contact = require("../models/Contact");
const { contactAutoReplyEmail, adminContactAlertEmail } = require("../services/emailTemplates");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, business, email, phone, message } = req.body;

    // 1. Save to Database Inbox
    await Contact.create({ name, business, email, phone, message });

    // 2. Alert Admin via beautiful branded email
    const adminTpl = adminContactAlertEmail({ name, business, email, phone, message });
    sendMail({
      to: process.env.EMAIL_TO || process.env.SMTP_USER,
      ...adminTpl,
    });

    // 3. Auto-reply to the user
    const userTpl = contactAutoReplyEmail({ name, message });
    sendMail({ to: email, ...userTpl });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
