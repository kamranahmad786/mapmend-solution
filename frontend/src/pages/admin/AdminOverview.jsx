import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiUsers, FiMail, FiGlobe } from "react-icons/fi";
import api from "../../utils/api";

export default function AdminOverview() {
  const [metrics, setMetrics] = useState({
    users: "...",
    leads: "...",
    sites: "...",
    revenue: "..."
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await api.get("/api/admin/metrics");
      setMetrics({
        users: res.data.users,
        leads: res.data.leads,
        sites: res.data.sites,
        revenue: "₹" + res.data.revenue.toLocaleString()
      });
    } catch (err) {
      console.error(err);
      setMetrics({ users: "Err", leads: "Err", sites: "Err", revenue: "Err" });
    }
  };

  const stats = [
    { title: "Total Users", val: metrics.users, icon: <FiUsers />, color: "text-neonCyan", bg: "bg-neonCyan/10" },
    { title: "Unread Leads", val: metrics.leads, icon: <FiMail />, color: "text-neonPink", bg: "bg-neonPink/10" },
    { title: "Site Audits", val: metrics.sites, icon: <FiGlobe />, color: "text-neonPurple", bg: "bg-neonPurple/10" },
    { title: "Gross Revenue", val: metrics.revenue, icon: <FiTrendingUp />, color: "text-green-400", bg: "bg-green-400/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonCyan/10 rounded-full blur-[150px] pointer-events-none"></div>
        <h2 className="text-3xl font-extrabold text-white">Platform <span className="text-gradient hover-glow">Overview</span></h2>
        <p className="text-gray-400 mt-2">Live quantitative aggregation of the MapMend Solution metrics.</p>
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
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6 ${s.bg} ${s.color} border border-white/10 group-hover:scale-110 transition-transform shadow-[0_0_15px_currentColor]`}>
              {s.icon}
            </div>
            
            <h4 className="text-gray-400 text-sm font-semibold tracking-wider uppercase">{s.title}</h4>
            <div className="text-3xl font-extrabold text-white mt-1">
               {s.val}
            </div>
            
            {/* Subtle glow */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${s.bg} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>

      {/* Terminal Visualization Area */}
      <div className="glass-card h-96 rounded-3xl border border-white/5 bg-[#08080c]/80 flex flex-col p-8 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonCyan via-neonPurple to-neonPink opacity-50"></div>
        <h3 className="text-xl font-bold text-white mb-6 tracking-wide">System Event Log</h3>
        
        <div className="flex-1 font-mono text-xs text-gray-500 space-y-3 overflow-y-auto">
           <p><span className="text-green-400">[OK]</span> Connected to MapMend Mainframe.</p>
           <p><span className="text-neonCyan">[INFO]</span> Analyzing localized SEO vectors...</p>
           <p><span className="text-neonCyan">[INFO]</span> Aggregating Razorpay transaction matrices...</p>
           <p><span className="text-green-400">[OK]</span> Live metric stream established successfully.</p>
           <p className="text-gray-600 italic mt-8">Awaiting further chart libraries injection...</p>
        </div>
      </div>
      
    </div>
  );
}
