// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import SEO from "../components/SEO";

// Matching MOCK_POSTS data from BlogList for consistency in testing
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
    // In production, integrate backend API
    const found = MOCK_POSTS[slug] || MOCK_POSTS["why-local-business-needs-website-2025"];
    setPost(found);
  }, [slug]);

  if (!post) return <div className="min-h-screen bg-[#050505] flex justify-center items-center text-neonCyan">Loading data structures...</div>;

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
        title={post.title}
        description={post.excerpt}
        url={`${import.meta.env.VITE_SITE_URL || ""}/blog/${slug}`}
        schema={schema}
        publishedTime={post.date}
      />
      <main className="min-h-screen bg-[#050505] text-white">
        
        {/* Progress bar or top nav could go here. We leave space for Navbar. */}
        <div className="pt-24 pb-8 max-w-[900px] mx-auto px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-neonCyan transition font-semibold text-sm mb-12">
            <FaArrowLeft /> Back to Insights
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-neonCyan text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.date}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed font-light">
              {post.excerpt}
            </p>
            
            <div className="flex items-center gap-4 border-t border-white/10 pt-6 mb-12">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neonBlue to-neonPurple flex items-center justify-center font-bold text-white shadow-lg">
                M
              </div>
              <div>
                <p className="font-bold text-sm text-white">{post.author}</p>
                <p className="text-xs text-gray-500">MapMend Strategy Team</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-[1200px] mx-auto px-6 mb-16"
        >
          <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] bg-[#0a0a0f] border border-white/10">
            <img 
              src={post.img} 
              alt={post.title} 
              className="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
            {/* Inner glow shadow to blend image edges */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(5,5,5,0.8)] pointer-events-none"></div>
          </div>
        </motion.div>

        {/* Article Content */}
        <article className="max-w-[800px] mx-auto px-6 pb-32">
          {/* Custom syntax highlighting via tailwind prose overrides */}
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="
              prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:font-bold prose-headings:text-white prose-headings:tracking-tight 
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-neonCyan prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-gray-300 prose-ul:my-6 prose-li:my-2
              prose-blockquote:border-neonPurple prose-blockquote:bg-white/5 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-300 prose-blockquote:font-medium prose-blockquote:not-italic
            "
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </motion.div>
        </article>

      </main>
    </>
  );
}
