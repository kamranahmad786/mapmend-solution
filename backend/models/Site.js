// backend/models/Site.js
const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  domain: String,
  pagespeedScore: Number,
  seoScore: Number,
  lastPaymentId: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" }
}, { timestamps: true });

module.exports = mongoose.model("Site", siteSchema);
