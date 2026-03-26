import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Testimonials() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get(`/api/testimonials`)
      .then((res) => setList(res.data))
      .catch(() => {
        // Fallback Testimonials
        setList([
          {
            name: "Rahul Verma",
            review: "MapMend created a beautiful smart website for my shop. Highly satisfied with the AI-driven approach!",
            rating: 5,
          },
          {
            name: "Sneha Enterprises",
            review: "Very professional and fast work. Next-gen digital presence delivered in just 2 days!",
            rating: 5,
          },
          {
            name: "Amit Traders",
            review: "Google Maps AI optimization boosted our daily customer calls and overall visibility.",
            rating: 5,
          },
        ]);
      });
  }, []);

  // Auto-generate avatar (initials) with neon purple tint
  const getAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=8b5cf6&color=fff&bold=true&size=120`;

  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center py-24 bg-[#050505] relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-neonPink/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Trusted by Next-Gen <span className="text-gradient">Businesses</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            See how forward-thinking brands scaled their digital visibility and automated their growth with MapMend Solution.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {list.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              key={i}
              className="relative glass-card p-8 rounded-[2rem] border border-white/10 hover-glow transition-transform duration-300 hover:-translate-y-2 group overflow-hidden"
            >
              {/* Subtle overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/5 to-transparent pointer-events-none"></div>

              {/* Avatar */}
              <div className="flex justify-start mb-6 relative z-10">
                <img
                  src={getAvatar(t.name)}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border border-neonPurple shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-neonCyan mb-4 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)] relative z-10">
                {[...Array(t.rating || 5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-300 leading-relaxed text-[16px] mb-6 relative z-10 italic">
                “{t.review}”
              </p>

              {/* Name */}
              <div className="font-bold text-white text-lg relative z-10">{t.name}</div>

              {/* Decorative Highlight */}
              <div className="absolute left-0 bottom-0 w-2 h-full bg-gradient-to-b from-transparent via-neonPurple to-transparent opacity-30 group-hover:opacity-100 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <a
            href="https://wa.me/917366890727?text=Hello,%20I%20want%20to%20grow%20my%20business%20online.%20Please%20help%20me."
            target="_blank"
            className="inline-block bg-white text-black text-lg font-bold px-10 py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform duration-300"
          >
            Join the Network →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
