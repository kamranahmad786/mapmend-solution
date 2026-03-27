import React from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiMail, FiGlobe } from "react-icons/fi";

export default function AdminOverview() {
  const stats = [
    { title: "Total Users", val: "Loading...", icon: <FiUsers />, color: "text-neonCyan", bg: "bg-neonCyan/10" },
    { title: "New Leads", val: "Loading...", icon: <FiMail />, color: "text-neonPink", bg: "bg-neonPink/10" },
    { title: "Site Audits", val: "Loading...", icon: <FiGlobe />, color: "text-neonPurple", bg: "bg-neonPurple/10" },
    { title: "Total Revenue", val: "Loading...", icon: <FiTrendingUp />, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonCyan/10 rounded-full blur-[150px] pointer-events-none"></div>
        <h2 className="text-3xl font-extrabold text-white">Platform <span className="text-gradient hover-glow">Overview</span></h2>
        <p className="text-gray-400 mt-2">Executive summary of MapMend Solution metrics.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="glass-card p-6 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors relative overflow-hidden group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 ${s.bg} ${s.color} border border-white/10 group-hover:scale-110 transition-transform`}>
              {s.icon}
            </div>
            
            <h4 className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{s.title}</h4>
            <div className="text-3xl font-extrabold text-white mt-1">{s.val}</div>
            
            {/* Subtle glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${s.bg} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder Chart Area */}
      <div className="glass-card h-96 rounded-3xl border border-white/5 bg-[#08080c]/30 flex items-center justify-center text-gray-500 font-medium">
        [ Analytics Visualization Engine initializing... ]
      </div>
      
    </div>
  );
}
