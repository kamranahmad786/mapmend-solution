// src/pages/TermsConditions.jsx
import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pt-32 pb-20">
      <SEO 
        title="Terms & Conditions"
        description="Terms and conditions for using MapMend Solution services including websites, SEO, Google Maps optimization, and dashboards."
        url="https://mapmendsolution.com/terms-and-conditions"
      />

      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neonPurple/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neonCyan/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 text-gray-300 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
            <FiFileText className="text-neonPurple" /> Legal Agreement
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Terms & <span className="text-gradient">Conditions</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Please read these terms carefully before using our AI-driven digital services and dashboard features.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-10 relative z-10 text-gray-300 leading-relaxed text-lg">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonPurple rounded-full"></span>
                Service Usage
              </h2>
              <p>
                By using <span className="text-white font-semibold">MapMend Solution</span>, you agree to provide accurate information 
                and follow the service guidelines outlined on this website. Our AI-driven audits and website generation are 
                provided "as-is" for business enhancement.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonCyan rounded-full"></span>
                Payments & Billing
              </h2>
              <ul className="space-y-4 pl-11 relative">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>All payments are processed securely via <span className="text-white font-bold">Razorpay</span> encrypted gateway.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonCyan mt-3 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                  <span>Project execution begins only after a minimum <span className="text-neonCyan font-bold">50% advance payment</span> is confirmed.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonPurple rounded-full"></span>
                Project Delivery
              </h2>
              <p>
                Delivery timelines depend on the complexity of the service. Standard business websites and SEO audits are 
                typically completed within <span className="text-white font-bold">1–3 business days</span>, unless custom 
                functionality is requested.
              </p>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <span>For support, disputes, or legal inquiries, contact:</span>
                <span className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-white font-black tracking-wider shadow-lg">
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
