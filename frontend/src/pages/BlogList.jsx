// src/pages/BlogList.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { FiArrowRight, FiClock, FiLayers } from "react-icons/fi";

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

  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  return (
    <>
      <SEO
        title="Enterprise Insights | MapMend Strategy Node"
        description="Strategic research and technical methodology for dominating the digital landscape."
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog`}
      />

      <main className="min-h-screen bg-darkBg pt-32 pb-24 relative overflow-hidden text-white w-full">
        {/* Subtle Brand Decor */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          
          {/* Header Section */}
          <div className="mb-20 text-center lg:text-left">
            <div className="text-brandBlue font-black uppercase tracking-[0.3em] text-xs mb-4">Intelligence Portal</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
              Strategic <span className="text-brandBlue">Insights</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Technical methodologies and tactical research designed to help next-gen businesses dominate localized algorithmic ecosystems.
            </p>
          </div>

          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-4 mb-20 pb-8 border-b border-white/5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCat === cat 
                    ? "bg-brandBlue text-white border-brandBlue shadow-xl shadow-brandBlue/20" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && activeCat === "All" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-20 group"
            >
              <Link to={`/blog/${featured.slug}`} className="block relative rounded-[3rem] overflow-hidden border border-white/5 bg-brandNavy shadow-2xl aspect-[21/9]">
                <img 
                  src={featured.img} 
                  alt={featured.title} 
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/60 to-transparent flex flex-col justify-end p-10 md:p-16">
                  <div className="flex items-center gap-6 mb-6">
                    <span className="bg-brandBlue/10 border border-brandBlue/20 text-brandBlue px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      Featured · {featured.category}
                    </span>
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                       <FiClock /> {featured.date}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight group-hover:text-brandBlue transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-300 text-lg md:text-xl max-w-3xl line-clamp-2">
                    {featured.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {(activeCat === "All" ? gridPosts : filteredPosts).map((post, i) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                key={post.slug}
                className="group flex flex-col"
              >
                <Link to={`/blog/${post.slug}`} className="flex-1 glass-card border border-white/5 rounded-[2.5rem] p-8 hover:border-brandBlue/20 transition-all duration-500 hover:bg-brandNavy/30 flex flex-col items-start shadow-xl">
                  <div className="relative w-full rounded-3xl overflow-hidden mb-8 aspect-video border border-white/10 shadow-lg">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90 grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute top-4 left-4 bg-brandNavy/80 backdrop-blur-md text-[10px] text-brandBlue font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl border border-white/5 shadow-2xl">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                     <FiClock /> {post.date}
                  </div>
                  
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight group-hover:text-brandBlue transition-colors leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                     Read Intelligence <FiArrowRight className="text-brandBlue" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="py-40 text-center flex flex-col items-center">
              <FiLayers className="text-5xl text-slate-700 mb-6" />
              <p className="text-slate-500 font-black uppercase tracking-widest">No Intelligence Entries Available</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
