import React, { useState } from "react";
import axios from "axios";
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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/contact`, form);
      setStatus("success");
      setForm({ name: "", business: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-4xl mx-auto px-6 w-full">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center text-brandBlue mb-4">
          Get Your Free Audit & Consultation
        </h2>
        <p className="text-center text-gray-600 mb-10 text-lg max-w-xl mx-auto">
          Fill out the form below and our team will contact you within minutes.
        </p>

        {/* Form Card */}
        <form
          onSubmit={submit}
          className="grid gap-5 md:grid-cols-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-200"
        >
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="pl-12 p-3 w-full border rounded-xl focus:border-brandBlue outline-none"
            />
          </div>

          {/* Business */}
          <div className="relative">
            <FaBuilding className="absolute top-4 left-4 text-gray-400" />
            <input
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Business Name (optional)"
              className="pl-12 p-3 w-full border rounded-xl focus:border-brandBlue outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email Address (optional)"
              className="pl-12 p-3 w-full border rounded-xl focus:border-brandBlue outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute top-4 left-4 text-gray-400" />
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone / WhatsApp Number"
              className="pl-12 p-3 w-full border rounded-xl focus:border-brandBlue outline-none"
            />
          </div>

          {/* Message */}
          <div className="relative md:col-span-2">
            <FaCommentDots className="absolute top-4 left-4 text-gray-400" />
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us your requirement"
              className="pl-12 p-3 w-full border rounded-xl focus:border-brandBlue outline-none"
              rows="5"
            ></textarea>
          </div>

          {/* Buttons + Status */}
          <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 sm:items-center">
            {/* Submit Button */}
            <button
              type="submit"
              className="bg-brandBlue text-white px-8 py-3 rounded-xl font-semibold hover:bg-brandBlue/90 transition"
            >
              Send Message
            </button>

            {/* WhatsApp Button */}
            <a
              className="flex items-center gap-2 text-brandOrange font-semibold text-sm hover:underline"
              href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit%20for%20my%20business.%20Please%20check%20my%20details%20and%20guide%20me."
              target="_blank"
            >
              <FaWhatsapp className="text-brandOrange text-xl" /> Message us on WhatsApp
            </a>

            {/* Status Messages */}
            {status === "sending" && (
              <div className="text-sm text-gray-500">Sending...</div>
            )}
            {status === "success" && (
              <div className="text-sm text-green-600">
                Message sent! We will contact you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-red-600">
                Error sending message. Try again shortly.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
