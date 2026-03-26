import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTools, FaPhoneAlt, FaCheckCircle, FaRocket } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#08080c] relative">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-neonPink/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT CONTENT */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.2 }}
          className="space-y-6"
        >

          {/* Section Label */}
          <motion.span 
            variants={fadeUp}
            className="inline-block bg-neonCyan/10 text-neonCyan px-4 py-1.5 rounded-full font-semibold text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-neonCyan/20"
          >
             ABOUT MAPMEND SOLUTION
          </motion.span>

          <motion.h3 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Fix Your Online Presence & <span className="text-gradient">Grow Effortlessly</span>
          </motion.h3>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed">
            Most local businesses lose customers simply because their
            <strong className="text-white"> Google Maps listing is incorrect </strong>  
            or their website looks outdated.  
            <br /><br />
            <span className="font-semibold text-neonPurple">
              MapMend Solution solves this instantly
            </span>{" "}
            by fixing your online presence, improving visibility, and helping
            customers trust your business using AI-driven strategies.
          </motion.p>

          {/* FEATURE LIST */}
          <motion.div variants={fadeUp} className="space-y-5 pt-4">

            {/* Feature 1 */}
            <div className="flex gap-4 items-start glass-card p-5 rounded-2xl border-white/5 hover-glow transition">
              <div className="w-12 h-12 rounded-xl bg-neonCyan/20 text-neonCyan flex items-center justify-center text-lg shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                <FaSearch />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Deep AI-Powered Audit</h4>
                <p className="text-gray-400 text-sm mt-1">
                  We review Maps, website, categories, contact info, images & more — nothing gets missed.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start glass-card p-5 rounded-2xl border-white/5 hover-glow transition">
              <div className="w-12 h-12 rounded-xl bg-neonPurple/20 text-neonPurple flex items-center justify-center text-lg shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                <FaTools />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Complete Professional Fix</h4>
                <p className="text-gray-400 text-sm mt-1">
                  We update your Maps profile, optimize SEO, refresh design & boost online trust — all within 1–3 days.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start glass-card p-5 rounded-2xl border-white/5 hover-glow transition">
              <div className="w-12 h-12 rounded-xl bg-neonPink/20 text-neonPink flex items-center justify-center text-lg shadow-[0_0_10px_rgba(236,72,153,0.5)]">
                <FaRocket />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">Increase Real Customers</h4>
                <p className="text-gray-400 text-sm mt-1">
                  A strong digital presence instantly increases calls, enquiries & store visits in this competitive era.
                </p>
              </div>
            </div>

          </motion.div>

        </motion.div>

        {/* RIGHT — PREMIUM ILLUSTRATION CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center relative"
        >
          {/* Subtle background glow for the card */}
          <div className="absolute inset-0 bg-gradient-to-br from-neonBlue to-neonPink opacity-20 blur-3xl rounded-[3rem]"></div>

          <div className="w-full max-w-md glass-card rounded-[2rem] p-8 relative overflow-hidden border border-white/10 group">

            {/* Decorative Top Blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-neonCyan/30 rounded-full blur-2xl"></div>

            <img
              src="/about-mapmend.png"
              alt="Map & Website Illustration"
              className="w-56 mx-auto mb-6 rounded-2xl mix-blend-screen opacity-90 transition-transform duration-500 group-hover:scale-105"
            />

            <h4 className="text-2xl font-bold text-white mb-3 text-center">
              We Make Your Business <span className="text-neonCyan text-glow">Discoverable</span>
            </h4>

            <p className="text-gray-400 text-center text-base leading-relaxed mb-6">
              Whether customers search on Google Maps or visit your website,
              your business must look professional & trustworthy.
            </p>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-neonCyan text-xs"><FaCheckCircle /></div> Accurate Maps categories
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-neonPurple text-xs"><FaCheckCircle /></div> Professional smart website
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-neonPink text-xs"><FaCheckCircle /></div> Faster loading & better experience
              </li>
            </ul>

            <a
              href="#contact"
              className="block text-center mt-8 bg-white text-black px-6 py-4 rounded-xl font-bold hover:scale-105 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Request My Audit → 
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
