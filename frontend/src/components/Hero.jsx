import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-[#050505] text-white relative overflow-hidden pt-20">

      {/* Background Glowing Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-neonPurple/20 rounded-full blur-[120px] mix-blend-screen animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neonCyan/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000"></div>
      <div className="absolute top-[40%] left-[40%] w-[500px] h-[500px] bg-neonPink/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center relative z-10 w-full">

        {/* LEFT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 text-sm text-neonCyan shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            ✨ Supercharge Your Digital Growth
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Grow Your Business <br />
            <span className="text-gradient">
              In The AI Era
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl">
            We create AI-driven websites and optimize your Google Maps presence 
            so customers can find and trust you instantly. Step into the future.
          </p>

          {/* BENEFIT BADGES */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
              <FaCheckCircle className="text-neonCyan" /> AI-Driven Growth
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
              <FaCheckCircle className="text-neonPurple" /> Unmatched Visibility
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full text-sm">
              <FaCheckCircle className="text-neonPink" /> Data-Backed Leads
            </div>
          </motion.div>

          {/* CTA BUTTONS */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 md:justify-start justify-center"
          >
            <a
              href="#contact"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition"
            >
              Get Website @ ₹1,999
            </a>

            <a
              href="#services"
              className="glass-card px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition hover-glow text-gray-200"
            >
              Explore Services
            </a>
          </motion.div>

          {/* TRUST TEXT */}
          <p className="mt-8 text-sm text-gray-500">
            ⭐ Trusted by 50+ Local Businesses Across India
          </p>
        </motion.div>

        {/* RIGHT — GLOWING CARD ILLUSTRATION */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="hidden md:flex justify-center relative"
        >
          {/* Pulsing ring behind image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-neonBlue to-neonPurple rounded-[2rem] blur-[60px] opacity-40 animate-pulse"></div>

          <div className="relative w-[480px] h-[480px] glass-card rounded-[2rem] overflow-hidden group">
            <img
              src="/hero-mapmend.png"
              alt="Business Growth Illustration"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 mix-blend-luminosity hover:mix-blend-normal"
            />
            {/* Glass Overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
