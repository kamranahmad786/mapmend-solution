import React from "react";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaMapMarkedAlt,
  FaRedo,
  FaBolt,
  FaTools,
  FaMobileAlt,
} from "react-icons/fa";

const items = [
  {
    icon: <FaGlobe />,
    title: "Website Creation",
    desc: "Modern, mobile-friendly websites designed for trust & conversions.",
    price: "Starting ₹1,999",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Google Maps Optimization",
    desc: "Rank higher on Google Maps with trusted, optimized listings.",
    price: "Boost Your Ranking",
  },
  {
    icon: <FaRedo />,
    title: "Website Redesign",
    desc: "Transform old designs into clean, fast & professional experiences.",
    price: "Custom Pricing",
  },
  {
    icon: <FaBolt />,
    title: "Speed Optimization",
    desc: "Fix slow websites with speed boost, compression & code cleanup.",
    price: "From ₹999",
  },
  {
    icon: <FaTools />,
    title: "Business Digitization",
    desc: "Bring offline businesses online with branding, tools & payments.",
    price: "Custom Plans",
  },
  {
    icon: <FaMobileAlt />,
    title: "Landing Pages",
    desc: "High-conversion pages built for ads, leads & promotions.",
    price: "Starting ₹1,499",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#050505] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Our <span className="text-gradient">Professional Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            End-to-end digital solutions designed to grow your business and increase visibility in the modern era.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((it) => (
            <motion.div
              variants={cardVariants}
              key={it.title}
              className="relative glass-card p-8 rounded-3xl hover-glow group overflow-hidden"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center 
                              text-3xl text-neonCyan transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                {it.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-bold text-white">
                {it.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                {it.desc}
              </p>

              {/* Price */}
              <div className="mt-6 font-semibold text-neonPurple text-glow">
                {it.price}
              </div>

              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 
                              bg-gradient-to-br from-neonBlue to-neonPurple transition-opacity duration-500 rounded-3xl pointer-events-none blur-xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
