import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/api/auth/register", form);
      setStatus("success");
      navigate("/login");
    } catch (err) {
      setStatus(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-neonPurple/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neonBlue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      {/* WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full glass-card border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-2 relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#08080c]/80 backdrop-blur-2xl"
      >

        {/* LEFT — MARKETING PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-[#0a0a0f] border-r border-white/5 p-12 relative overflow-hidden">

          {/* LOGO BLOCK */}
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="bg-black/50 border border-white/10 p-3 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <img
                src="/logo-mapmend.png"
                alt="MapMend Solution Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
              />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white">MapMend</h1>
              <p className="text-neonCyan text-xs tracking-wider uppercase font-semibold">Digital Infrastructure</p>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4 text-white relative z-10">
            Join the <span className="text-gradient">Network</span>
          </h2>

          <p className="text-gray-400 text-lg mb-8 relative z-10 leading-relaxed">
            Initialize your account to access enterprise-grade semantic SEO, local visibility metrics, and AI workflows.
          </p>

          <ul className="space-y-5 text-gray-300 text-sm relative z-10">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              Free Infrastructure & Maps Audit
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              Algorithmic Local SEO Analysis
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              Performance & Conversion Tracking
            </li>
          </ul>
        </div>

        {/* RIGHT — REGISTRATION FORM */}
        <div className="p-10 md:p-12 flex flex-col justify-center relative">
          
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center md:text-left">
            Initialize Setup
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-center md:text-left">
            Input authorization credentials to begin.
          </p>

          <form onSubmit={submit} className="grid gap-5">
            
            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold ml-1">Entity Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Systems Inc."
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none p-3.5 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold ml-1">Secure Email</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="operator@network.com"
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none p-3.5 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold ml-1">Passcode</label>
              <input
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none p-3.5 rounded-xl transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-full bg-white text-black py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02] flex justify-center items-center"
            >
              {status === "loading" ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Deploy Account"
              )}
            </button>

            {status && status !== "loading" && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`text-sm text-center font-medium py-2 border rounded-lg ${
                  status === "success" 
                    ? "bg-neonCyan/10 text-neonCyan border-neonCyan/20" 
                    : "bg-neonPink/10 text-neonPink border-neonPink/20"
                }`}
              >
                {status === "success"
                  ? "✓ Systems deployed successfully!"
                  : `⚠️ ${status}`}
              </motion.div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Already have network access?{" "}
              <Link to="/login" className="text-neonCyan font-semibold hover:text-white transition-colors duration-300">
                Sign In →
              </Link>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
