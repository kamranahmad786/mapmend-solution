import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("mapmend_token", res.data.token);
      localStorage.setItem("mapmend_role", res.data.role);
      
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-20 relative overflow-hidden mt-10">
      
      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-neonBlue/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-neonPurple/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      {/* WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full glass-card border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-2 relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#08080c]/80 backdrop-blur-2xl"
      >

        {/* LEFT — BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-[#0a0a0f] border-r border-white/5 p-12 relative overflow-hidden">
          {/* Subtle noise/grid overlay could go here */}

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
            Welcome <span className="text-gradient">Back</span>
          </h2>

          <p className="text-gray-400 text-lg mb-8 relative z-10 leading-relaxed">
            Authenticate to access your intelligence dashboard, spatial SEO data, and automated growth metrics.
          </p>

          <ul className="space-y-5 text-gray-300 text-sm relative z-10">
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              Track network latency & uptime
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              View algorithmic SEO indexing reports
            </li>
            <li className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-neonCyan/20 text-neonCyan flex items-center justify-center text-xs border border-neonCyan/30">✓</span>
              Deploy AI-calibrated enhancements
            </li>
          </ul>
        </div>

        {/* RIGHT — LOGIN FORM */}
        <div className="p-10 md:p-12 flex flex-col justify-center relative">
          
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center md:text-left">
            System Login
          </h2>
          <p className="text-gray-400 text-sm mb-8 text-center md:text-left">
            Establish a secure connection to your MapMend node.
          </p>

          <form onSubmit={submit} className="grid gap-5">

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold ml-1">Email Address</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="operator@network.com"
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none p-3.5 rounded-xl transition-all duration-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 uppercase tracking-wider font-semibold ml-1">Password</label>
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
              className="mt-2 w-full bg-white text-black py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
            >
              Sign In
            </button>

            {err && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-neonPink text-sm text-center font-medium bg-neonPink/10 py-2 border border-neonPink/20 rounded-lg">
                ⚠️ {err}
              </motion.div>
            )}
          </form>

          {/* Registration link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Don’t have network access?{" "}
              <Link to="/register" className="text-neonCyan font-semibold hover:text-white transition-colors duration-300">
                Initialize Account →
              </Link>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
