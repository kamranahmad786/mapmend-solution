import React, { useState } from "react";
import api from "../utils/api";
import { FaUser, FaBuilding, FaEnvelope, FaPhone, FaCommentDots, FaWhatsapp } from "react-icons/fa";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await api.post(`/api/contact`, form);
      setStatus("success");
      setForm({ name: "", business: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-24 bg-[#050505] relative"
    >
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neonPink/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Start Your <span className="text-gradient">AI Transformation</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Fill out the form below for a free AI audit. Our automation team will contact you shortly.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={submit}
          className="grid gap-6 md:grid-cols-2 glass-card p-10 rounded-[2rem] border border-white/10 relative overflow-hidden"
        >
          {/* Subtle overlay glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-neonCyan/5 to-neonPurple/5 pointer-events-none"></div>

          {/* Name */}
          <div className="relative z-10">
            <FaUser className="absolute top-4 left-4 text-neonCyan" />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="pl-12 p-3 w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl focus:border-neonCyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] outline-none text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Business */}
          <div className="relative z-10">
            <FaBuilding className="absolute top-4 left-4 text-neonCyan" />
            <input
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Business Name (optional)"
              className="pl-12 p-3 w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl focus:border-neonCyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] outline-none text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Email */}
          <div className="relative z-10">
            <FaEnvelope className="absolute top-4 left-4 text-neonCyan" />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email Address (optional)"
              className="pl-12 p-3 w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl focus:border-neonCyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] outline-none text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Phone */}
          <div className="relative z-10">
            <FaPhone className="absolute top-4 left-4 text-neonCyan" />
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone / WhatsApp Number"
              className="pl-12 p-3 w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl focus:border-neonCyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] outline-none text-white placeholder-gray-500 transition-all"
            />
          </div>

          {/* Message */}
          <div className="relative md:col-span-2 z-10">
            <FaCommentDots className="absolute top-4 left-4 text-neonCyan" />
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us your requirements"
              className="pl-12 p-3 w-full bg-[#0a0a0f]/50 border border-white/10 rounded-xl focus:border-neonCyan focus:shadow-[0_0_10px_rgba(6,182,212,0.2)] outline-none text-white placeholder-gray-500 transition-all"
              rows="5"
            ></textarea>
          </div>

          {/* Buttons + Status */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 sm:items-center mt-2 z-10">
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-neonCyan text-black px-10 py-3.5 rounded-xl font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-transform hover:scale-105"
            >
              Initialize Audit
            </button>

            {/* WhatsApp Button */}
            <a
              className="flex items-center gap-2 text-neonPurple font-semibold text-sm hover:text-purple-400 transition"
              href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit%20for%20my%20business.%20Please%20check%20my%20details%20and%20guide%20me."
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp className="text-xl" /> Message us on WhatsApp
            </a>

            {/* Status Messages */}
            {status === "sending" && (
              <div className="text-sm text-gray-400 animate-pulse">Transmitting data...</div>
            )}
            {status === "success" && (
              <div className="text-sm text-neonCyan font-semibold">
                Request received. We will contact you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-neonPink font-semibold">
                Connection failed. Please try again.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
