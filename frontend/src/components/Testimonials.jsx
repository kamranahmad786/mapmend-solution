import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FaStar, FiChevronLeft, FiChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    api
      .get(`/api/testimonials`)
      .then((res) => setList(res.data))
      .catch(() => {
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

  // Auto-play logic
  useEffect(() => {
    if (list.length === 0) return;
    const timer = setInterval(() => {
      moveNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [list, currentIndex]);

  const moveNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const moveBack = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

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

        {/* Testimonials Carousel Wrapper */}
        <div className="relative max-w-4xl mx-auto min-h-[400px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {list.length > 0 && (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.9 }),
                  center: { x: 0, opacity: 1, scale: 1 },
                  exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.9 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: "anticipate" }}
                className="w-full relative glass-card p-10 md:p-16 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden group"
              >
                {/* Subtle overlay glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-neonPurple/5 to-transparent pointer-events-none"></div>

                <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                  {/* Left Side: Avatar & Stars */}
                  <div className="shrink-0 flex flex-col items-center">
                    <img
                      src={getAvatar(list[currentIndex].name)}
                      alt={list[currentIndex].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-neonPurple shadow-[0_0_30px_rgba(139,92,246,0.4)] mb-6"
                    />
                    <div className="flex gap-1 text-neonCyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                      {[...Array(list[currentIndex].rating || 5)].map((_, idx) => (
                        <FaStar key={idx} className="text-xl" />
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-gray-300 text-xl md:text-2xl leading-relaxed italic mb-8 font-medium">
                      “{list[currentIndex].review}”
                    </p>
                    <div className="text-white">
                      <div className="font-black text-2xl uppercase tracking-widest">{list[currentIndex].name}</div>
                      <div className="text-neonPurple font-bold mt-1">Verified Client</div>
                    </div>
                  </div>
                </div>

                {/* Decorative Highlight */}
                <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-neonCyan to-transparent opacity-50"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-20">
            <button 
              onClick={moveBack}
              className="p-4 rounded-full glass-card border border-white/10 text-white hover:bg-neonPurple hover:text-black transition-all shadow-xl"
            >
              <FiChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-20">
            <button 
              onClick={moveNext}
              className="p-4 rounded-full glass-card border border-white/10 text-white hover:bg-neonCyan hover:text-black transition-all shadow-xl"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

          {/* Indicators */}
          <div className="absolute -bottom-12 flex gap-3">
            {list.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-2 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-10 bg-neonCyan' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

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
