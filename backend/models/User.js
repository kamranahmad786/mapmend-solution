// backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String },  // not required — Google-auth users won't have one
  authProvider: { type: String, default: "local" },  // 'local' or 'google'
  photoURL: { type: String },  // Google profile photo
  role: { type: String, default: "user" }, // 'user' or 'admin'
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
