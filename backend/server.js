require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true }));
app.use(express.json());

connectDB(process.env.MONGODB_URI);

// Routes
app.use("/api/testimonials", require("./routes/testimonials"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/auth", require("./routes/auth"));

// Health
app.get("/", (req, res) => res.send("MapMend Solution API running"));

// seed admin if configured and no users exist
(async function seedAdmin() {
  try {
    if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      const UserModel = require("./models/User");
      const count = await UserModel.countDocuments().catch(() => 0);
      if (count === 0) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
        await UserModel.create({ email: process.env.ADMIN_EMAIL, passwordHash, name: "Admin" });
        console.log("Admin user created:", process.env.ADMIN_EMAIL);
      }
    }
  } catch (err) {
    console.error("Admin seed error:", err.message);
  }
})();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
