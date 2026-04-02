// backend/services/emailTemplates.js
// All HTML email templates for MapMend Solution

const BASE_URL = process.env.APP_URL || "https://mapmendsolution.com";

/** Shared wrapper — consistent branding for every email */
function wrap(title, bodyHtml) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f0f1a,#1a0f2e);border-radius:16px 16px 0 0;padding:32px 40px;border-bottom:2px solid #06b6d420;text-align:center;">
              <div style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">
                Map<span style="color:#06b6d4;">Mend</span> Solution
              </div>
              <div style="font-size:11px;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">
                Elevate Your Business Online
              </div>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#111116;padding:40px;border-left:1px solid #ffffff10;border-right:1px solid #ffffff10;">
              ${bodyHtml}
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#0a0a0f;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #ffffff10;">
              <p style="margin:0;font-size:12px;color:#4a5568;">
                © ${new Date().getFullYear()} MapMend Solution. All rights reserved.
              </p>
              <p style="margin:8px 0 0;font-size:12px;color:#4a5568;">
                <a href="https://wa.me/917366890727" style="color:#06b6d4;text-decoration:none;">WhatsApp Support</a>
                &nbsp;·&nbsp;
                <a href="${BASE_URL}" style="color:#06b6d4;text-decoration:none;">Visit Website</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Pill-style badge */
function badge(text, color = "#06b6d4") {
  return `<span style="display:inline-block;background:${color}20;color:${color};border:1px solid ${color}40;border-radius:999px;padding:3px 12px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${text}</span>`;
}

/** Section heading */
function h2(text) {
  return `<h2 style="margin:0 0 12px;font-size:22px;font-weight:800;color:#ffffff;">${text}</h2>`;
}

/** Divider */
const divider = `<hr style="border:none;border-top:1px solid #ffffff15;margin:28px 0;" />`;

/** CTA button */
function btn(text, href, color = "#06b6d4") {
  return `
    <div style="text-align:center;margin:28px 0 0;">
      <a href="${href}" style="display:inline-block;background:${color};color:#000000;font-weight:800;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;letter-spacing:0.5px;">
        ${text}
      </a>
    </div>`;
}

/* ─────────────────────────────────────────────────────────────
   1. WELCOME EMAIL  (after registration)
──────────────────────────────────────────────────────────────*/
exports.welcomeEmail = ({ name }) => ({
  subject: "🎉 Welcome to MapMend Solution — Your Dashboard is Ready!",
  html: wrap("Welcome to MapMend", `
    ${h2(`Welcome aboard, ${name}! 👋`)}
    <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;">
      Thank you for joining <strong style="color:#ffffff;">MapMend Solution</strong>. Your client portal is now active and ready. 
      We help local businesses grow with AI-powered websites and Google Maps optimization.
    </p>

    <div style="background:#0f0f1a;border:1px solid #06b6d420;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
      <p style="margin:0 0 12px;font-size:13px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:1px;">What you get</p>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${[
          ["🤖", "AI Analysis", "Instant SEO, speed & Google Maps scoring"],
          ["🌐", "My Websites", "Track all your live and pending projects"],
          ["⭐", "Reviews",     "Share your experience with the community"],
          ["📄", "Invoices",    "Download PDF invoices for every payment"],
        ].map(([icon, title, desc]) => `
          <tr>
            <td style="padding:8px 0;width:32px;font-size:18px;">${icon}</td>
            <td style="padding:8px 12px 8px 0;">
              <strong style="color:#ffffff;font-size:14px;">${title}</strong><br/>
              <span style="color:#64748b;font-size:12px;">${desc}</span>
            </td>
          </tr>
        `).join("")}
      </table>
    </div>

    ${btn("Open My Dashboard →", `${BASE_URL}/dashboard`, "#06b6d4")}
    ${divider}
    <p style="color:#4a5568;font-size:12px;text-align:center;margin:0;">
      Need help? Chat with us on 
      <a href="https://wa.me/917366890727" style="color:#06b6d4;">WhatsApp</a> — we reply within minutes.
    </p>
  `)
});

