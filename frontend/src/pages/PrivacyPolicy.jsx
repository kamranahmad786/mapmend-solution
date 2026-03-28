// src/pages/PrivacyPolicy.jsx
import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { FiShield } from "react-icons/fi";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pt-32 pb-20">
      <SEO 
        title="Privacy Policy"
        description="Learn how MapMend Solution protects your data, privacy, and account information."
        url="https://mapmendsolution.com/privacy-policy"
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-neonCyan/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-neonCyan/10 text-neonCyan px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-neonCyan/20">
            <FiShield /> Data Protection
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Your trust is our most valuable asset. Learn how we handle and protect your information with state-of-the-art security.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/5 to-transparent pointer-events-none"></div>

          <div className="space-y-10 relative z-10 text-gray-300 leading-relaxed text-lg">
            <p className="text-white font-medium">
              At <strong className="text-neonCyan">MapMend Solution</strong>, your privacy is our priority. We collect only 
              the information necessary to provide high-quality digital services.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonCyan rounded-full"></span>
                Information We Collect
              </h2>
              <ul className="space-y-4 pl-11 relative">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>Name, email, and phone number for account security.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>Business details and analytics provided during audits.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>Website performance insights and user interaction data.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonCyan rounded-full"></span>
                How We Use Your Data
              </h2>
              <ul className="space-y-4 pl-11 relative">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>To create professional websites and comprehensive marketing reports.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>To improve Google Maps performance and local SEO ranking.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>For account authentication and dashboard personalization features.</span>
                </li>
              </ul>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <span>We never sell or misuse your personal information. For privacy concerns, contact:</span>
                <span className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-neonCyan font-black tracking-wider shadow-lg">
                  infomapmendsolution@gmail.com
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
