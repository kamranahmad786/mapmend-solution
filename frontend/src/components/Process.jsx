import React from "react";
import { FaSearch, FaCheckCircle, FaTools, FaRocket } from "react-icons/fa";

export default function Process() {
  const steps = [
    {
      step: "1",
      icon: <FaSearch className="text-2xl" />,
      title: "Free Audit",
      desc: "We analyze your Google Maps listing & website and send a 3-point improvement report.",
    },
    {
      step: "2",
      icon: <FaCheckCircle className="text-2xl" />,
      title: "Approve & Pay",
      desc: "Choose your package. Pay 50% to begin and remaining 50% after project completion.",
    },
    {
      step: "3",
      icon: <FaTools className="text-2xl" />,
      title: "We Implement",
      desc: "Your website + Maps optimization is completed in 1–3 days with regular updates.",
    },
    {
      step: "4",
      icon: <FaRocket className="text-2xl" />,
      title: "Review & Launch",
      desc: "You review the final work, request edits, and we launch it. Customers start coming.",
    },
  ];

  return (
    <section
      id="process"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-brandBlue mb-4">
          Our Simple 4-Step Process
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
          A fast, transparent process designed to deliver results quickly and professionally.
        </p>

        {/* Steps Grid */}
        <div className="grid gap-10 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative bg-white p-8 rounded-3xl shadow-lg border border-gray-200 
                         hover:shadow-2xl hover:-translate-y-2 transition transform group 
                         text-center min-h-[300px] flex flex-col justify-start"
            >
              {/* Step Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 
                              w-12 h-12 rounded-full bg-brandOrange text-white font-bold 
                              flex items-center justify-center shadow-lg text-lg">
                {s.step}
              </div>

              {/* Icon */}
              <div className="mt-10 w-16 h-16 mx-auto rounded-2xl bg-brandBlue/10 
                              flex items-center justify-center text-brandBlue 
                              group-hover:bg-brandOrange group-hover:text-white transition">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-semibold text-brandBlue">{s.title}</h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {s.desc}
              </p>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white 
                              transition rounded-3xl blur-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
