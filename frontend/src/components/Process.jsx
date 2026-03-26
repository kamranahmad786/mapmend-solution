import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaCheckCircle, FaTools, FaRocket } from "react-icons/fa";

export default function Process() {
  const steps = [
    {
      step: "1",
      icon: <FaSearch className="text-2xl" />,
      title: "Free AI Audit",
      desc: "We analyze your Google Maps listing & website using AI and send a 3-point growth report.",
    },
    {
      step: "2",
      icon: <FaCheckCircle className="text-2xl" />,
      title: "Approve & Pay",
      desc: "Choose your package. Pay 50% to begin and the remaining 50% after project completion.",
    },
    {
      step: "3",
      icon: <FaTools className="text-2xl" />,
      title: "We Implement",
      desc: "Your smart website + Maps optimization is completed in 1–3 days with regular updates.",
    },
    {
      step: "4",
      icon: <FaRocket className="text-2xl" />,
      title: "Review & Launch",
      desc: "You review the final work, request tweaks, and we launch your next-gen digital front.",
    },
  ];

  return (
    <section
      id="process"
      className="min-h-screen flex items-center py-24 bg-[#050505] relative"
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonBlue/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Our Simple <span className="text-gradient">4-Step Process</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            A fast, transparent process designed to deliver next-gen results quickly and professionally.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((s, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              key={s.step}
              className="relative glass-card p-8 rounded-[2rem] hover-glow transition transform group text-center min-h-[300px] flex flex-col justify-start border border-white/5"
            >
              {/* Step Badge */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 
                              w-10 h-10 rounded-full bg-gradient-to-r from-neonBlue to-neonPurple text-white font-bold 
                              flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)] text-lg">
                {s.step}
              </div>

              {/* Icon */}
              <div className="mt-8 w-16 h-16 mx-auto rounded-2xl bg-white/5 
                              flex items-center justify-center text-neonCyan 
                              group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-white">{s.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {s.desc}
              </p>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-neonCyan to-neonBlue 
                              transition rounded-[2rem] blur-xl pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
