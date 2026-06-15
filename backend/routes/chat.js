// backend/routes/chat.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

// ─── Simple in-memory rate limiter (10 req/min per IP) ────────────────────────
const rateMap = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 1000; // 1 minute

function rateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now - entry.start > RATE_WINDOW) {
    rateMap.set(ip, { start: now, count: 1 });
    return next();
  }
  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({ error: "Too many requests. Please wait a moment." });
  }
  entry.count++;
  return next();
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateMap) {
    if (now - entry.start > RATE_WINDOW * 2) rateMap.delete(ip);
  }
}, 5 * 60 * 1000);

// ─── MapMend business knowledge (injected as system prompt) ───────────────────
const SYSTEM_PROMPT = `You are the MapMend Solution AI Assistant — a friendly, knowledgeable, and professional customer support chatbot for MapMend Solution, a premium digital services company based in India.

IMPORTANT RULES:
- Keep responses concise (2-4 sentences max unless detailed info is requested)
- Be warm, professional, and helpful
- Always stay in character as MapMend's assistant
- If you don't know something specific, direct them to WhatsApp (+91 7366890727) or email (infomapmendsolution@gmail.com)
- Use emojis sparingly but naturally (1-2 per response max)
- NEVER make up information not in your knowledge base
- Format important details with **bold** text
- Use bullet points (•) for lists

COMPANY INFORMATION:
- Company: MapMend Solution
- Tagline: "Your Digital Growth Partner"
- Location: India (serving businesses nationwide)
- WhatsApp: +91 7366890727
- Email: infomapmendsolution@gmail.com
- Website: mapmendsolution.com

SERVICES OFFERED:
1. **Website Creation** — Modern, mobile-friendly professional websites designed for trust & conversions
2. **Google Maps Optimization** — Deep SEO audit, category corrections, trust signal automation for local ranking dominance
3. **Website Redesign** — Transform outdated websites into modern, high-performance platforms
4. **Speed Optimization** — Starting from ₹999. Fix slow websites with compression and code cleanup
5. **Business Digitization** — Complete digital transformation for offline businesses
6. **Landing Pages** — Starting from ₹1,499. High-conversion pages for ads, leads, and promotions

PRICING PLANS (One-Time Payment):
• **Starter Digital — ₹2,599**: 1-Page Professional Website, Free Domain & SSL, Free Lifetime Maintenance, Google Maps Baseline Fix, Mobile-Optimized
• **Business Pro — ₹4,999** (Best Value): 3-Page High-Performance Site, Free Domain & SSL, Free Lifetime Maintenance, Advanced Local SEO Engine, Full Google Maps SEO Stack, Daily Security Backups
• **Enterprise Elite — ₹7,599**: Custom Multi-Page Infrastructure, Free Domain & SSL, Free Lifetime Maintenance, AI-Powered Content Feed, Advanced Local SEO Engine, Professional Email Suite, 24/7 Priority Support
• All plans have a ₹999/month service charge

DELIVERY & PROCESS:
- Initial delivery within 1–3 business days
- Most partners notice increased footfall within 10-14 days
- 50% payment required to initiate project
- Secure payment via Razorpay

FAQs:
- Maps ranking improvement: We calibrate algorithmic metrics, correct local data inconsistencies, and automate trust signals
- Post-setup: Continuous uptime, automated security patches, and localized SEO monitoring
- Payments: Transparent flat-fee pricing via unified secure gateways

POLICIES:
- Refund Policy available at /refund-policy
- Privacy Policy at /privacy-policy
- Terms & Conditions at /terms-and-conditions
- Cancellation Policy at /cancellation-policy

At the end of EVERY response, suggest 2-3 relevant follow-up questions the user might want to ask, formatted as a JSON array on a NEW line starting with "SUGGESTIONS:" like:
SUGGESTIONS:["What are your pricing plans?","How fast is delivery?","Can I see your services?"]

Make the suggestions contextually relevant to the conversation.`;

