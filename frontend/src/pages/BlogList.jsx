// src/pages/BlogList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const POSTS = [
  {
    slug: "why-local-business-needs-website-2025",
    title: "Why Every Local Business Needs a Website in 2025",
    excerpt: "Modern customers check online first — here’s why your business needs a website today.",
    date: "2025-06-01",
    category: "Website",
    tags: ["website", "marketing", "small business"],
    views: 560,
  },
  {
    slug: "google-maps-ranking-secrets-for-small-business",
    title: "Google Maps Ranking Secrets for Small Businesses",
    excerpt: "Rank higher in 'near me' searches with smart optimization.",
    date: "2025-05-28",
    category: "Google Maps",
    tags: ["maps", "seo", "ranking"],
    views: 920,
  },
  {
    slug: "how-a-1999-website-can-grow-your-business",
    title: "How a ₹1,999 Website Can Grow Your Business",
    excerpt: "A small investment can bring big returns through online visibility.",
    date: "2025-05-20",
    category: "Website",
    tags: ["website", "affordable", "design"],
    views: 430,
  },
  {
    slug: "best-local-seo-strategies-for-small-businesses",
    title: "Best Local SEO Strategies for Small Businesses",
    excerpt: "Boost calls, leads & customer footfall with strong local SEO.",
    date: "2025-04-20",
    category: "SEO",
    tags: ["seo", "local", "small business"],
    views: 760,
  },
  {
    slug: "how-a-fast-website-increases-your-sales",
    title: "How a Fast Website Can Increase Your Sales",
    excerpt: "Speed improves trust and conversion rate significantly.",
    date: "2025-04-12",
    category: "Website",
    tags: ["speed", "website", "sales"],
    views: 680,
  },
  {
    slug: "why-google-reviews-are-more-important-than-ads",
    title: "Why Google Reviews Beat Paid Ads in 2025",
    excerpt: "Reviews build trust and drive conversions better than ads.",
    date: "2025-05-10",
    category: "Reviews",
    tags: ["reviews", "trust", "seo"],
    views: 840,
  },
  {
    slug: "website-vs-instagram-page-what-your-business-needs",
    title: "Website vs Instagram — What Does Your Business Need?",
    excerpt: "Instagram is not enough — here’s why a website builds trust.",
    date: "2025-05-05",
    category: "Website",
    tags: ["website", "instagram", "branding"],
    views: 510,
  },
];

// Utility Data
const CATEGORIES = [...new Set(POSTS.map((p) => p.category))];
const TAGS = [...new Set(POSTS.flatMap((p) => p.tags))];
const POPULAR = [...POSTS].sort((a, b) => b.views - a.views).slice(0, 3);

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [showCat, setShowCat] = useState(false);
  const [page, setPage] = useState(1);

  const PER_PAGE = 4;

  // Filtering Logic
  let filtered = POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  if (tagFilter) filtered = filtered.filter((p) => p.tags.includes(tagFilter));
  if (selectedCat) filtered = filtered.filter((p) => p.category === selectedCat);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <SEO
        title="Blog"
        description="Explore high-quality articles about website design, Google Maps ranking, SEO, and business growth."
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog`}
      />

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-brandBlue to-blue-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">MapMend Blog</h1>
          <p className="mt-3 text-lg opacity-90">
            Insights on websites, Google Maps, SEO, and growing your business.
          </p>
        </div>
      </section>

      {/* BLOG CONTENT + SIDEBAR */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          
          {/* ---- SIDEBAR ---- */}
          <aside className="md:col-span-1 space-y-8">
            
            {/* Search Bar */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Search</h3>
              <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full p-3 border rounded-lg"
              />
            </div>

            {/* Category Dropdown */}
            <div className="bg-white p-5 rounded-xl shadow relative">
              <h3 className="font-semibold mb-3">Filter by Category</h3>

              <div className="relative">
                <button
                  onClick={() => setShowCat(!showCat)}
                  className="w-full p-3 border rounded-lg flex justify-between items-center text-gray-700"
                >
                  {selectedCat || "Select Category"}
                  <span className="text-brandBlue">{showCat ? "▲" : "▼"}</span>
                </button>

                {showCat && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto animate-fadeIn">
                    <button
                      onClick={() => {
                        setSelectedCat(null);
                        setPage(1);
                        setShowCat(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      All Categories
                    </button>

                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCat(cat);
                          setPage(1);
                          setShowCat(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Popular Posts</h3>
              <ul className="space-y-3">
                {POPULAR.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/blog/${p.slug}`}
                      className="text-brandBlue hover:text-brandOrange"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTagFilter(t === tagFilter ? null : t);
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded-full border text-sm ${
                      tagFilter === t
                        ? "bg-brandBlue text-white"
                        : "bg-white border-gray-300 text-gray-600"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ---- MAIN BLOG GRID ---- */}
          <div className="md:col-span-3 space-y-10">
            <div className="grid md:grid-cols-2 gap-8">
              {paginated.map((p) => (
                <Link
                  to={`/blog/${p.slug}`}
                  key={p.slug}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition border"
                >
                  <div className="text-sm text-gray-500">{p.date}</div>
                  <h2 className="text-xl font-semibold text-brandBlue mt-2 hover:text-brandOrange">
                    {p.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm">{p.excerpt}</p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white rounded-lg shadow disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
