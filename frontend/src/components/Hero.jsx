import React from "react";
import { FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-darkBg text-white relative overflow-hidden pt-32 pb-20">

      {/* Professional Gradient Overlays (Subtle) */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brandBlue/5 rounded-full blur-[180px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10 w-full">

        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandOrange/10 border border-brandOrange/20 rounded-full text-xs font-bold text-brandOrange uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brandOrange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brandOrange"></span>
            </span>
            Trusted Digital Infrastructure
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-white mb-6">
            The New Standard For <br />
            Business Growth
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
            MapMend builds high-performance digital assets and optimizes Local SEO 
            presence so your brand stands out where it matters most.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#pricing" className="btn-primary flex items-center justify-center gap-2">
              Get Your Website @ ₹1,999 <FiArrowRight />
            </a>
            <a href="#services" className="btn-secondary">
              View Our Services
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <div className="flex -space-x-3 overflow-hidden">
               {[1,2,3,4].map(i => (
                 <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-darkBg bg-slate-800 flex items-center justify-center text-[10px] font-bold">Client</div>
               ))}
            </div>
            <div className="text-sm">
              <span className="text-white font-bold block">50+ Local Partners</span>
              <span className="text-slate-500">Trusted across 12+ states in India</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:block relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden border border-white/5 shadow-2xl group transition-all duration-500 hover:border-brandOrange/20">
            <img
              src="/hero-mapmend.png"
              alt="MapMend Business Professional"
              className="w-full h-auto object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
            />
            {/* Professional Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-darkBg via-darkBg/10 to-transparent"></div>
            
            {/* Interactive Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl border-brandOrange/10 flex items-center justify-between animate-fadeIn">
               <div>
                  <div className="text-[10px] text-brandOrange font-bold uppercase tracking-widest">Live Optimization</div>
                  <div className="text-sm font-bold text-white mt-1">G-Maps Rank #1</div>
               </div>
               <div className="flex items-center gap-1 text-green-400 text-sm font-bold">
                  <FiCheckCircle /> Verified
               </div>
            </div>
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brandBlue/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brandOrange/10 rounded-full blur-3xl"></div>
        </motion.div>

      </div>
    </section>
  );
}