// ─── Enhanced local fallback engine ───────────────────────────────────────────
function localFallback(message) {
  const lower = message.toLowerCase();
  let reply = "";
  let suggestions = [];

  // Greetings
  if (lower.match(/^(hi|hello|hey|greetings|hola|namaste|good\s?(morning|afternoon|evening))/)) {
    reply = "Hello! 👋 Welcome to MapMend Solution. I'm here to help you grow your digital presence. What would you like to know about?";
    suggestions = ["What services do you offer?", "Show me pricing plans", "How fast is delivery?"];
  }
  // Services
  else if (lower.includes("service") || lower.includes("offer") || lower.includes("what do you do")) {
    reply = "We offer **6 premium services**: Website Creation, Google Maps Optimization, Website Redesign, Speed Optimization, Business Digitization, and Landing Pages. Each is designed to boost your local business visibility! 🚀";
    suggestions = ["Tell me about pricing", "How does Maps optimization work?", "What's included in website creation?"];
  }
  // Website creation
  else if (lower.includes("website") && (lower.includes("create") || lower.includes("build") || lower.includes("make") || lower.includes("new"))) {
    reply = "We build modern, **mobile-friendly websites** designed for trust & conversions! Starting at just **₹2,599** with free domain, SSL, and lifetime maintenance included. Would you like to see our plans?";
    suggestions = ["Show me pricing plans", "How fast is delivery?", "What about redesign?"];
  }
  // Maps & SEO
  else if (lower.includes("map") || lower.includes("seo") || lower.includes("rank") || lower.includes("google")) {
    reply = "Our **Deep Performance Audit** covers your Google Maps and website completely! We correct categories, optimize SEO, and automate trust signals so the Google algorithm natively prioritizes your business. Most partners see results within **10-14 days**. 📈";
    suggestions = ["What are your pricing plans?", "How fast is delivery?", "Tell me about your process"];
  }
  // Speed
  else if (lower.includes("speed") || lower.includes("slow") || lower.includes("fast") || lower.includes("performance")) {
    reply = "We offer **Speed Optimization starting from ₹999**! We fix slow websites with compression, image optimization, and code cleanup to significantly improve loading times. A fast website means better SEO and more customers!";
    suggestions = ["Show me pricing plans", "What other services do you offer?", "Contact support"];
  }
  // Landing pages
  else if (lower.includes("landing") || lower.includes("ad page") || lower.includes("campaign")) {
    reply = "Our **Landing Pages start at ₹1,499**! These are high-conversion pages strictly designed for ads, lead generation, and promotional campaigns. Perfect for running Google or Facebook ads.";
    suggestions = ["Show me all pricing plans", "What about full websites?", "Book a free audit"];
  }
  // Pricing
  else if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("plan") || lower.includes("how much") || lower.includes("rate")) {
    reply = "We have three transparent plans:\n• **Starter Digital — ₹2,599** (1-page site + Maps fix)\n• **Business Pro — ₹4,999** (3-page site + Full SEO) ⭐ Best Value\n• **Enterprise Elite — ₹7,599** (Custom multi-page + AI content)\n\nAll include free domain, SSL & lifetime maintenance!";
    suggestions = ["What's in Business Pro?", "How do I pay?", "Talk to a specialist"];
  }
  // Delivery time
  else if (lower.includes("how long") || lower.includes("time") || lower.includes("days") || lower.includes("delivery") || lower.includes("how fast")) {
    reply = "Our smart data-driven process ensures **initial delivery within 1–3 business days**! Most of our partners notice increased footfall and leads within 10-14 days of our optimizations going live. ⚡";
    suggestions = ["What's included in each plan?", "Show me pricing", "Contact your team"];
  }
  // Payment
  else if (lower.includes("payment") || lower.includes("pay") || lower.includes("razorpay") || lower.includes("upi")) {
    reply = "Payments are processed securely through **Razorpay** (UPI, cards, net banking all supported). You can initiate your project with **50% upfront**, and the rest upon delivery. Simply choose a plan from our Pricing section!";
    suggestions = ["Show me pricing plans", "Is there a refund policy?", "Contact support"];
  }
  // Contact
  else if (lower.includes("contact") || lower.includes("support") || lower.includes("help") || lower.includes("email") || lower.includes("call") || lower.includes("whatsapp") || lower.includes("phone")) {
    reply = "You can reach our team anytime:\n• **WhatsApp**: +91 7366890727 (fastest!)\n• **Email**: infomapmendsolution@gmail.com\n• Or use the Contact form on our homepage\n\nWe typically respond within minutes! 💬";
    suggestions = ["Show me your services", "View pricing plans", "Book a free audit"];
  }
  // Refund / policy
  else if (lower.includes("refund") || lower.includes("cancel") || lower.includes("policy") || lower.includes("privacy") || lower.includes("terms")) {
    reply = "We have transparent policies for your protection:\n• **Refund Policy**: /refund-policy\n• **Cancellation Policy**: /cancellation-policy\n• **Privacy Policy**: /privacy-policy\n• **Terms & Conditions**: /terms-and-conditions\n\nFeel free to review them or ask me specific questions!";
    suggestions = ["How does payment work?", "View pricing plans", "Contact support"];
  }
  // Free audit
  else if (lower.includes("audit") || lower.includes("free") || lower.includes("analysis") || lower.includes("check")) {
    reply = "We offer a **free digital audit** for your business! Our team will analyze your website performance, SEO signals, and Google Maps visibility. Message us on WhatsApp at **+91 7366890727** to get started! 🎯";
    suggestions = ["What services do you offer?", "Show me pricing", "How fast is delivery?"];
  }
  // Thanks
  else if (lower.match(/(thank|thanks|thx|appreciate|grateful)/)) {
    reply = "You're welcome! 😊 Happy to help. If you have any more questions or want to get started, don't hesitate to ask. We're here for your digital growth!";
    suggestions = ["View pricing plans", "Contact your team", "Book a free audit"];
  }
  // Bye
  else if (lower.match(/(bye|goodbye|see you|take care)/)) {
    reply = "Goodbye! 👋 Thanks for chatting with MapMend Solution. We're always here when you need us. Wishing you great success with your business!";
    suggestions = ["View pricing plans", "Contact on WhatsApp", "Our services"];
  }
  // Fallback
  else {
    reply = "That's a great question! While I may not have the specific answer right now, our expert team can definitely help. You can:\n• **WhatsApp**: +91 7366890727\n• **Email**: infomapmendsolution@gmail.com\n\nOr ask me about our services, pricing, or delivery timeline!";
    suggestions = ["What services do you offer?", "Show me pricing plans", "How fast is delivery?"];
  }

  return { reply, suggestions };
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────
router.post("/", rateLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }

    const userMessage = message.trim().slice(0, 500); // cap length
    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // If no Gemini key, use local fallback
    if (!GEMINI_KEY) {
      const fallback = localFallback(userMessage);
      return res.json({ reply: fallback.reply, suggestions: fallback.suggestions });
    }

    // Build conversation history for Gemini
    const conversationParts = [];

    // Add recent history (last 10 messages)
    const recentHistory = Array.isArray(history) ? history.slice(-10) : [];
    for (const msg of recentHistory) {
      conversationParts.push({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    }

    // Add current user message
    conversationParts.push({
      role: "user",
      parts: [{ text: userMessage }],
    });

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_KEY}`,
      {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: conversationParts,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 400,
          topP: 0.9,
        },
      },
      { headers: { "Content-Type": "application/json" }, timeout: 15000 }
    );

    const rawText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Parse suggestions from the response
    let reply = rawText;
    let suggestions = [];

    const suggestionsMatch = rawText.match(/SUGGESTIONS:\s*(\[.*\])/s);
    if (suggestionsMatch) {
      reply = rawText.replace(/SUGGESTIONS:\s*\[.*\]/s, "").trim();
      try {
        suggestions = JSON.parse(suggestionsMatch[1]);
      } catch {
        suggestions = ["View pricing plans", "Our services", "Contact us"];
      }
    }

    // Clean up any trailing newlines
    reply = reply.replace(/\n+$/, "").trim();

    if (!reply) {
      const fallback = localFallback(userMessage);
      return res.json({ reply: fallback.reply, suggestions: fallback.suggestions });
    }

    res.json({ reply, suggestions });
  } catch (err) {
    console.error("Chat API error:", err.message);
    // Graceful fallback on any error
    const fallback = localFallback(req.body?.message || "");
    res.json({ reply: fallback.reply, suggestions: fallback.suggestions });
  }
});

module.exports = router;
