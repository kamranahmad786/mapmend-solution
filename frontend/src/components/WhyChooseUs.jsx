import React from "react";
import { FaMapMarkerAlt, FaBolt, FaRupeeSign, FaThumbsUp } from "react-icons/fa";

export default function WhyChooseUs() {
  const items = [
    {
      icon: <FaMapMarkerAlt className="text-brandOrange text-3xl" />,
      title: "Local Expertise",
      desc: "We understand how customers search in your city and optimize your Maps listing for maximum visibility."
    },
    {
      icon: <FaBolt className="text-brandOrange text-3xl" />,
      title: "Lightning Fast Delivery",
      desc: "Most websites and Google Maps fixes are completed within 1–3 days so your business starts getting more calls quickly."
    },
    {
      icon: <FaRupeeSign className="text-brandOrange text-3xl" />,
      title: "Affordable Pricing",
      desc: "Premium quality at prices built for small and medium businesses — no hidden charges, no confusion."
    },
    {
      icon: <FaThumbsUp className="text-brandOrange text-3xl" />,
      title: "Proven Results",
      desc: "Our updates improve your visibility, trust, and local ranking — leading to more enquiries and footfall."
    }
  ];

  return (
    <section id="why" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* HEADER */}
        <h2 className="text-4xl font-extrabold text-brandBlue mb-4">
          Why Businesses Trust <span className="text-brandOrange">MapMend Solution</span>
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
          Small businesses choose us because we deliver real improvements — better visibility, better trust, and more customers.
        </p>

        {/* 4 FEATURE CARDS */}
        <div className="grid gap-8 md:grid-cols-4">
          {items.map((it, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition transform"
            >
              <div className="flex justify-center mb-4">{it.icon}</div>
              <h3 className="text-xl font-semibold text-brandBlue mb-2">{it.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>

        {/* TRUST BADGE */}
        <div className="mt-12 text-sm text-gray-700">
          ⭐ Trusted by <span className="text-brandBlue font-semibold">50+ businesses</span> across India
        </div>
      </div>
    </section>
  );
}
