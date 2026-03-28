// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
  let token = req.query.token;
  const header = req.headers.authorization;
  if (header) {
    token = header.replace("Bearer ", "");
  }
  
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-passwordHash");
    if (!user) return res.status(401).json({ error: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};

exports.adminMiddleware = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Not authenticated" });
  if (req.user.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
};
