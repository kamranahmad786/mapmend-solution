// backend/routes/ai.js
const express = require("express");
const axios = require("axios");
const { authMiddleware } = require("../middleware/auth");
const Site = require("../models/Site");
const router = express.Router();

/**
 * GET /api/ai/analyze
 * Calls Gemini REST API to analyze the user's site data and return structured JSON.
 * If no GEMINI_API_KEY is set, returns smart demo data.
 */
router.get("/analyze", authMiddleware, async (req, res) => {
  try {
    // Get user's sites
    const sites = await Site.find({ user: req.user._id });

    const siteInfo = sites.length > 0
      ? sites.map(s => `Domain: ${s.domain || "unknown"}, SEO Score: ${s.seoScore || "N/A"}, Speed Score: ${s.pagespeedScore || "N/A"}`).join("\n")
      : "No websites registered yet.";

    const GEMINI_KEY = process.env.GEMINI_API_KEY;

    // If no key, return intelligent demo data
    if (!GEMINI_KEY) {
      return res.json(getDemoAnalysis(sites));
    }

    const prompt = `You are an expert digital marketing AI analyzing a local Indian business's online presence.

Business Name: ${req.user.name}
Website Data:
${siteInfo}

Provide a structured analysis in this EXACT JSON format with no markdown, no code blocks, just raw JSON:
{
  "seoScore": <number 1-100>,
  "speedScore": <number 1-100>,
  "mapsScore": <number 1-100>,
  "summary": "<2-3 sentence executive summary of the business's digital health>",
  "recommendations": [
    "<actionable recommendation 1>",
    "<actionable recommendation 2>",
    "<actionable recommendation 3>",
    "<actionable recommendation 4>",
    "<actionable recommendation 5>"
  ],
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "strengths": ["strength 1", "strength 2"],
  "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3"]
}`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 }
      },
      { headers: { "Content-Type": "application/json" }, timeout: 20000 }
    );

    const raw = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    // Strip markdown code blocks if present
    const cleaned = raw.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      return res.json(getDemoAnalysis(sites));
    }

    res.json(parsed);

  } catch (err) {
    console.error("AI analyze error:", err.message);
    // Fallback to demo on any error
    const sites = await Site.find({ user: req.user._id }).catch(() => []);
    res.json(getDemoAnalysis(sites));
  }
});

function getDemoAnalysis(sites) {
  const hasSites = sites.length > 0;
  const seoScore = hasSites ? (sites[0].seoScore || 62) : 42;
  const speedScore = hasSites ? (sites[0].pagespeedScore || 71) : 55;

  return {
    seoScore,
    speedScore,
    mapsScore: 58,
    summary: hasSites
      ? `Your website shows a solid foundation with an SEO score of ${seoScore}/100. There are clear opportunities to improve your Google Maps ranking and content freshness to attract more local customers.`
      : "Your digital presence is just getting started. Once your website goes live with MapMend, we'll track real-time SEO scores, page speed, and Google Maps visibility — all in one place.",
    recommendations: [
      "Add location-specific keywords like your city name and service type to your page titles",
      "Collect at least 10 more Google reviews to boost Maps ranking signals",
      "Compress and convert images to WebP format to improve page load speed by ~40%",
      "Add an FAQ section targeting common customer search queries",
      "Set up Google Business Profile posts weekly to stay relevant in local search"
    ],
    keywords: ["local business website", "Google Maps SEO", "small business India", "MapMend Solution", "digital growth"],
    strengths: [
      "Professional web presence established",
      "Mobile-responsive design ready for customers"
    ],
    opportunities: [
      "Increase Google review count for trust signals",
      "Add structured data (schema markup) for richer search results",
      "Launch a blog to capture long-tail keyword traffic"
    ]
  };
}

module.exports = router;
