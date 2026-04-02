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
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden">
      
      {/* Professional Gradient Overlays */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-[180px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brandOrange/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-brandNavy/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 relative z-10 shadow-2xl"
      >

        {/* LEFT — BRAND PANEL */}
        <div className="hidden lg:flex flex-col justify-center bg-brandNavy/50 border-r border-white/5 p-16 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="bg-white/5 border border-white/10 p-2.5 rounded-2xl">
              <img src="/logo-mapmend.png" alt="Logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">MapMend</h1>
              <p className="text-brandOrange text-[10px] tracking-widest uppercase font-black">Digital Infrastructure</p>
            </div>
          </div>

          <h2 className="text-4xl font-black leading-[1.1] mb-6 text-white relative z-10 tracking-tight">
            Network <br />
            <span className="text-brandOrange">Deployment</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 relative z-10 leading-relaxed font-medium">
            Initialize your entity node to access enterprise-grade semantic SEO, local visibility metrics, and growth workflows.
          </p>

          <ul className="space-y-6 text-slate-300 text-sm font-bold uppercase tracking-widest relative z-10">
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Professional Infrastructure Audit
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Algorithmic SEO Analysis
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Performance Conversion Data
             </li>
          </ul>
        </div>

        {/* RIGHT — REGISTRATION FORM */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative font-inter">
          
          <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl font-black text-white tracking-tight mb-2">Initialize Account</h2>
             <p className="text-slate-500 text-sm font-medium">Provision identity credentials for your business.</p>
          </div>

          <form onSubmit={submit} className="grid gap-6">
            
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black ml-1">Entity Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Systems Inc."
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black ml-1">Secure Email</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                type="email"
                placeholder="infomapmendsolution@gmail.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black ml-1">Passcode</label>
              <input
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-4 w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all shadow-xl active:scale-95 flex justify-center items-center"
            >
              {status === "loading" ? (
                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Deploy Account"
              )}
            </button>

            {status && status !== "loading" && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`text-xs text-center font-black uppercase tracking-widest py-3 border rounded-xl mt-2 ${
                  status === "success" 
                    ? "bg-brandBlue/10 text-brandBlue border-brandBlue/20" 
                    : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                }`}
              >
                {status === "success"
                  ? "✓ Systems deployed. Initializing login..."
                  : `⚠️ ${status}`}
              </motion.div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-12 text-center lg:text-left">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Already have access?{" "}
              <Link to="/login" className="text-brandBlue hover:text-white transition-colors duration-300 ml-1">
                Enter Protocol →
              </Link>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
