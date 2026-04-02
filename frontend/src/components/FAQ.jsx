import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus, FiHelpCircle } from "react-icons/fi";

const faqs = [
  {
    q: "How fast is the digital transformation?",
    a: "Our smart data-driven optimizations ensure initial delivery within 1–3 business days. Custom architectural work scales according to project scope."
  },
  {
    q: "Will my maps ranking genuinely improve?",
    a: "Absolutely. We calibrate algorithmic metrics, correct local data inconsistencies, and automate trust signals so the system natively prioritizes your entity."
  },
  {
    q: "How does the pricing and transaction work?",
    a: "We offer completely transparent, flat-fee pricing. Payments are made securely through our unified gateways. All projects require 50% mobilization to initiate."
  },
  {
    q: "Do you offer post-setup automation and monitoring?",
    a: "Yes. Post-launch maintenance ensures continuous uptime, automated security patches, and localized SEO monitoring to maintain ranking dominance."
  },
  {
    q: "How quickly will I see footfall and leads increase?",
    a: "By feeding search algorithms correct, rich metadata about your business, the platform natively prioritizes you. Most partners notice influxes within 10-14 activity cycles."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="min-h-[80vh] flex items-center py-32 bg-darkBg relative overflow-hidden">
      
      {/* Subtle Background Accent */}
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-brandOrange/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="text-brandOrange font-black uppercase tracking-[0.3em] text-xs mb-4">Support & Documentation</div>
          <h2 className="section-heading">
            Operational Knowledge Base
          </h2>
          <p className="section-subheading">
            Technical clarity regarding our optimization methodologies and digital infrastructure deployment.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              key={i}
              className={`group glass-card rounded-[2rem] border transition-all duration-500 overflow-hidden ${
                open === i ? "border-brandOrange/30 bg-brandNavy/30" : "border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left p-8 md:p-10 flex justify-between items-center group outline-none"
              >
                <div className="flex items-center gap-6">
                   <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                     open === i ? "bg-brandOrange text-white border-brandOrange shadow-xl shadow-brandOrange/20" : "bg-white/5 text-slate-500 border-white/10"
                   }`}>
                      <FiHelpCircle />
                   </div>
                   <span className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-500 ${
                     open === i ? "text-white" : "text-slate-300 group-hover:text-white"
                   }`}>
                      {f.q}
                   </span>
                </div>
                
                <div className={`text-xl transition-all duration-500 ${
                  open === i ? "text-brandOrange rotate-180" : "text-slate-600 group-hover:text-slate-100"
                }`}>
                   {open === i ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-10 pb-10 md:pl-24 text-slate-400 text-sm md:text-lg leading-loose font-medium border-t border-white/5 pt-8 mx-10 sm:mx-0">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support Section Footer */}
        <div className="mt-20 pt-16 border-t border-white/5 text-center flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="text-xs text-slate-500 font-black uppercase tracking-widest">Global Support Node Available 24/7</div>
           <a href="#contact" className="text-xs font-black uppercase tracking-widest text-brandOrange hover:text-white transition-colors flex items-center gap-2">
              Speak With Engineering <FiPlus />
           </a>
        </div>
      </div>
    </section>
  );
}