/* ─────────────────────────────────────────────────────────────
   2. PAYMENT CONFIRMATION  (after payment is verified/paid)
──────────────────────────────────────────────────────────────*/
exports.paymentConfirmationEmail = ({ name, email, planTitle, amount, orderId, paymentId, invoiceDate }) => ({
  subject: `✅ Payment Confirmed — ${planTitle} Plan | MapMend Solution`,
  html: wrap("Payment Confirmed", `
    ${h2("Payment Confirmed! 🎉")}
    <p style="color:#94a3b8;line-height:1.8;margin:0 0 24px;">
      Hey <strong style="color:#ffffff;">${name}</strong>, your payment has been received and your plan is now active. 
      Please find your invoice attached to this email.
    </p>

    <!-- RECEIPT BOX -->
    <div style="background:#0f0f1a;border:1px solid #06b6d420;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <div style="background:linear-gradient(90deg,#06b6d420,#8b5cf620);padding:14px 20px;border-bottom:1px solid #ffffff10;">
        <span style="font-weight:800;color:#ffffff;font-size:14px;letter-spacing:0.5px;">PAYMENT RECEIPT</span>
      </div>
      <table cellpadding="0" cellspacing="0" width="100%" style="padding:4px 0;">
        ${[
          ["Plan",          planTitle || "MapMend Plan"],
          ["Amount Paid",   `₹${(amount / 100).toLocaleString("en-IN")}`],
          ["Order ID",      orderId || "—"],
          ["Payment ID",    paymentId || "—"],
          ["Date",          invoiceDate || new Date().toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" })],
          ["Billed To",     email],
          ["Status",        "✅ PAID"],
        ].map(([label, val]) => `
          <tr>
            <td style="padding:10px 20px;color:#64748b;font-size:13px;width:40%;border-bottom:1px solid #ffffff08;">${label}</td>
            <td style="padding:10px 20px;color:#e2e8f0;font-size:13px;font-weight:600;border-bottom:1px solid #ffffff08;">${val}</td>
          </tr>
        `).join("")}
      </table>
    </div>

    <p style="color:#94a3b8;font-size:13px;line-height:1.8;margin:0 0 8px;">
      📎 <strong style="color:#ffffff;">Your PDF invoice is attached</strong> to this email. You can also download it anytime from your <a href="${BASE_URL}/dashboard/invoices" style="color:#06b6d4;">invoice dashboard</a>.
    </p>
    <p style="color:#94a3b8;font-size:13px;line-height:1.8;margin:0 0 24px;">
      Our team will contact you within <strong style="color:#ffffff;">24 hours</strong> to begin your project setup.
    </p>

    ${btn("Track My Project →", `${BASE_URL}/dashboard/websites`, "#06b6d4")}
    ${divider}
    <p style="color:#4a5568;font-size:12px;text-align:center;margin:0;">
      Questions? <a href="https://wa.me/917366890727" style="color:#06b6d4;">Chat with our team on WhatsApp</a>
    </p>
  `)
});

/* ─────────────────────────────────────────────────────────────
   3. CONTACT AUTO-REPLY  (after contact form submission)
──────────────────────────────────────────────────────────────*/
exports.contactAutoReplyEmail = ({ name, message }) => ({
  subject: "👋 We received your message — MapMend Solution",
  html: wrap("Message Received", `
    ${h2(`Hi ${name}! 👋`)}
    <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;">
      Thank you for reaching out to <strong style="color:#ffffff;">MapMend Solution</strong>. We've received your inquiry and our team will get back to you within <strong style="color:#06b6d4;">24 hours</strong>.
    </p>

    <div style="background:#0f0f1a;border-left:3px solid #06b6d4;border-radius:0 12px 12px 0;padding:16px 20px;margin-bottom:24px;">
      <p style="margin:0 0 6px;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Your Message</p>
      <p style="margin:0;color:#cbd5e1;font-size:13px;line-height:1.7;font-style:italic;">"${message}"</p>
    </div>

    <p style="color:#94a3b8;font-size:13px;line-height:1.8;margin:0 0 20px;">
      While you wait, feel free to explore our services or get an instant response via WhatsApp:
    </p>

    ${btn("Chat on WhatsApp →", "https://wa.me/917366890727?text=Hello,%20I%20just%20filled%20the%20contact%20form%20on%20MapMend%20Solution.", "#25d366")}
    ${divider}
    <p style="color:#4a5568;font-size:12px;text-align:center;margin:0;">
      This is an automated reply. Please do not respond to this email directly.
    </p>
  `)
});

