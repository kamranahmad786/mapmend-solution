import React from "react";
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

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-brandBlue mb-4">
          Our Professional Services
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          End-to-end digital solutions designed to grow your business and increase visibility.
        </p>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {items.map((it) => (
            <div
              key={it.title}
              className="relative bg-white p-8 rounded-3xl shadow-lg border border-gray-200 
                         hover:shadow-2xl transition transform hover:-translate-y-2 group overflow-hidden"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 mx-auto rounded-full bg-brandOrange/10 flex items-center justify-center 
                              text-3xl text-brandOrange transition group-hover:bg-brandOrange group-hover:text-white">
                {it.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-bold text-brandBlue text-center">
                {it.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-center text-sm leading-relaxed">
                {it.desc}
              </p>

              {/* Price */}
              <div className="mt-6 text-center font-semibold text-brandOrange">
                {it.price}
              </div>

              {/* ORANGE GLOW ON HOVER */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 
                              bg-white transition rounded-3xl blur-3xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
