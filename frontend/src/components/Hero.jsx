import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-brandBlue via-blue-800 to-blue-600 text-white relative overflow-hidden">

      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[900px] bg-brandOrange/20 rounded-full blur-3xl opacity-40"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center relative z-10">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow">
            Grow Your Business
            <span className="block text-brandOrange mt-2">
              With a Strong Digital Presence
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl opacity-90 max-w-xl">
            We create modern websites and optimize your Google Maps presence
            so customers can find and trust you instantly — boosting leads and sales.
          </p>

          {/* BENEFIT BADGES */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <FaCheckCircle className="text-brandOrange" /> Boost Visibility
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <FaCheckCircle className="text-brandOrange" /> Increase Trust
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              <FaCheckCircle className="text-brandOrange" /> Generate More Leads
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <a
              href="#contact"
              className="bg-white text-brandBlue px-8 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
            >
              Get Website @ ₹1,999
            </a>

            <a
              href="#services"
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-brandBlue transition"
            >
              Explore Services
            </a>
          </div>

          {/* TRUST TEXT */}
          <p className="mt-8 text-sm opacity-80">
            ⭐ Trusted by 50+ Local Businesses Across India
          </p>
        </div>

        {/* RIGHT — STATIC FULL-COVER IMAGE */}
        <div className="hidden md:flex justify-center">
          <div className="w-[480px] h-[480px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl overflow-hidden">

            <img
              src="/hero-mapmend.png"          // ⭐ keep this image in public folder
              alt="Business Growth Illustration"
              className="w-full h-full object-cover"
            />

          </div>
        </div>

      </div>
    </section>
  );
}
