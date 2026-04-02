// backend/models/Site.js
const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:           String,
  domain:         String,
  pagespeedScore: Number,
  seoScore:       Number,
  status:         { type: String, enum: ["pending", "active", "completed"], default: "pending" },
  handoverDate:   { type: Date, default: null },   // Date website was handed over to client
  lastPaymentId:  { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
}, { timestamps: true });

module.exports = mongoose.model("Site", siteSchema);
