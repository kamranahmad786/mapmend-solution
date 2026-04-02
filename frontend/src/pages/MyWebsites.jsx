import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiGlobe, FiExternalLink, FiAlertCircle, FiTrendingUp, FiZap, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const STATUS = {
  active:    { label: "ACTIVE",    cls: "bg-neonCyan/10 text-neonCyan border-neonCyan/20",       dot: "bg-neonCyan" },
  pending:   { label: "PENDING",   cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",    dot: "bg-amber-400" },
  completed: { label: "COMPLETED", cls: "bg-neonPurple/10 text-neonPurple border-neonPurple/20", dot: "bg-neonPurple" },
};

export default function MyWebsites() {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/sites/my")
      .then(r => setSites(r.data || []))
      .catch(() => setSites([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]" />
    </div>
  );

  return (
    <div className="max-w-5xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FiGlobe className="text-neonBlue" /> My Websites
        </h1>
        <p className="text-gray-400 mt-1">Status, analytical performance, and delivery metrics for your MapMend projects.</p>
      </div>

      {/* EMPTY STATE */}
      {sites.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-white/10 rounded-3xl p-16 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-neonBlue/10 border border-neonBlue/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <FiAlertCircle className="text-3xl text-neonBlue" />
          </div>
          <h3 className="text-2xl font-extrabold text-white mb-2">No Websites Yet</h3>
          <p className="text-gray-400 max-w-md mb-8">
            Once you purchase a plan or our team starts your audit, your website will appear here with live tracking.
          </p>
          <Link
            to="/#pricing"
            className="inline-block bg-white text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Get Your Website @ ₹2,599 →
          </Link>
        </motion.div>
      )}

      {/* SITES LIST */}
      {sites.length > 0 && (
        <div className="space-y-4">
          {sites.map((site, i) => {
            const st = STATUS[site.status] || STATUS.pending;
            const handoverFormatted = site.handoverDate 
              ? new Date(site.handoverDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
              : null;

            return (
              <motion.div
                key={site._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass-card border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 hover-glow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-neonBlue/10 border border-neonBlue/20 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden group">
                      <FiGlobe className="text-2xl text-neonBlue relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-neonBlue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg flex items-center gap-2">
                        {site.domain || "Domain Pending"}
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${st.cls}`}>
                          {st.label}
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm font-medium">{site.name || "Project in progress"}</div>
                      
                      {handoverFormatted && (
                        <div className="mt-2 flex items-center gap-2 text-xs font-bold text-neonCyan">
                          <FiCalendar className="text-sm" /> Handover: {handoverFormatted}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SCORES & ACTION */}
                  <div className="flex items-center gap-8 flex-wrap">
                    <div className="flex items-center gap-6">
                      {site.seoScore && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-neonCyan text-sm font-extrabold uppercase tracking-tight">
                            <FiTrendingUp /> {site.seoScore}
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">SEO Audit</div>
                        </div>
                      )}
                      {site.pagespeedScore && (
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-neonPurple text-sm font-extrabold uppercase tracking-tight">
                            <FiZap /> {site.pagespeedScore}
                          </div>
                          <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Speed</div>
                        </div>
                      )}
                    </div>
                    
                    {site.domain && (
                      <a
                        href={`https://${site.domain.replace(/^https?:\/\//,"")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-xl text-sm font-extrabold hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      >
                        Visit Site <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* UPGRADE CTA */}
      <div className="glass-card border border-brandOrange/20 rounded-2xl p-8 bg-brandOrange/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-brandOrange/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="font-extrabold text-xl text-white">Need an Upgrade?</div>
          <p className="text-sm text-gray-400 mt-1 max-w-lg">Scale your digital presence with MapMend Pro. Advanced Google Maps optimization, automated performance blogs, and 24/7 technical support.</p>
        </div>
        <a
          href="https://wa.me/917366890727?text=Hello,%20I%20want%20to%20upgrade%20my%20MapMend%20plan."
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-brandOrange text-white font-extrabold px-8 py-3.5 rounded-2xl hover:bg-white hover:text-brandOrange transition-all text-sm shadow-[0_0_25px_rgba(242,97,34,0.3)] relative z-10"
        >
          Chat with Specialist →
        </a>
      </div>
    </div>
  );
}
