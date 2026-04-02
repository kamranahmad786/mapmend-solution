import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("mapmend_token");
    const role  = localStorage.getItem("mapmend_role");
    if (token && role === "admin") navigate("/admin", { replace: true });
    else if (token) navigate("/dashboard", { replace: true });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("mapmend_token", res.data.token);
      localStorage.setItem("mapmend_role", res.data.role);
      if (res.data.name) localStorage.setItem("mapmend_user_name", res.data.name);
      if (res.data.email || form.email) localStorage.setItem("mapmend_user_email", res.data.email || form.email);
      
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
    <div className="min-h-screen bg-darkBg flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden">
      
      {/* Professional Gradient Overlays */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[150px] pointer-events-none"></div>

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
              <p className="text-brandOrange text-[10px] tracking-widest uppercase font-black">Secure Infrastructure</p>
            </div>
          </div>

          <h2 className="text-4xl font-black leading-[1.1] mb-6 text-white relative z-10 tracking-tight">
            Authentication <br />
            <span className="text-brandOrange">Protocol</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 relative z-10 leading-relaxed font-medium">
            Authorized portal access for managing enterprise visibility and digital infrastructure nodes.
          </p>

          <ul className="space-y-6 text-slate-300 text-sm font-bold uppercase tracking-widest relative z-10">
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Real-time Network Monitoring
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Algorithmic SEO Audits
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Automated Growth Metrics
             </li>
          </ul>
        </div>

        {/* RIGHT — LOGIN FORM */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative">
          <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl font-black text-white tracking-tight mb-2">Systems Login</h2>
             <p className="text-slate-500 text-sm font-medium">Verify credentials to bypass security layer.</p>
          </div>

          <form onSubmit={submit} className="grid gap-6">
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black ml-1">Identity (Email)</label>
              <input
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="infomapmendsolution@gmail.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-black ml-1">Authorization Code</label>
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
              className="mt-4 w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-100 transition-all shadow-xl active:scale-95"
            >
              Initialize Session
            </button>

            {err && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs text-center font-black uppercase tracking-widest bg-rose-500/5 py-3 border border-rose-500/10 rounded-xl mt-2">
                Verification Failed: {err}
              </motion.div>
            )}
          </form>

          <div className="mt-12 text-center lg:text-left">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
              Need network access?{" "}
              <Link to="/register" className="text-brandBlue hover:text-white transition-colors duration-300 ml-1">
                Deploy Account →
              </Link>
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
