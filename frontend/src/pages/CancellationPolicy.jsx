// src/pages/CancellationPolicy.jsx
import React from "react";
import SEO from "../components/SEO";
import { motion } from "framer-motion";
import { FiXCircle } from "react-icons/fi";

export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden pt-32 pb-20">
      <SEO 
        title="Cancellation Policy"
        description="Cancellation rules for website development, Google Maps services, and digital marketing packages."
        url="https://mapmendsolution.com/cancellation-policy"
      />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-red-500/20">
            <FiXCircle /> Service Cancellation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Cancellation <span className="text-gradient hover:brightness-125 transition-all">Policy</span>
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Rules regarding service termination and project withdrawal. Please review our windows for cancellation.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-10 relative z-10 text-gray-300 leading-relaxed text-lg text-center md:text-left">
            <p className="text-white font-medium">
              Cancellations must be requested before the project work begins. 
              Once drafts, designs, or <span className="text-neonCyan">Google Maps optimization</span> work has started, 
              cancellation may not be possible due to resource allocation.
            </p>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                <span className="w-8 h-1 bg-red-500 rounded-full"></span>
                Cancellation Window
              </h2>
              <ul className="space-y-4 md:pl-11 relative">
                <li className="flex items-start gap-4 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-3 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  <span>Cancellations are strictly allowed within <span className="text-white font-bold">24 hours</span> of payment confirmation.</span>
                </li>
                <li className="flex items-start gap-4 justify-center md:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-3 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                  <span>No cancellations will be accepted once <span className="text-white font-bold">website drafts</span> or <span className="text-white font-bold">audit work</span> is delivered.</span>
                </li>
              </ul>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                <span>For urgent cancellation requests, please contact:</span>
                <span className="bg-white/5 border border-white/10 px-6 py-2 rounded-xl text-red-400 font-black tracking-wider shadow-lg">
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
