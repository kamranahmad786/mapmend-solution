const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const { authMiddleware } = require("../middleware/auth");

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug and increment view count
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/blogs
// @desc    Submit a new blog
// @access  Private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, excerpt, content, category, img, authorRole } = req.body;

    if (!title || !excerpt || !content || !category || !img) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Auto-generate slug from title
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    
    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Auto-calculate read time (assume 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
    const readTime = `${readMinutes} min read`;

    // Format date like "Jun 01, 2025"
    const dateOpts = { month: "short", day: "2-digit", year: "numeric" };
    const formattedDate = new Date().toLocaleDateString("en-US", dateOpts);

    // Auto-generate avatar if none exists based on user's name
    const authorName = req.user.name || "Verified Client";
    const authorImg = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=0A1628&color=fff&size=128`;

    const newBlog = new Blog({
      title,
      slug,
      excerpt,
      content,
      category,
      img,
      readTime,
      date: formattedDate,
      authorName,
      authorRole: authorRole || "Verified User",
      authorImg,
      user: req.user.id,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error submitting blog:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
