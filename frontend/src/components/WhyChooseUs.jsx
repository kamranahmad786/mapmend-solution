import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaBolt, FaRupeeSign, FaThumbsUp } from "react-icons/fa";

export default function WhyChooseUs() {
  const items = [
    {
      icon: <FaMapMarkerAlt className="text-brandBlue text-3xl" />,
      title: "Local Expertise",
      desc: "We understand how customers search for businesses in your city and optimize your Maps listing for maximum visibility."
    },
    {
      icon: <FaBolt className="text-brandOrange text-3xl" />,
      title: "Lightning Fast Delivery",
      desc: "Most smart websites and Google Maps fixes are completed within 1–3 days so your business growth accelerates."
    },
    {
      icon: <FaRupeeSign className="text-brandBlue text-3xl" />,
      title: "Accessible Pricing",
      desc: "Premium quality at prices built for small and medium businesses — no hidden charges."
    },
    {
      icon: <FaThumbsUp className="text-brandOrange text-3xl" />,
      title: "Proven Results",
      desc: "Our updates improve your digital footprint, trust, and search ranking — leading to exponential footfall."
    }
  ];

  return (
    <section id="why" className="py-24 bg-[#08080c] relative">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Why Forward-Thinkers Trust MapMend Solution
          </h2>
          <p className="text-gray-400 mb-16 max-w-2xl mx-auto text-lg leading-relaxed">
            Leading businesses choose us because we deliver next-gen digital infrastructure — better presence, unwavering trust, and tangible growth.
          </p>
        </motion.div>

        {/* 4 FEATURE CARDS */}
        <div className="grid gap-8 md:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i}
              className="glass-card p-8 rounded-3xl hover-glow transition transform hover:-translate-y-2 group"
            >
              <div className="flex justify-center mb-6 w-16 h-16 mx-auto rounded-2xl bg-white/5 items-center group-hover:bg-white/10 transition">
                {it.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{it.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* TRUST BADGE */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-sm text-gray-400"
        >
          ⭐ Trusted by <span className="text-white font-bold text-glow">50+ next-gen businesses</span> across India
        </motion.div>
      </div>
    </section>
  );
}
