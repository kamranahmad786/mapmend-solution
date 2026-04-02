// backend/utils/mail.js
const nodemailer = require("nodemailer");

let transporter;

/**
 * Build transporter lazily so env vars are read at call time.
 * Supports:
 *   - Gmail App Password: set SMTP_SERVICE=gmail, SMTP_USER=you@gmail.com, SMTP_PASS=your_16char_app_password
 *   - Generic SMTP:       set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 */
function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_SERVICE === "gmail" || (process.env.SMTP_HOST || "").includes("gmail")) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,  // Gmail App Password (not your login password)
      },
    });
  } else {
    transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

/**
 * Send an email. Never throws — errors are logged but won't crash the server.
 */
exports.sendMail = async ({ to, subject, html, attachments = [] }) => {
  // If SMTP not configured, log and skip silently
  if (!process.env.SMTP_USER || process.env.SMTP_USER === "you@example.com") {
    console.log(`[MAIL SKIPPED — no SMTP config] To: ${to} | Subject: ${subject}`);
    return null;
  }

  try {
    const from = process.env.EMAIL_FROM || `MapMend Solution <${process.env.SMTP_USER}>`;
    const info = await getTransporter().sendMail({ from, to, subject, html, attachments });
    console.log(`[MAIL SENT] To: ${to} | Subject: ${subject} | ID: ${info.messageId}`);
    return info;
  } catch (err) {
    console.error(`[MAIL ERROR] To: ${to} | Subject: ${subject} | ${err.message}`);
    return null; // Never crash the server on email failure
  }
};
