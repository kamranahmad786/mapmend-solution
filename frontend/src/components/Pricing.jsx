import React from "react";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "./Toast";

const plans = [
  {
    id: "starter",
    title: "Starter Plan",
    subtitle: "Ideal for small local businesses",
    price: 99900,
    bullets: ["1-Page Professional Website", "Google Maps Baseline Fix", "Mobile-Optimized Experience", "Secure SSL Certificate"],
  },
  {
    id: "business",
    title: "Business Pro",
    subtitle: "Advanced growth & visibility",
    price: 199900,
    bullets: ["3-Page High-Performance Site", "Full Google Maps SEO Stack", "Enhanced Indexing Support", "Premium Speed Optimization"],
    tag: "Best Value",
  },
  {
    id: "premium",
    title: "Enterprise",
    subtitle: "Comprehensive digital infrastructure",
    price: 449900,
    bullets: [
      "Custom Enterprise Website",
      "Advanced Local SEO Engine",
      "24/7 Priority Support",
      "Quarterly Strategy Audits",
    ],
  },
];

export default function Pricing() {
  const [loading, setLoading] = React.useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const purchase = async (plan) => {
    const token = localStorage.getItem("mapmend_token");
    if (!token) {
      showToast("Please register to continue, then proceed to payment.", "info");
      navigate("/register");
      return;
    }

    if (loading) return;
    setLoading(plan.id);
    try {
      const res = await api.post("/api/payments/create-order", { planId: plan.id });
      const { orderId, keyId, amount } = res.data;

      const userName = localStorage.getItem("mapmend_user_name") || "";
      const userEmail = localStorage.getItem("mapmend_user_email") || "";

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        name: "MapMend Solution",
        description: `Order: ${plan.title}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            await api.post("/api/payments/verify", response);
            window.location.href = "/dashboard?payment=success";
          } catch (err) {
            showToast("Payment verification failed. Please contact support.", "error");
          }
        },
        modal: { ondismiss: () => setLoading(null) },
        prefill: { name: userName, email: userEmail },
        theme: { color: "#F5841F" },
      };

      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(s);
        s.onload = () => { new window.Razorpay(options).open(); };
      } else {
        new window.Razorpay(options).open();
      }
    } catch (err) {
      showToast("Payment could not start. Please try again.", "error");
      console.error(err);
      setLoading(null);
    }
  };

  return (
    <section id="pricing" className="py-32 bg-darkBg relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="section-heading">
            Simple, Transparent Pricing
          </h2>
          <p className="section-subheading">
            Enterprise-grade digital solutions tailored for your business success. No monthly retainers.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 mt-20">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass-card rounded-3xl p-10 flex flex-col items-start text-left border border-white/5 hover:border-white/10 transition-all duration-300 ${
                p.tag ? 'ring-2 ring-brandOrange shadow-2xl scale-105 z-10' : ''
              }`}
            >
              {p.tag && (
                <div className="absolute top-0 right-0 bg-brandOrange text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-bl-xl rounded-tr-3xl tracking-widest">
                  {p.tag}
                </div>
              )}

              <h3 className="text-xl font-black text-white uppercase tracking-tight">{p.title}</h3>
              <p className="text-slate-500 text-sm mt-1">{p.subtitle}</p>

              <div className="my-10">
                <span className="text-5xl font-black text-white tracking-tight">
                  ₹{(p.price / 100).toLocaleString("en-IN")}
                </span>
                <span className="text-slate-500 text-sm font-bold uppercase tracking-widest ml-2">Total</span>
              </div>

              <div className="w-full h-px bg-white/5 mb-10"></div>

              <ul className="space-y-4 mb-12 flex-1">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-brandBlue/10 flex items-center justify-center border border-brandBlue/20">
                       <FiCheck className="text-brandBlue text-[10px] stroke-[4]" />
                    </div>
                    {b}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => purchase(p)}
                disabled={!!loading}
                className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2
                ${
                  p.tag
                    ? 'bg-brandOrange text-white shadow-xl shadow-brandOrange/20 hover:bg-orange-600'
                    : 'bg-white text-black hover:bg-slate-100 shadow-xl'
                } ${loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
              >
                {loading === p.id ? (
                  <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>Select Plan <FiArrowRight /></>
                )}
              </button>
            </motion.div>
          ))}
        </div>
        
        <p className="mt-12 text-slate-500 text-xs font-bold uppercase tracking-widest">
          🛡️ Secure Checkout Powered by Razorpay
        </p>
      </div>
    </section>
  );
}
