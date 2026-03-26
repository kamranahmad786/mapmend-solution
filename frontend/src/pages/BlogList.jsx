// src/pages/BlogList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

const POSTS = [
  {
    slug: "why-local-business-needs-website-2025",
    title: "Why Every Local Business Needs a Smart Website in 2025",
    excerpt: "Modern customers query AI and search engines first — here’s why your digital footprint matters.",
    date: "Jun 01, 2025",
    category: "Architecture",
    tags: ["website", "marketing", "small business"],
    views: 560,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "google-maps-ranking-secrets-for-small-business",
    title: "The Algorithmic Secrets of Google Maps Ranking",
    excerpt: "Reverse-engineer local search algorithms to rank higher in 'near me' organic queries.",
    date: "May 28, 2025",
    category: "Visibility",
    tags: ["maps", "seo", "ranking"],
    views: 920,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "how-a-1999-website-can-grow-your-business",
    title: "Deploying High-Converting Infrastructure on a Budget",
    excerpt: "A tactical approach to generating high ROI through robust micro-websites.",
    date: "May 20, 2025",
    category: "Engineering",
    tags: ["website", "affordable", "design"],
    views: 430,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "best-local-seo-strategies-for-small-businesses",
    title: "Hyper-Local SEO: Strategies for Dominating Your Grid",
    excerpt: "Drive automated customer acquisition workflows using targeted local SEO signaling.",
    date: "Apr 20, 2025",
    category: "Visibility",
    tags: ["seo", "local", "small business"],
    views: 760,
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "how-a-fast-website-increases-your-sales",
    title: "Performance Defines Conversion: Why Speed is Critical",
    excerpt: "Latency hurts trust. See how sub-second load times exponentially increase interaction rates.",
    date: "Apr 12, 2025",
    category: "Engineering",
    tags: ["speed", "website", "sales"],
    views: 680,
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "why-google-reviews-are-more-important-than-ads",
    title: "Trust Economy: Why Reviews Outperform Paid Acquisition",
    excerpt: "The math behind organic trust dynamics and why social proof yields better CPC than ads.",
    date: "May 10, 2025",
    category: "Marketing",
    tags: ["reviews", "trust", "seo"],
    views: 840,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  }
];

const CATEGORIES = ["All", ...new Set(POSTS.map((p) => p.category))];

export default function BlogList() {
  const [activeCat, setActiveCat] = useState("All");

  const filteredPosts = activeCat === "All" 
    ? POSTS 
    : POSTS.filter(p => p.category === activeCat);

  // First post is featured if no category is filtering it down too small, or just always take [0]
  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title="Engineering & Insights"
        description="Explore technical methodology, AI transformation, and growth algorithms from MapMend."
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog`}
      />

      <main className="min-h-screen bg-[#050505] pt-32 pb-24 relative overflow-hidden text-white w-full">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-neonCyan/5 rounded-full blur-[200px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
          
          {/* Header Section */}
          <div className="mb-16">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              Insights & <span className="text-gradient hover-glow">Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
              Research, technical methodology, and tactical workflows designed to help modern businesses dominate the algorithmic landscape.
            </p>
          </div>

          {/* Categories Navigation (MNC Pill Style) */}
          <div className="flex flex-wrap gap-3 mb-16 pb-4 border-b border-white/10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 backdrop-blur-md border ${
                  activeCat === cat 
                    ? "bg-white text-black border-transparent shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* If no posts found */}
          {filteredPosts.length === 0 && (
            <div className="py-20 text-center text-gray-500">
              No entries found for this category.
            </div>
          )}

          {/* Featured Post */}
          {featured && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 group cursor-pointer"
            >
              <Link to={`/blog/${featured.slug}`} className="block relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#0a0a0f] aspect-[2/1] md:aspect-[2.5/1]">
                {/* Image */}
                <img 
                  src={featured.img} 
                  alt={featured.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out mix-blend-luminosity hover:mix-blend-normal"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-14">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-neonCyan text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-gray-300 text-sm font-medium">{featured.date}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-neonCyan transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl max-w-3xl line-clamp-2 md:line-clamp-none">
                    {featured.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Masonry / Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={post.slug}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full bg-[#0a0a0f] border border-white/10 rounded-[2rem] p-6 hover:border-white/20 hover:bg-[#111] transition-all duration-300">
                  <div className="relative rounded-2xl overflow-hidden mb-6 aspect-video">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white border border-white/10 px-3 py-1 rounded-full text-xs font-semibold">
                      {post.category}
                    </div>
                  </div>

                  <div className="text-neonPurple text-sm font-medium mb-3">
                    {post.date}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neonCyan transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
}
