import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiCpu, FiRefreshCw, FiCheckCircle, FiAlertTriangle, FiTrendingUp, FiZap, FiMap } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function ScoreRing({ score, color, label }) {
  const pct = Math.min(100, Math.max(0, score || 0));
  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <circle
            cx="40" cy="40" r="36" fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s ease", filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold text-white">{pct}</span>
        </div>
      </div>
      <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</span>
    </div>
  );
}

export default function AIAnalysis() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const runAnalysis = () => {
    setLoading(true);
    setError(null);
    api.get("/api/ai/analyze")
      .then(res => setData(res.data))
      .catch(() => setError("Could not connect to the AI engine. Please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(() => { runAnalysis(); }, []);

  return (
    <div className="max-w-5xl space-y-8">

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FiCpu className="text-brandBlue" /> Performance Analysis
          </h1>
          <p className="text-gray-400 mt-1">Strategic audit engine — real-time insights for your digital presence.</p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={loading}
          className="flex items-center gap-2 glass-card border border-neonCyan/30 text-neonCyan px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-neonCyan/10 transition disabled:opacity-50"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          {loading ? "Analyzing..." : "Re-Run"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="glass-card border border-white/10 rounded-3xl p-16 flex flex-col items-center gap-6"
          >
            <div className="relative">
              <div className="w-20 h-20 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
              <FiCpu className="absolute inset-0 m-auto text-neonCyan text-2xl" />
            </div>
            <p className="text-brandBlue font-bold tracking-widest text-sm animate-pulse uppercase">
              Audit Engine Processing…
            </p>
            <p className="text-gray-500 text-sm text-center max-w-sm">
              Gemini is analyzing your website performance, SEO signals, and Google Maps visibility.
            </p>
          </motion.div>
        )}

        {error && !loading && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card border border-red-500/20 rounded-2xl p-8 text-center"
          >
            <FiAlertTriangle className="text-red-400 text-3xl mx-auto mb-3" />
            <p className="text-red-400 font-semibold">{error}</p>
            <button onClick={runAnalysis} className="mt-4 text-sm text-neonCyan underline">Try again</button>
          </motion.div>
        )}

        {data && !loading && (
          <motion.div key="data" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* SCORE RINGS */}
            <div className="glass-card border border-white/10 rounded-3xl p-8">
              <h2 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                <FiTrendingUp className="text-neonCyan" /> Performance Scores
              </h2>
              <div className="flex flex-wrap gap-12 justify-center">
                <ScoreRing score={data.seoScore}   color="#3B8DD4" label="SEO" />
                <ScoreRing score={data.speedScore} color="#F5841F" label="Speed" />
                <ScoreRing score={data.mapsScore}  color="#E06D10" label="Maps" />
              </div>
            </div>

            {/* SUMMARY */}
            <div className="glass-card border border-neonCyan/20 rounded-3xl p-8 bg-neonCyan/5">
              <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FiCpu className="text-brandBlue" /> Strategic Summary
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">{data.summary}</p>
            </div>

            {/* RECOMMENDATIONS + STRENGTHS/OPPS */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* RECOMMENDATIONS */}
              <div className="glass-card border border-white/10 rounded-3xl p-6">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-neonCyan" /> Recommendations
                </h2>
                <ul className="space-y-3">
                  {(data.recommendations || []).map((r, i) => (
                    <motion.li
                      key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-neonCyan/10 border border-neonCyan/30 flex items-center justify-center text-neonCyan text-xs font-bold">
                        {i + 1}
                      </span>
                      {r}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {/* STRENGTHS */}
                {data.strengths?.length > 0 && (
                  <div className="glass-card border border-neonPurple/20 rounded-3xl p-5 bg-neonPurple/5">
                    <h3 className="text-sm font-bold text-neonPurple mb-3 uppercase tracking-widest">Strengths</h3>
                    <ul className="space-y-2">
                      {data.strengths.map((s, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-neonPurple">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* OPPORTUNITIES */}
                {data.opportunities?.length > 0 && (
                  <div className="glass-card border border-neonPink/20 rounded-3xl p-5 bg-neonPink/5">
                    <h3 className="text-sm font-bold text-neonPink mb-3 uppercase tracking-widest">Opportunities</h3>
                    <ul className="space-y-2">
                      {data.opportunities.map((o, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-neonPink">→</span> {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* KEYWORDS */}
            {data.keywords?.length > 0 && (
              <div className="glass-card border border-white/10 rounded-3xl p-6">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <FiMap className="text-neonBlue" /> Target Keywords
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.keywords.map((k, i) => (
                    <span key={i} className="px-4 py-1.5 text-sm font-semibold rounded-full bg-neonBlue/10 text-neonBlue border border-neonBlue/20">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
