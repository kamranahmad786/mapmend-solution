import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const [googleLoading, setGoogleLoading] = useState(false);
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

  const handleGoogleSignIn = async () => {
    setErr(null);
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const res = await api.post("/api/auth/google", { idToken });
      localStorage.setItem("mapmend_token", res.data.token);
      localStorage.setItem("mapmend_role", res.data.role);
      if (res.data.name) localStorage.setItem("mapmend_user_name", res.data.name);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const msg =
        error.code === "auth/popup-closed-by-user"
          ? "Sign-in popup was closed"
          : error.response?.data?.error || error.message || "Google sign-in failed";
      setErr(msg);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg flex items-center justify-center px-6 py-20 pt-32 relative overflow-hidden">
      
      {/* Professional Gradient Overlays */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* WRAPPER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full bg-white/80 dark:bg-brandNavy/40 backdrop-blur-3xl border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden grid lg:grid-cols-2 relative z-10 shadow-2xl"
      >

        {/* LEFT BRAND PANEL */}
        <div className="hidden lg:flex flex-col justify-center bg-slate-50 dark:bg-brandNavy/50 border-r border-slate-200 dark:border-white/5 p-16 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-12 relative z-10">
            <div className="bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 p-2.5 rounded-2xl">
              <img src="/logo-mapmend.png" alt="Logo" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">MapMend</h1>
              <p className="text-brandOrange text-[10px] tracking-widest uppercase font-black">Secure Infrastructure</p>
            </div>
          </div>

          <h2 className="text-4xl font-black leading-[1.1] mb-6 text-slate-900 dark:text-white relative z-10 tracking-tight">
            Authentication <br />
            <span className="text-brandOrange">Protocol</span>
          </h2>

          <p className="text-slate-400 text-lg mb-10 relative z-10 leading-relaxed font-medium">
            Authorized portal access for managing enterprise visibility and digital infrastructure nodes.
          </p>

          <ul className="space-y-6 text-slate-600 dark:text-slate-300 text-sm font-bold uppercase tracking-widest relative z-10">
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Real time Network Monitoring
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Algorithmic SEO Audits
             </li>
             <li className="flex items-center gap-4 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-brandBlue"></span> Automated Growth Metrics
             </li>
          </ul>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="p-10 lg:p-16 flex flex-col justify-center relative">
          <div className="mb-10 text-center lg:text-left">
             <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Systems Login</h2>
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
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
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
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:border-brandBlue focus:ring-1 focus:ring-brandBlue outline-none p-4 rounded-2xl transition-all font-medium"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl active:scale-95"
            >
              Initialize Session
            </button>

            {err && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-rose-500 text-xs text-center font-black uppercase tracking-widest bg-rose-500/5 py-3 border border-rose-500/10 rounded-xl mt-2">
                Verification Failed: {err}
              </motion.div>
            )}
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
            <span className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">or continue with</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10"></div>
          </div>

          {/* ── GOOGLE SIGN-IN BUTTON ── */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-white/5 hover:bg-slate-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-white py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {googleLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            )}
            {googleLoading ? "Connecting..." : "Sign in with Google"}
          </button>

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
