import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageSquare, FiX, FiSend, FiMinimize2 } from "react-icons/fi";
import { FaRobot, FaWhatsapp } from "react-icons/fa";

export default function Chatbot() {
  // Replace with your actual WhatsApp business number
  const phoneNumber = "919999999999"; 
  const whatsappMsg = encodeURIComponent("Hi MapMend Solution! I'm interested in your digital services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi there! I'm the MapMend Assistant. How can I help you modernize your digital presence today?",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Comprehensive knowledge-base logic based on website copy
  const generateBotResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();
    
    // Greeting
    if (lower.match(/^(hi|hello|hey|greetings|hola)/)) {
      return "Hello there! I can help you with our Services, Pricing, FAQs, or put you in touch with our team. What exactly are you looking to improve for your business today?";
    }
    
    // Core Services Overview
    if (lower.includes("service") || lower.includes("offer") || lower.includes("what do you do")) {
      return "We offer 6 premium services: Website Creation, Google Maps Optimization, Website Redesign, Speed Optimization, Business Digitization, and custom Landing Pages. Which one are you interested in?";
    }

    // Specific Service: Website Creation
    if (lower.includes("website") && (lower.includes("create") || lower.includes("build") || lower.includes("make"))) {
      return "We build modern, mobile-friendly websites designed for trust & conversions! We also do redesigns if you have an old site. Would you like to know our pricing?";
    }

    // Specific Service: Maps & SEO
    if (lower.includes("map") || lower.includes("seo") || lower.includes("rank") || lower.includes("google")) {
      return "Our Deep Performance Audit reviews your Google Maps and website completely! We correct categories, optimize SEO, and automate trust signals so the Google algorithm natively prioritizes you to increase real customers.";
    }

    // Specific Service: Speed
    if (lower.includes("speed") || lower.includes("slow") || lower.includes("fast")) {
      return "We offer Speed Optimization starting from ₹999. We fix slow websites with compression and code cleanup to give you a significantly faster loading experience.";
    }

    // Specific Service: Landing Pages
    if (lower.includes("landing") || lower.includes("ad")) {
      return "Our Landing Pages start at ₹1,499! We build high-conversion pages strictly designed for ads, leads, and promotions.";
    }

    // Pricing & Costs (Using INR from Pricing.jsx)
    if (lower.includes("price") || lower.includes("cost") || lower.includes("fee") || lower.includes("plan")) {
      return "We have three transparent One-Time Payment plans: 'Starter Digital' (₹2,599), 'Business Pro' (₹4,999), and 'Enterprise Elite' (₹7,599). All plans include free domain, SSL, and maintenance!";
    }

    // Speed of delivery / FAQs
    if (lower.includes("how fast") || lower.includes("how long") || lower.includes("time") || lower.includes("days")) {
      return "Our smart data-driven optimizations ensure initial delivery within 1–3 days! Most of our partners notice influxes in footfall within mere days of our updates taking effect.";
    }
    
    if (lower.includes("payment")) {
      return "Payments are made securely using unified gateways. You can initiate the project with 50% down! Just hit a 'Choose Plan' button on the Pricing section.";
    }

    // Contact & Support
    if (lower.includes("contact") || lower.includes("support") || lower.includes("help") || lower.includes("email") || lower.includes("call") || lower.includes("whatsapp")) {
      return "You can reach our team via the Contact form on the homepage, or simply click the green WhatsApp icon at the top of this chat to message us directly!";
    }

    // Default Fallback
    return "That's a great question! While I am just the smart assistant, our human experts can give you a deeper answer. Feel free to click the WhatsApp icon above to chat with us, or send an email to info@mapmendsolution.com.";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), sender: "user", text: inputText.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      setIsTyping(false);
      const reply = {
        id: Date.now() + 1,
        sender: "bot",
        text: generateBotResponse(newMsg.text),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <>
      {/* Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-brandBlue text-white shadow-xl shadow-brandBlue/30 hover:scale-110 transition-transform overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform rounded-full"></span>
            <FiMessageSquare className="w-6 h-6 relative z-10" />
            
            {/* Ping indicator */}
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] flex flex-col rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl backdrop-blur-xl bg-black/60"
          >
            {/* Header */}
            <div className="bg-brandNavy p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-brandBlue flex items-center justify-center p-[2px]">
                  <div className="w-full h-full bg-black/50 rounded-full flex items-center justify-center">
                    <FaRobot className="text-white text-lg" />
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">MapMend Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    <span className="text-xs text-blue-200">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 p-2 hover:bg-white/10 rounded-full transition-colors group relative"
                  aria-label="Chat on WhatsApp"
                  title="Direct WhatsApp Reach"
                >
                  <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close Chat"
                >
                  <FiMinimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/20">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brandBlue text-white rounded-tr-sm shadow-md"
                        : "bg-white/10 text-gray-200 rounded-tl-sm border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-gray-300 rounded-2xl rounded-tl-sm px-4 py-3 flex space-x-1.5 border border-white/5 w-fit">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-black/40 border-t border-white/10 flex items-center space-x-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-white/5 text-white placeholder-gray-400 border border-white/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/50 transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="bg-brandOrange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-full shadow-lg transition-colors flex items-center justify-center"
              >
                <FiSend className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
