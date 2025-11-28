const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const messages = []; // fallback in-memory store

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

router.post("/", async (req, res) => {
  const { name, business, email, phone, message } = req.body;
  if (!name || !phone || !message) return res.status(400).json({ error: "name, phone and message required" });

  const msg = { id: messages.length + 1, name, business, email, phone, message, receivedAt: new Date() };
  messages.push(msg);

  try {
    if (process.env.CONTACT_RECEIVER_EMAIL && transporter) {
      const mail = {
        from: `"MapMend Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL,
        subject: `New contact from ${name} - ${business || "No business provided"}`,
        text: `Name: ${name}\nBusiness: ${business}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`
      };
      await transporter.sendMail(mail);
    }
  } catch (err) {
    console.error("Error sending email:", err.message);
  }

  res.json({ success: true, message: "Received. We will contact you shortly." });
});

module.exports = router;
