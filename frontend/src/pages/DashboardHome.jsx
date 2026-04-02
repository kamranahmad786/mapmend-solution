import React, { useState, useEffect } from "react";
import { FiTrendingUp, FiGlobe, FiMessageSquare, FiCpu, FiArrowRight, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function DashboardHome() {
  const [user,  setUser]  = useState(null);
  const [sites, setSites] = useState([]);
  const [review, setReview] = useState(null);

  useEffect(() => {
    api.get("/api/auth/me").then(r => setUser(r.data)).catch(() => {});
    api.get("/api/sites/my").then(r => setSites(r.data || [])).catch(() => {});
    api.get("/api/testimonials/my").then(r => setReview(r.data)).catch(() => {});
  }, []);

  const activeSites  = sites.filter(s => s.status === "active").length;
  const avgSeo       = sites.length ? Math.round(sites.reduce((a, s) => a + (s.seoScore || 0), 0) / sites.length) : null;
  const avgSpeed     = sites.length ? Math.round(sites.reduce((a, s) => a + (s.pagespeedScore || 0), 0) / sites.length) : null;

  const stats = [
    {
      label: "SEO Score",
      value: avgSeo !== null ? `${avgSeo}/100` : "–",
      icon: <FiTrendingUp />,
      color: "from-neonCyan/20 to-neonBlue/10",
      border: "border-neonCyan/20",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      iconColor: "text-neonCyan",
      desc: sites.length ? "Based on your websites" : "No sites yet",
    },
    {
      label: "Page Speed",
      value: avgSpeed !== null ? `${avgSpeed}/100` : "–",
      icon: <FiZap />,
      color: "from-neonPurple/20 to-neonPink/10",
      border: "border-neonPurple/20",
      glow: "shadow-[0_0_20px_rgba(139,92,246,0.15)]",
      iconColor: "text-neonPurple",
      desc: sites.length ? "Average across sites" : "No sites yet",
    },
    {
      label: "Active Websites",
      value: sites.length > 0 ? sites.length : "0",
      icon: <FiGlobe />,
      color: "from-neonBlue/20 to-neonCyan/10",
      border: "border-neonBlue/20",
      glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      iconColor: "text-neonBlue",
      desc: activeSites > 0 ? `${activeSites} live now` : "Pending setup",
    },
    {
      label: "My Review",
      value: review ? `${review.rating}/5 ★` : "None",
      icon: <FiMessageSquare />,
      color: "from-neonPink/20 to-neonPurple/10",
      border: "border-neonPink/20",
      glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)]",
      iconColor: "text-neonPink",
      desc: review ? (review.approved ? "Live on website" : "Pending approval") : "Share your experience",
    },
  ];

  const quickActions = [
    { label: "Run AI Analysis", desc: "Get instant SEO & speed insights", to: "/dashboard/ai",      color: "from-neonCyan to-neonBlue",    icon: <FiCpu /> },
    { label: "My Websites",     desc: "View all your active projects",    to: "/dashboard/websites", color: "from-neonPurple to-neonPink",  icon: <FiGlobe /> },
    { label: "Submit Review",   desc: "Share your MapMend experience",    to: "/dashboard/reviews",  color: "from-neonBlue to-neonPurple",  icon: <FiMessageSquare /> },
  ];

  return (
    <div className="space-y-8 max-w-6xl">

      {/* WELCOME */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, <span className="text-gradient">{user?.name?.split(" ")[0] || "there"}</span> 👋
        </h1>
        <p className="text-gray-400">Here's your digital presence overview for today.</p>
      </motion.div>

      {/* STAT CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-gradient-to-br ${s.color} border ${s.border} ${s.glow} rounded-2xl p-5 flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{s.label}</span>
              <span className={`text-xl ${s.iconColor}`}>{s.icon}</span>
            </div>
            <div className="text-3xl font-extrabold text-white">{s.value}</div>
            <div className="text-xs text-gray-500">{s.desc}</div>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <FiZap className="text-neonCyan" /> Quick Actions
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {quickActions.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Link
                to={a.to}
                className="group block glass-card border border-white/10 rounded-2xl p-6 hover-glow transition-all duration-300 hover:border-white/20"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {a.icon}
                </div>
                <div className="font-bold text-white text-base mb-1">{a.label}</div>
                <div className="text-sm text-gray-500 mb-3">{a.desc}</div>
                <div className="flex items-center gap-1 text-neonCyan text-sm font-semibold group-hover:gap-2 transition-all">
                  Go <FiArrowRight />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RECENT SITES */}
      {sites.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <FiGlobe className="text-neonBlue" /> Your Websites
          </h2>
          <div className="space-y-3">
            {sites.slice(0, 3).map(site => (
              <div key={site._id} className="glass-card border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neonBlue/10 border border-neonBlue/20 flex items-center justify-center">
                    <FiGlobe className="text-neonBlue" />
                  </div>
                  <div>
                    <div className="font-bold text-white">{site.domain || "Unnamed Site"}</div>
                    <div className="text-xs text-gray-500">{site.name || "No title"}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  site.status === "active"    ? "bg-neonCyan/10 text-neonCyan border-neonCyan/20" :
                  site.status === "completed" ? "bg-neonPurple/10 text-neonPurple border-neonPurple/20" :
                  "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}>
                  {(site.status || "pending").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA if no sites */}
      {sites.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="glass-card border border-white/10 rounded-2xl p-8 text-center"
        >
          <FiGlobe className="text-4xl text-neonBlue mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No websites yet</h3>
          <p className="text-gray-400 mb-6">Get your professional website and Google Maps optimization starting at ₹2,599.</p>
          <a
            href="https://wa.me/917366890727?text=Hello,%20I%20want%20to%20get%20started%20with%20MapMend%20Solution."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Get Started on WhatsApp →
          </a>
        </motion.div>
      )}
    </div>
  );
}
