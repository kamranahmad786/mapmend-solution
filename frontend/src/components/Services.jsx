import React from "react";
import { motion } from "framer-motion";
import { 
  FiGlobe, 
  FiMapPin, 
  FiLayers, 
  FiZap, 
  FiBriefcase, 
  FiLayout, 
  FiArrowRight 
} from "react-icons/fi";

const items = [
  {
    icon: <FiGlobe />,
    title: "Strategic Web Design",
    desc: "Enterprise-grade, mobile-first architectures designed for high conversions and user trust.",
    label: "Core Service",
  },
  {
    icon: <FiMapPin />,
    title: "Google Maps SEO",
    desc: "Advanced local-search optimization to ensure your business dominates Google Maps rankings.",
    label: "Most Requested",
  },
  {
    icon: <FiLayers />,
    title: "Architecture Redesign",
    desc: "Modernizing legacy digital assets with high-performance frameworks and clean UI/UX standards.",
    label: "Legacy Support",
  },
  {
    icon: <FiZap />,
    title: "Performance Optimization",
    desc: "Technical audits and speed enhancements to reduce latency and improve indexing performance.",
    label: "Technical",
  },
  {
    icon: <FiBriefcase />,
    title: "Business Digitization",
    desc: "Transitioning traditional entities into the digital economy with unified payment and CRM stacks.",
    label: "Enterprise",
  },
  {
    icon: <FiLayout />,
    title: "High-Traffic Funnels",
    desc: "Rapid deployment of specialized nodes designed for aggressive lead generation and ad campaigns.",
    label: "Growth",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  return (
    <section id="services" className="py-32 bg-darkBg relative overflow-hidden">
      
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="text-brandOrange font-black uppercase tracking-[0.3em] text-xs mb-4">Our Expertise</div>
          <h2 className="section-heading">
            Enterprise Digital Capabilities
          </h2>
          <p className="section-subheading">
            We provide the technical infrastructure and strategic optimization needed to dominate your local market.
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {items.map((it) => (
            <motion.div
              variants={cardVariants}
              key={it.title}
              className="group relative p-10 bg-brandNavy/30 border border-white/5 rounded-3xl hover:border-brandOrange/20 transition-all duration-500 hover:bg-brandNavy/50"
            >
              {/* Subtle Label */}
              <div className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-6 block">
                {it.label}
              </div>

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-brandBlue/5 border border-brandBlue/10 flex items-center justify-center text-2xl text-brandBlue mb-8 group-hover:scale-110 transition-transform duration-500">
                {it.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-black text-white tracking-tight mb-4 group-hover:text-brandOrange transition-colors">
                {it.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {it.desc}
              </p>

              {/* Action Link (Subtle) */}
              <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Larn More <FiArrowRight className="text-brandBlue" />
              </div>

              {/* Border Glow (Very subtle) */}
              <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-brandBlue/20 to-transparent"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