/* ─────────────────────────────────────────────────────────────
   4. ADMIN CONTACT ALERT  (admin receives new lead)
──────────────────────────────────────────────────────────────*/
exports.adminContactAlertEmail = ({ name, business, email, phone, message }) => ({
  subject: `🔔 New Lead: ${name} — MapMend Admin`,
  html: wrap("New Contact Lead", `
    ${h2("New Lead Received 🔔")}
    <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;">
      A new contact form submission has arrived on the website.
    </p>
    <div style="background:#0f0f1a;border:1px solid #f26122;border-radius:12px;overflow:hidden;">
      <div style="background:#f2612215;padding:12px 20px;border-bottom:1px solid #f2612230;">
        <span style="font-weight:800;color:#f26122;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Lead Details</span>
      </div>
      <table cellpadding="0" cellspacing="0" width="100%">
        ${[
          ["Name",     name],
          ["Business", business || "—"],
          ["Email",    email],
          ["Phone",    phone || "—"],
          ["Message",  message],
        ].map(([label, val]) => `
          <tr>
            <td style="padding:10px 20px;color:#64748b;font-size:13px;width:35%;border-bottom:1px solid #ffffff08;">${label}</td>
            <td style="padding:10px 20px;color:#e2e8f0;font-size:13px;border-bottom:1px solid #ffffff08;">${val}</td>
          </tr>
        `).join("")}
      </table>
    </div>
    ${btn("View in Admin Panel →", `${process.env.APP_URL || "http://localhost:3000"}/admin/leads`, "#f26122")}
  `)
});

/* ─────────────────────────────────────────────────────────────
   5. REVIEW SUBMITTED  (user gets confirmation of review)
──────────────────────────────────────────────────────────────*/
exports.reviewSubmittedEmail = ({ name, review, rating }) => ({
  subject: "⭐ Your review has been received — MapMend Solution",
  html: wrap("Review Submitted", `
    ${h2("Thank You for Your Review! ⭐")}
    <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;">
      Hi <strong style="color:#ffffff;">${name}</strong>, your review has been submitted and is pending admin approval. Once approved, it will be featured on our website.
    </p>

    <div style="background:#0f0f1a;border:1px solid #06b6d420;border-radius:12px;padding:20px 24px;margin-bottom:20px;">
      <div style="margin-bottom:10px;">
        ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
        <span style="color:#06b6d4;font-weight:700;font-size:14px;margin-left:8px;">${rating}/5</span>
      </div>
      <p style="margin:0;color:#e2e8f0;font-size:14px;font-style:italic;line-height:1.7;">"${review}"</p>
    </div>

    <p style="color:#94a3b8;font-size:13px;margin:0 0 4px;">
      We appreciate your kind words — they help other businesses discover MapMend Solution.
    </p>
    ${btn("View My Dashboard →", `${BASE_URL}/dashboard/reviews`, "#06b6d4")}
  `)
});

/* ─────────────────────────────────────────────────────────────
   6. WEBSITE STATUS UPDATE  (admin updates site status)
──────────────────────────────────────────────────────────────*/
exports.siteStatusUpdateEmail = ({ name, email, domain, status, handoverDate }) => {
  const statusMap = {
    active:    { label: "🟢 Your Website is Now LIVE!", color: "#06b6d4", desc: "Congratulations! Your website is live and running. You can now visit it using your domain." },
    pending:   { label: "⏳ Project In Progress",       color: "#f59e0b", desc: "Your website project has been started. Our team is working on it and will keep you updated." },
    completed: { label: "✅ Project Completed",          color: "#8b5cf6", desc: "Your MapMend project has been completed. Please review everything and let us know if you need any changes." },
  };
  const st = statusMap[status] || statusMap.pending;

  return {
    subject: `${st.label} — ${domain || "Your Website"} | MapMend`,
    html: wrap("Website Update", `
      ${h2(st.label)}
      <p style="color:#94a3b8;line-height:1.8;margin:0 0 20px;">
        Hi <strong style="color:#ffffff;">${name}</strong>, here's an update on your MapMend project.
      </p>

      <div style="background:#0f0f1a;border:1px solid ${st.color}40;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
        <div style="margin-bottom:8px;">${badge(status.toUpperCase(), st.color)}</div>
        <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;line-height:1.8;">${st.desc}</p>
        ${domain ? `<p style="margin:10px 0 0;color:#64748b;font-size:13px;">🌐 Domain: <strong style="color:#ffffff;">${domain}</strong></p>` : ""}
        ${handoverDate ? `<p style="margin:8px 0 0;color:#64748b;font-size:13px;">📅 Handover Date: <strong style="color:#06b6d4;">${handoverDate}</strong></p>` : ""}
      </div>

      ${btn("View My Websites →", `${BASE_URL}/dashboard/websites`, st.color)}
      ${divider}
      <p style="color:#4a5568;font-size:12px;text-align:center;margin:0;">
        Questions? <a href="https://wa.me/917366890727" style="color:#06b6d4;">Chat with us on WhatsApp</a>
      </p>
    `)
  };
};
