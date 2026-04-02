import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FiStar, FiChevronLeft, FiChevronRight, FiUser, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get(`/api/testimonials`)
      .then((res) => setList(res.data))
      .catch(() => {
        setList([
          {
            name: "Rahul Verma",
            review: "MapMend delivered a high-performance digital asset for my enterprise. The architectural precision and SEO results are unmatched.",
            rating: 5,
            role: "Founder, Verma Digital",
          },
          {
            name: "Sneha Enterprises",
            review: "Exceptional speed and professionalism. They transformed our local presence into a high-visibility business node in just 48 hours.",
            rating: 5,
            role: "Managing Director",
          },
          {
            name: "Amit Traders",
            review: "Their Google Maps optimization protocols boosted our organic leads exponentially. A critical partner for any business in this era.",
            rating: 5,
            role: "Operations Head",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (list.length === 0) return;
    const timer = setInterval(() => {
      moveNext();
    }, 6000);
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

  return (
    <section id="testimonials" className="py-32 bg-darkBg relative overflow-hidden">
      
      {/* Subtle Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="text-brandOrange font-black uppercase tracking-[0.3em] text-xs mb-4">Client Verification</div>
          <h2 className="section-heading">
            Trusted By High-Growth Brands
          </h2>
          <p className="section-subheading">
            Join the elite network of businesses scaling their digital visibility through our specialized optimization protocols.
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="relative max-w-5xl mx-auto min-h-[450px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {list.length > 0 && (
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={{
                  enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (direction) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full relative glass-card p-12 md:p-20 rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group"
              >
                <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
                  
                  {/* Avatar & Verification */}
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-[2.5rem] bg-brandNavy border border-white/5 flex items-center justify-center text-4xl text-brandBlue shadow-2xl group-hover:scale-105 transition-transform duration-500">
                         <FiUser />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-brandBlue text-white p-2 rounded-full border-4 border-darkBg shadow-xl">
                         <FiCheckCircle size={16} />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex gap-1.5 text-brandBlue">
                      {[...Array(list[currentIndex].rating || 5)].map((_, idx) => (
                        <FiStar key={idx} className="fill-current" />
                      ))}
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="text-3xl text-slate-500 font-serif leading-none opacity-20 h-0 -translate-y-4">“</div>
                    <p className="text-white text-xl md:text-3xl leading-[1.4] tracking-tight font-medium mb-10">
                      {list[currentIndex].review}
                    </p>
                    <div>
                      <div className="font-black text-2xl text-white tracking-widest uppercase mb-1">{list[currentIndex].name}</div>
                      <div className="text-brandBlue text-[10px] font-black uppercase tracking-[0.2em]">
                         {list[currentIndex].role || "Enterprise Partner"} · Verified Listing
                      </div>
                    </div>
                  </div>
                </div>

                {/* Horizontal progress bar */}
                <div className="absolute left-0 bottom-0 h-1 bg-brandBlue/20 w-full overflow-hidden">
                   <motion.div 
                    key={currentIndex}
                    initial={{ x: "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-brandBlue"
                   />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute -bottom-20 left-0 right-0 flex items-center justify-center gap-6">
            <button 
              onClick={moveBack}
              className="w-14 h-14 rounded-2xl glass-card border border-white/5 text-white flex items-center justify-center hover:bg-brandNavy hover:border-brandOrange/30 transition-all shadow-xl active:scale-95"
            >
              <FiChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2.5">
               {list.map((_, i) => (
                 <button
                   key={i}
                   onClick={() => {
                     setDirection(i > currentIndex ? 1 : -1);
                     setCurrentIndex(i);
                   }}
                   className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-brandBlue' : 'w-2 bg-white/10'}`}
                 />
               ))}
            </div>

            <button 
              onClick={moveNext}
              className="w-14 h-14 rounded-2xl glass-card border border-white/5 text-white flex items-center justify-center hover:bg-brandNavy hover:border-brandOrange/30 transition-all shadow-xl active:scale-95"
            >
              <FiChevronRight size={24} />
            </button>
          </div>

        </div>

        {/* Global CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-40"
        >
          <a
            href="https://wa.me/917366890727"
            target="_blank"
            className="btn-primary"
          >
            Deploy Your Brand Protocol →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
