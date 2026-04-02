// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// routes
const authRoutes = require("./routes/auth");
const sitesRoutes = require("./routes/sites");
const paymentsRoutes = require("./routes/payments");
const adminRoutes = require("./routes/admin");
const testimonialsRoutes = require("./routes/testimonials");
const contactRoutes = require("./routes/contact");
const aiRoutes = require("./routes/ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl === "/api/payments/webhook") {
      req.rawBody = buf;
    }
  }
}));
app.use("/public", express.static(__dirname + "/public"));

connectDB(process.env.MONGODB_URI || process.env.MONGO_URI);

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/sites", sitesRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/ai", aiRoutes);

// Optional admin seed (if no users)
(async function seedAdmin() {
  try {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const User = require("./models/User");
      const count = await User.countDocuments();
      if (count === 0) {
        const bcrypt = require("bcryptjs");
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
        await User.create({ name: "Admin", email: process.env.ADMIN_EMAIL, passwordHash, role: "admin" });
        console.log("Admin created:", process.env.ADMIN_EMAIL);
      }
    }
  } catch (err) { console.error("Seed error:", err.message); }
})();

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("MapMend Solution API running"));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
