// backend/config/db.js
const mongoose = require("mongoose");

module.exports = async function connectDB(mongoUri) {
  try {
    const uri = mongoUri || process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) throw new Error("MongoDB URI missing in env");
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
