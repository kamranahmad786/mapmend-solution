const axios = require("axios");

async function runPageSpeed(url) {
  const key = process.env.PAGESPEED_API_KEY;
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile&key=${key}`;
  const resp = await axios.get(endpoint, { timeout: 30000 });
  return resp.data;
}

module.exports = { runPageSpeed };
