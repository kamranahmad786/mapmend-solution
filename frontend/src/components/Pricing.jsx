// src/components/Pricing.jsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import api from "../utils/api";

const plans = [
  {
    id: "starter",
    title: "Starter",
    price: 99900,
    bullets: ["1-Page Lead Website", "Basic Google Maps Fix", "Mobile-Optimized Design"],
  },
  {
    id: "business",
    title: "Business",
    price: 199900,
    bullets: ["3-Page Website", "Full Google Maps Optimization", "Speed & SEO Enhancements"],
    tag: "Most Popular",
  },
  {
    id: "premium",
    title: "Premium",
    price: 449900,
    bullets: [
      "Custom Professional Website",
      "Advanced Maps SEO + Ranking Boost",
      "Priority Support",
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
        theme: { color: "#0057B8" },
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
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        {/* HEADER */}
        <h2 className="text-4xl font-extrabold text-brandBlue">Affordable Pricing</h2>
        <p className="text-gray-600 mt-3 mb-14 text-lg">
          Transparent pricing crafted for local businesses — no hidden charges.
        </p>

        {/* PRICING GRID */}
        <div className="grid gap-10 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border 
              hover:scale-[1.03] hover:shadow-2xl transition-transform duration-300
              ${
                p.tag
                  ? "border-brandOrange/40 shadow-brandOrange/20"
                  : "border-gray-200"
              }`}
            >
              {/* TAG BADGE */}
              {p.tag && (
                <div className="absolute -top-3 right-4 bg-brandOrange text-white text-xs px-3 py-1 rounded-full shadow">
                  {p.tag}
                </div>
              )}

              {/* TITLE */}
              <h3 className="text-2xl font-semibold text-brandBlue">{p.title}</h3>

              {/* PRICE */}
              <div className="my-6">
                <span className="text-5xl font-extrabold text-brandBlue">
                  ₹{(p.price / 100).toLocaleString()}
                </span>
                <p className="text-sm text-gray-500 mt-1">One-time payment</p>
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8 text-left">
                {p.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <FiCheckCircle className="text-brandOrange text-lg" />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button
                onClick={() => purchase(p)}
                className={`w-full py-3 rounded-xl text-white font-semibold shadow 
                ${
                  p.tag
                    ? "bg-brandOrange hover:bg-brandOrange/90"
                    : "bg-brandBlue hover:bg-brandBlue/90"
                } transition`}
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
