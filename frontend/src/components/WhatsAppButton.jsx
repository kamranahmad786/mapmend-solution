import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  // Replace with your actual WhatsApp business number (include country code, omit +)
  const phoneNumber = "919999999999"; 
  const message = encodeURIComponent("Hi MapMend Solution! I'm interested in your digital services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-900/30 hover:scale-110 transition-transform overflow-hidden group flex items-center justify-center cursor-pointer"
      aria-label="Chat on WhatsApp"
    >
      <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform rounded-full"></span>
      <FaWhatsapp className="w-7 h-7 relative z-10" />
      
      {/* Occasional ping animation for engagement */}
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
      <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
    </motion.a>
  );
}
