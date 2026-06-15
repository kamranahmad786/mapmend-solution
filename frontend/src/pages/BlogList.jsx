import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { FiArrowRight, FiLayers, FiPlus } from "react-icons/fi";
import api from "../utils/api";

const FALLBACK_POSTS = [
  {
    slug: "why-local-business-needs-website-2025",
    title: "Why Every Local Business Needs a Smart Website in 2025",
    excerpt: "Modern customers query AI and search engines first. Here is why your digital footprint dictates your market share.",
    date: "Jun 01, 2025",
    readTime: "6 min read",
    category: "Architecture",
    authorName: "Rahul Verma",
    authorRole: "Head of Engineering",
    authorImg: "https://ui-avatars.com/api/?name=Rahul+Verma&background=0A1628&color=fff&size=128",
    views: 560,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "google-maps-ranking-secrets-for-small-business",
    title: "The Algorithmic Secrets of Google Maps Ranking",
    excerpt: "Reverse engineer local search algorithms to rank higher in 'near me' organic queries and capture local intent.",
    date: "May 28, 2025",
    readTime: "8 min read",
    category: "Visibility",
    authorName: "Aisha Patel",
    authorRole: "SEO Strategist",
    authorImg: "https://ui-avatars.com/api/?name=Aisha+Patel&background=3B8DD4&color=fff&size=128",
    views: 920,
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "how-a-1999-website-can-grow-your-business",
    title: "Deploying High Converting Infrastructure on a Budget",
    excerpt: "A tactical approach to generating high ROI through robust micro websites without enterprise level capital.",
    date: "May 20, 2025",
    readTime: "5 min read",
    category: "Engineering",
    authorName: "Sarah Chen",
    authorRole: "Product Designer",
    authorImg: "https://ui-avatars.com/api/?name=Sarah+Chen&background=0A1628&color=fff&size=128",
    views: 430,
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "best-local-seo-strategies-for-small-businesses",
    title: "Hyper Local SEO: Strategies for Dominating Your Grid",
    excerpt: "Drive automated customer acquisition workflows using targeted local SEO signaling and competitive analysis.",
    date: "Apr 20, 2025",
    readTime: "7 min read",
    category: "Visibility",
    authorName: "Aisha Patel",
    authorRole: "SEO Strategist",
    authorImg: "https://ui-avatars.com/api/?name=Aisha+Patel&background=3B8DD4&color=fff&size=128",
    views: 760,
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "how-a-fast-website-increases-your-sales",
    title: "Performance Defines Conversion: Why Speed is Critical",
    excerpt: "Latency hurts trust. See how sub second load times exponentially increase user interaction and conversion rates.",
    date: "Apr 12, 2025",
    readTime: "4 min read",
    category: "Engineering",
    authorName: "Rahul Verma",
    authorRole: "Head of Engineering",
    authorImg: "https://ui-avatars.com/api/?name=Rahul+Verma&background=0A1628&color=fff&size=128",
    views: 680,
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop"
  },
  {
    slug: "why-google-reviews-are-more-important-than-ads",
    title: "Trust Economy: Why Reviews Outperform Paid Acquisition",
    excerpt: "The math behind organic trust dynamics and why authentic social proof yields better CPC than direct advertisements.",
    date: "May 10, 2025",
    readTime: "6 min read",
    category: "Marketing",
    authorName: "David Osei",
    authorRole: "Growth Lead",
    authorImg: "https://ui-avatars.com/api/?name=David+Osei&background=F5841F&color=fff&size=128",
    views: 840,
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function BlogList() {
  const [activeCat, setActiveCat] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback to local user state check since we don't have direct context imported
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("mapmend_token");
    setIsLoggedIn(!!token);

    // Fetch blogs
    api.get("/api/blogs")
      .then(res => {
        const dbPosts = res.data || [];
        // Gracefully merge with fallbacks if DB is empty to ensure UI looks premium
        if (dbPosts.length < 6) {
          const needed = 6 - dbPosts.length;
          setPosts([...dbPosts, ...FALLBACK_POSTS.slice(0, needed)]);
        } else {
          setPosts(dbPosts);
        }
      })
      .catch(err => {
        console.error("Failed to load blogs:", err);
        setPosts(FALLBACK_POSTS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const CATEGORIES = ["All", ...new Set(posts.map((p) => p.category))];

  const filteredPosts = activeCat === "All" 
    ? posts 
    : posts.filter(p => p.category === activeCat);

  const featured = filteredPosts[0];
  const gridPosts = filteredPosts.slice(1);

  if (loading) {
    return (
      <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Engineering & Insights | MapMend Solution"
        description="Strategic research and technical methodology for dominating the digital landscape."
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog`}
      />

      <main className="min-h-screen bg-lightBg dark:bg-darkBg pt-32 pb-32 relative overflow-hidden text-slate-900 dark:text-white w-full">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          
          {/* Header Section */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-900 dark:text-white">
                Engineering & Insights
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                Technical methodologies, strategic research, and product updates designed to help ambitious businesses dominate localized digital ecosystems.
              </p>
            </div>
            
            {/* Submit Intelligence Button (Only visible if logged in) */}
            {isLoggedIn && (
              <Link 
                to="/submit-blog" 
                className="inline-flex items-center gap-2 bg-brandBlue text-white font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full hover:bg-brandBlue/90 hover:shadow-lg hover:-translate-y-0.5 transition-all w-fit"
              >
                <FiPlus className="text-lg" /> Submit Intelligence
              </Link>
            )}
          </div>

          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-3 mb-16 pb-6 border-b border-slate-200 dark:border-white/5">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                  activeCat === cat 
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white shadow-sm" 
                    : "bg-transparent text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-200 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post (Split Layout) */}
          {featured && activeCat === "All" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 group"
            >
              <Link 
                to={`/blog/${featured.slug}`} 
                className="flex flex-col lg:flex-row bg-white dark:bg-brandNavy/30 border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all duration-300 group-hover:border-slate-300 dark:group-hover:border-white/20"
              >
                <div className="w-full lg:w-1/2 overflow-hidden bg-slate-100 dark:bg-brandNavy/50">
                  <img 
                    src={featured.img} 
                    alt={featured.title} 
                    className="w-full h-full object-cover aspect-video lg:aspect-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-transparent">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">
                    <span className="text-brandBlue">{featured.category}</span>
                    <span>•</span>
                    <span>{featured.date}</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight group-hover:text-brandBlue transition-colors">
                    {featured.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
                    {featured.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={featured.authorImg} alt={featured.authorName} className="w-12 h-12 rounded-full border border-slate-200 dark:border-white/10" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{featured.authorName}</div>
                        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">{featured.readTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCat === "All" ? gridPosts : filteredPosts).map((post, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={post.slug}
                className="group flex flex-col h-full"
              >
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="flex flex-col h-full bg-white dark:bg-brandNavy/20 border border-slate-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:border-slate-300 dark:group-hover:border-white/20"
                >
                  <div className="w-full overflow-hidden aspect-video bg-slate-100 dark:bg-brandNavy/50">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">
                      <span className="text-brandBlue">{post.category}</span>
                    </div>
                    
                    <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight tracking-tight group-hover:text-brandBlue transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-600 dark:text-slate-400 text-[15px] leading-relaxed line-clamp-3 mb-8">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={post.authorImg} alt={post.authorName} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10" />
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white">{post.authorName}</div>
                          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">{post.date} • {post.readTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center">
              <FiLayers className="text-5xl text-slate-300 dark:text-slate-700 mb-6" />
              <p className="text-slate-600 dark:text-slate-500 font-bold text-lg">No entries found for this category.</p>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
