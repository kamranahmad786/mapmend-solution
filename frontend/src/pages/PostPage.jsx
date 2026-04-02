// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { FiArrowLeft, FiClock, FiLayers, FiUser, FiCheckCircle } from "react-icons/fi";
import SEO from "../components/SEO";

const MOCK_POSTS = {
  "why-local-business-needs-website-2025": {
    title: "Why Every Local Business Needs a Smart Website in 2025",
    date: "Jun 01, 2025",
    category: "Architecture",
    author: "MapMend Team",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Modern customers query AI and search engines first — here’s why your digital footprint matters.",
    content: `
## The Era of AI-Driven Search

In 2025, customers aren't just "Googling" businesses anymore. They are utilizing AI agents, smart maps, and highly localized semantic algorithms to find physical services. If your business relies solely on foot traffic, you are completely invisible to the primary layer of modern commerce.

### 1. Zero-Click Trust

Before a customer even enters your store, algorithms have already assessed your "trust score." 

* Do you have a domain?
* Is your map listing synchronized?
* Are reviews verified and automated?

A smart website acts as your **digital anchor**.

### 2. Scalable Operations

We build micro-websites that act as 24/7 sales representatives. Through integration and API automation, these endpoints automatically process leads, schedule appointments, and rank organically in localized searches.
    `,
  },
  "google-maps-ranking-secrets-for-small-business": {
    title: "The Algorithmic Secrets of Google Maps Ranking",
    date: "May 28, 2025",
    category: "Visibility",
    author: "MapMend Team",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    excerpt: "Reverse-engineer local search algorithms to rank higher in 'near me' organic queries.",
    content: `
## Decoding the Local Pack

Getting into the top 3 spots of Google Maps is not magic; it's algorithmic optimization. The system heavily prioritizes three main vectors: **Relevance, Distance, and Prominence**.

### Relevance
Your business listing must semantically match the user's intent. This requires precise category selection, robust metadata, and a verified structural link to a high-authority website endpoint.

### Prominence
Are you trusted by the network? Prominence is validated through inbound citations, backlink velocity, and organic review sentiment.

Our AI optimization infrastructure specifically targets these vectors, overriding legacy localized competitors.
    `,
  }
};

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const found = MOCK_POSTS[slug] || MOCK_POSTS["why-local-business-needs-website-2025"];
    setPost(found);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) return <div className="min-h-screen bg-darkBg flex justify-center items-center text-brandBlue font-black uppercase tracking-widest animate-pulse">Initializing Data Node...</div>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": { "@type": "Person", "name": post.author },
    "datePublished": post.date,
    "image": post.img,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${import.meta.env.VITE_SITE_URL || ""}/blog/${slug}`
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} | MapMend Intelligence`}
        description={post.excerpt}
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog/${slug}`}
        schema={schema}
        publishedTime={post.date}
      />
      <main className="min-h-screen bg-darkBg text-white pb-32">
        
        {/* Header Section */}
        <div className="pt-32 pb-16 max-w-[1000px] mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-3 text-slate-500 hover:text-brandBlue transition text-xs font-black uppercase tracking-widest mb-16">
            <FiArrowLeft className="text-lg" /> Back to Intelligence Portal
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-6 mb-8">
              <span className="bg-brandBlue text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brandBlue/10">
                {post.category}
              </span>
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                 <FiClock /> {post.date}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed font-medium max-w-4xl">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-6 py-8 border-y border-white/5 mb-16">
              <div className="w-14 h-14 rounded-[1.25rem] bg-brandNavy border border-white/5 flex items-center justify-center text-xl text-brandBlue shadow-2xl">
                <FiUser />
              </div>
              <div>
                <div className="flex items-center gap-2">
                   <p className="font-black text-sm text-white uppercase tracking-tight">{post.author}</p>
                   <FiCheckCircle className="text-brandBlue" />
                </div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">MapMend Strategy Operations</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.2, duration: 1 }}
          className="max-w-[1400px] mx-auto px-6 mb-24"
        >
          <div className="relative rounded-[3rem] overflow-hidden aspect-[21/9] bg-brandNavy border border-white/5 shadow-2xl">
            <img 
              src={post.img} 
              alt={post.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 grayscale-[20%]"
            />
            {/* Professional Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-darkBg/60 to-transparent"></div>
          </div>
        </motion.div>

        {/* Article Content */}
        <article className="max-w-[850px] mx-auto px-6 lg:px-10">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.8 }}
            className="
              prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight 
              prose-h2:text-3xl prose-h2:mt-20 prose-h2:mb-8 prose-h2:border-l-4 prose-h2:border-brandBlue prose-h2:pl-6
              prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
              prose-p:text-slate-300 prose-p:leading-[1.8] prose-p:mb-10 prose-p:font-medium
              prose-a:text-brandBlue prose-a:font-black prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-black
              prose-ul:text-slate-400 prose-ul:my-10 prose-li:my-4 prose-li:font-medium
              prose-blockquote:border-brandBlue prose-blockquote:bg-brandNavy/30 prose-blockquote:px-10 prose-blockquote:py-6 prose-blockquote:rounded-3xl prose-blockquote:text-slate-300 prose-blockquote:font-bold prose-blockquote:not-italic prose-blockquote:shadow-2xl prose-blockquote:border-l-4
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </motion.div>
          
          <div className="mt-20 pt-16 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
             <div className="text-xs text-slate-500 font-black uppercase tracking-widest">End of Intelligence Feed</div>
             <div className="flex gap-4">
                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-white/20 transition-all">Share Report</button>
                <Link to="/blog" className="px-6 py-3 bg-brandBlue text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-brandBlue/20 hover:bg-blue-600 transition-all">Next Entry</Link>
             </div>
          </div>
        </article>

      </main>
    </>
  );
}
