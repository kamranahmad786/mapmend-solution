import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiTerminal } from "react-icons/fi";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const [status, setStatus] = useState("idle");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setStatus("loading");

    try {
      const res = await api.post("/api/auth/login", form);

      // Save JWT token and Role
      localStorage.setItem("mapmend_token", res.data.token);
      localStorage.setItem("mapmend_role", res.data.role);

      setStatus("success");
      
      // Auto-divert strictly based on the authenticated role
      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          // Kick regular users out of the admin panel back to client dashboard
          navigate("/dashboard");
        }
      }, 800);
      
    } catch (error) {
      setStatus("idle");
      setErr(error.response?.data?.error || "ACCESS DENIED: Invalid administrator credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6 py-20 pt-28 relative overflow-hidden">
      
      {/* Background Matrix Glows */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[200px] mix-blend-screen pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neonPink/10 rounded-full blur-[200px] mix-blend-screen pointer-events-none"></div>

      {/* CORE WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full glass-card border border-white/10 rounded-3xl overflow-hidden grid md:grid-cols-2 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-[#08080c]/90 backdrop-blur-3xl"
      >

        {/* LEFT — SECURE SERVER TERMINAL */}
        <div className="hidden md:flex flex-col justify-center bg-[#0a0a0f] border-r border-white/5 p-12 relative overflow-hidden">
          
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <FiShield className="text-3xl text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white line-through decoration-red-500/50">MapMend</h1>
              <p className="text-red-500 text-xs tracking-wider uppercase font-bold">God Mode Activated</p>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold leading-tight mb-4 text-white relative z-10">
            Operator <span className="text-red-500 text-glow">Gateway</span>
          </h2>

          <p className="text-gray-400 text-sm mb-8 relative z-10 leading-relaxed">
            RESTRICTED ACCESS. You are attempting to initialize a session on the Master Command node. Unauthorized access logic will be recorded and audited.
          </p>

          <div className="space-y-4 text-xs font-mono text-gray-500 relative z-10 p-4 bg-black/50 border border-white/5 rounded-xl">
             <div className="flex items-center gap-2"><FiTerminal className="text-red-500" /> [ system.verify_clearance ]</div>
             <div className="flex items-center gap-2"><FiTerminal className="text-red-500" /> [ establish_secure_socket ]</div>
             <div className="flex items-center gap-2"><FiTerminal className="text-red-500" /> [ load_analytics_engine ]</div>
          </div>
        </div>

        {/* RIGHT — AUTH PORTAL */}
        <div className="p-10 md:p-12 flex flex-col justify-center relative bg-[#08080c]">
          
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center md:text-left flex items-center gap-3 justify-center md:justify-start">
            <FiLock className="text-gray-500" /> Authentication
          </h2>
          <p className="text-gray-400 text-sm mb-10 text-center md:text-left">
            Input Master Administrator keys below.
          </p>

          <form onSubmit={submit} className="grid gap-6">

            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Admin Identity</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="root@mapmend.com"
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none p-4 rounded-xl transition-all duration-300 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-gray-500 uppercase tracking-widest font-bold ml-1">Master Password</label>
              <input
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder="••••••••••••"
                className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none p-4 rounded-xl transition-all duration-300 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="mt-4 w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-500 transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-[1.02] flex justify-center items-center"
            >
              {status === "loading" ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : status === "success" ? (
                "ACCESS GRANTED"
              ) : (
                "Execute Login"
              )}
            </button>

            {err && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-xs text-center font-bold tracking-wider uppercase bg-red-500/10 py-3 border border-red-500/20 rounded-lg">
                ⚠️ {err}
              </motion.div>
            )}
          </form>

          {/* Eject Route */}
          <div className="mt-10 text-center">
             <Link to="/" className="text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors duration-300 underline underline-offset-4">
                Abort & Return to Surface
             </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
