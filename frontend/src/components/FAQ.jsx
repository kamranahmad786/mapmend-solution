import React, { useState } from "react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "How fast is the digital transformation?",
    a: "Our smart AI-driven optimizations ensure initial delivery within 1–3 days. Custom architectural work scales accordingly."
  },
  {
    q: "Will my maps ranking genuinely improve?",
    a: "Absolutely. We calibrate algorithmic metrics, correct local data inconsistencies, and automate trust signals so the system favors you."
  },
  {
    q: "How does the pricing and transaction work?",
    a: "We offer completely transparent pricing. Payments are made securely using unified gateways. Initiate the project with 50% down."
  },
  {
    q: "Do you offer post-setup automation and monitoring?",
    a: "Yes. Post-launch maintenance ensures continuous uptime, automated security patches, and localized SEO monitoring."
  },
  {
    q: "How quickly will I see footfall and leads increase?",
    a: "By feeding search algorithms correct, rich metadata about your business, the platform natively prioritizes you. Most partners notice influxes within mere days."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      className="min-h-[80vh] flex items-center py-24 bg-[#08080c] relative"
    >
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-neonBlue/10 rounded-full blur-[140px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Answers & <span className="text-gradient hover-glow">Insights</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Clear technical details to help you understand our methodology and infrastructure.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={i}
              className="glass-card p-6 rounded-2xl border border-white/5 transition-colors duration-300 hover:border-white/20"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex justify-between items-center group outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${open === i ? "text-neonCyan text-glow" : "text-gray-200 group-hover:text-white"}`}>
                  {f.q}
                </span>
                <span className={`text-3xl leading-none font-light transition-transform duration-300 ${open === i ? "text-neonPink rotate-45" : "text-neonPurple"}`}>
                  +
                </span>
              </button>

              <div
                className={`mt-4 text-gray-400 text-[15px] leading-relaxed transition-all duration-300 ${open === i
                    ? "opacity-100 max-h-[300px] block"
                    : "opacity-0 max-h-0 overflow-hidden hidden"
                  }`}
              >
                {f.a}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
