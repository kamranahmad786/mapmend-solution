// src/components/Pricing.jsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import api from "../utils/api";

const plans = [
  {
    id: "starter",
    title: "Starter AI",
    price: 99900,
    bullets: ["1-Page Smart Website", "Basic Google Maps Fix", "Mobile-Optimized Layout"],
  },
  {
    id: "business",
    title: "AI Business",
    price: 199900,
    bullets: ["3-Page Next-Gen Website", "Full Maps AI Optimization", "Speed & SEO Enhancements"],
    tag: "Most Popular",
  },
  {
    id: "premium",
    title: "Premium AI",
    price: 449900,
    bullets: [
      "Custom Digital Experience",
      "Advanced AI Maps SEO",
      "Priority Support via Automation",
    ],
    tag: "All-in-One",
  },
];

export default function Pricing() {
  const purchase = async (plan) => {
    try {
      const res = await api.post("/api/payments/create-order", { planId: plan.id });
      const { orderId, keyId, amount } = res.data;

      const options = {
        key: keyId,
        amount,
        currency: "INR",
        name: "MapMend Solution",
        description: plan.title,
        order_id: orderId,
        handler: async function (response) {
          await api.post("/api/payments/verify", response);
          alert("Payment successful! Check your email for invoice.");
          window.location.href = "/dashboard";
        },
        theme: { color: "#06b6d4" }, // neon cyan razorpay tint
      };

      if (!window.Razorpay) {
        const s = document.createElement("script");
        s.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(s);
        s.onload = () => new window.Razorpay(options).open();
      } else new window.Razorpay(options).open();
    } catch (err) {
      alert("Payment could not start. Please try again.");
      console.error(err);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#08080c] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neonPurple/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        
        {/* HEADER */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">
          Transparent <span className="text-gradient">AI Pricing</span>
        </h2>
        <p className="text-gray-400 mt-4 mb-16 text-lg">
          Clear, upfront pricing crafted for ambitious businesses — no hidden charges.
        </p>

        {/* PRICING GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative glass-card rounded-[2rem] p-8 hover-glow transition-transform duration-300 hover:scale-105 group overflow-hidden border
              ${
                p.tag
                  ? "border-neonCyan hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                  : "border-white/10"
              }`}
            >
              {/* TAG BADGE */}
              {p.tag && (
                <div className="absolute top-0 right-0 bg-neonCyan text-black text-xs px-4 py-1.5 rounded-bl-[1rem] font-bold shadow-md">
                  {p.tag}
                </div>
              )}

              {/* TITLE */}
              <h3 className="text-2xl font-bold text-white mt-4">{p.title}</h3>

              {/* PRICE */}
              <div className="my-6 relative">
                <span className="text-5xl font-extrabold text-white">
                  ₹{(p.price / 100).toLocaleString()}
                </span>
                <p className="text-sm text-neonPurple mt-2 font-medium tracking-wide uppercase">One-time payment</p>
                
                {/* Glow behind price on popular */}
                {p.tag && <div className="absolute inset-0 bg-neonCyan opacity-20 blur-2xl rounded-full"></div>}
              </div>

              {/* FEATURES */}
              <ul className="space-y-4 mb-10 text-left relative z-10">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                    <FiCheckCircle className="text-neonCyan text-lg shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button
                onClick={() => purchase(p)}
                className={`w-full py-4 rounded-xl font-bold shadow-lg transition-transform hover:scale-[1.02]
                ${
                  p.tag
                    ? "bg-neonCyan text-black hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "glass-card text-white hover:bg-white/10"
                }`}
              >
                Choose {p.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
