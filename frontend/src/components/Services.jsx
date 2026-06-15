import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiGlobe, 
  FiMapPin, 
  FiLayers, 
  FiZap, 
  FiBriefcase, 
  FiLayout, 
  FiArrowRight,
  FiX
} from "react-icons/fi";

const items = [
  {
    icon: <FiGlobe />,
    title: "Strategic Web Design",
    desc: "Enterprise-grade, mobile-first architectures designed for high conversions and user trust.",
    label: "Core Service",
    details: "Our Strategic Web Design service goes beyond aesthetics. We build scalable, high performance web applications tailored to your business goals. Utilizing cutting edge frameworks, we ensure your site is lightning-fast, mobile responsive, and optimized for maximum conversions. We handle everything from UI/UX prototyping to full stack development and deployment.",
  },
  {
    icon: <FiMapPin />,
    title: "Google Maps SEO",
    desc: "Advanced local-search optimization to ensure your business dominates Google Maps rankings.",
    label: "Most Requested",
    details: "Dominate your local market with our Google Maps SEO strategies. We optimize your Google Business Profile, manage local citations, and implement geo-targeted keyword strategies to ensure you rank in the top 3 Map Pack. Our approach guarantees higher visibility, more phone calls, and increased foot traffic to your physical locations.",
  },
  {
    icon: <FiLayers />,
    title: "Architecture Redesign",
    desc: "Modernizing legacy digital assets with high performance frameworks and clean UI/UX standards.",
    label: "Legacy Support",
    details: "Is your current website slow, outdated, or difficult to maintain? Our Architecture Redesign service completely revamps legacy systems. We migrate your digital assets to modern, high performance stacks like React and Node.js, ensuring better security, faster load times, and a completely refreshed, highly intuitive user experience.",
  },
  {
    icon: <FiZap />,
    title: "Performance Optimization",
    desc: "Technical audits and speed enhancements to reduce latency and improve indexing performance.",
    label: "Technical",
    details: "A slow website kills conversions and hurts your Google rankings. Our Performance Optimization team conducts deep technical audits to identify bottlenecks. We optimize assets, implement advanced caching, reduce server response times, and fine-tune your Core Web Vitals to guarantee lightning-fast load speeds that keep users engaged.",
  },
  {
    icon: <FiBriefcase />,
    title: "Business Digitization",
    desc: "Transitioning traditional entities into the digital economy with unified payment and CRM stacks.",
    label: "Enterprise",
    details: "We help traditional brick-and-mortar businesses transition seamlessly into the digital space. From integrating secure online payment gateways to setting up automated CRM systems and custom management dashboards, we provide end-to-end digital transformation solutions that streamline your operations and unlock new revenue streams.",
  },
  {
    icon: <FiLayout />,
    title: "High-Traffic Funnels",
    desc: "Rapid deployment of specialized nodes designed for aggressive lead generation and ad campaigns.",
    label: "Growth",
    details: "Maximize your ad spend with our highly optimized, conversion-focused landing pages and sales funnels. We rapidly deploy specialized nodes tailored for specific marketing campaigns, featuring A/B testing, heatmapping, and aggressive lead capture mechanisms designed to turn your website visitors into paying customers at an unprecedented rate.",
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
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-32 bg-lightBg dark:bg-darkBg relative overflow-hidden">
      
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-white/5 to-transparent -translate-x-1/2"></div>
      
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
              onClick={() => setSelectedService(it)}
              className="group relative p-10 bg-white dark:bg-brandNavy/30 border border-slate-200 dark:border-white/5 rounded-3xl hover:border-brandOrange/20 transition-all duration-500 hover:bg-slate-50 dark:hover:bg-brandNavy/50 shadow-sm dark:shadow-none cursor-pointer"
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
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-4 group-hover:text-brandOrange transition-colors">
                {it.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                {it.desc}
              </p>

              {/* Action Link (Subtle) */}
              <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn More <FiArrowRight className="text-brandBlue" />
              </div>

              {/* Border Glow (Very subtle) */}
              <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-brandBlue/20 to-transparent"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            ></motion.div>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-darkBg rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-brandNavy/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brandBlue/10 flex items-center justify-center text-xl text-brandBlue shrink-0">
                    {selectedService.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-brandOrange font-extrabold uppercase tracking-widest mb-1">
                      {selectedService.label}
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 shrink-0 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-brandOrange hover:border-brandOrange/30 transition-all"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed md:text-lg mb-8">
                  {selectedService.details}
                </p>
                <div className="flex gap-4">
                  <button onClick={() => { setSelectedService(null); window.location.href = "#contact"; }} className="btn-primary py-3 px-8 text-sm">
                    Request This Service
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
