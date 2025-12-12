const axios = require("axios");

async function analyzeWithAI({ url, pagespeed, seoChecks }) {
  const prompt = `
You are an expert website auditor. I give you:
URL: ${url}
Pagespeed result: ${JSON.stringify(pagespeed.summary || pagespeed.lighthouseResult?.categories || {})}
SEO checks: ${JSON.stringify(seoChecks)}

Provide:
1) Short executive summary (2-3 lines)
2) Top 5 prioritized recommendations (each 1 line)
3) Suggest which pricing plan fits (Starter / Business / Premium) and why.
`;

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  const resp = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini", // or gpt-4o / text-davinci-003 as available
      messages: [{ role: "system", content: "You are an expert web auditor." }, { role: "user", content: prompt }],
      max_tokens: 600
    },
    {
      headers: { Authorization: `Bearer ${OPENAI_KEY}` }
    }
  );
  const text = resp.data.choices?.[0]?.message?.content || "";
  return text;
}

module.exports = { analyzeWithAI };
