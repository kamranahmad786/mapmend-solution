// src/pages/RefundPolicy.jsx
import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { FiRefreshCcw } from "react-icons/fi";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pt-32 pb-20">
      <SEO 
        title="Refund Policy"
        description="Refund policy for MapMend Solution — transparency, fair refund rules, and customer-first practices."
        url="https://mapmendsolution.com/refund-policy"
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-neonPurple/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-neonPurple/10 text-neonPurple px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-neonPurple/20">
            <FiRefreshCcw /> Policy Document
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Refund <span className="text-gradient">Policy</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Our commitment to transparency and fairness in every transaction. Read our refund rules below.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/5 to-transparent pointer-events-none"></div>

          <div className="space-y-10 relative z-10 text-gray-300 leading-relaxed text-lg">
            <p className="text-white font-medium">
              At <strong className="text-neonPurple">MapMend Solution</strong>, we aim to deliver high-quality digital services 
              including website development, Google Maps optimization, and business audits.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonPurple rounded-full"></span>
                Refund Eligibility
              </h2>
              <ul className="space-y-4 pl-11 relative">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>Refunds are eligible within <span className="text-white font-bold">7 days</span> of purchase <span className="bg-red-500/10 text-red-400 px-2 py-0.5 rounded border border-red-500/20 italic">**only if work has not started**</span>.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>If initial drafts or work has been delivered, a partial refund may apply based on the resources used.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>No refunds will be issued for completed projects or finalized websites once delivered.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="w-8 h-1 bg-neonPurple rounded-full"></span>
                Non-Refundable Services
              </h2>
              <ul className="space-y-4 pl-11 relative">
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>Google Maps optimization processes that have already been initiated.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>Website drafts that have already been presented for review.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-neonPurple mt-3 shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
                  <span>Generated SEO audit reports and competitive analysis data.</span>
                </li>
              </ul>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <span>To request a refund, please reach out to our legal department:</span>
                <span className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-neonPurple font-black tracking-wider shadow-lg">
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
