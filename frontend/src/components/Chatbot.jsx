import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMessageSquare,
  FiSend,
  FiMinimize2,
  FiCopy,
  FiCheck,
  FiZap,
  FiChevronDown,
} from "react-icons/fi";
import { FaRobot, FaWhatsapp } from "react-icons/fa";
import api from "../utils/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getTimeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

// Simple markdown-lite renderer: **bold**, bullet points (•), and clickable links
function renderMarkdown(text) {
  if (!text) return null;
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Process bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={j} className="font-bold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      // Process links in text
      const linkParts = part.split(/(https?:\/\/[^\s,)]+|\/[a-z-]+(?:\/[a-z-]+)*)/gi);
      return linkParts.map((lp, k) => {
        if (lp.match(/^https?:\/\//)) {
          return (
            <a
              key={`${j}-${k}`}
              href={lp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandBlue dark:text-neonCyan underline underline-offset-2 hover:opacity-80"
            >
              {lp}
            </a>
          );
        }
        if (lp.match(/^\/[a-z-]+/)) {
          return (
            <a
              key={`${j}-${k}`}
              href={lp}
              className="text-brandBlue dark:text-neonCyan underline underline-offset-2 hover:opacity-80"
            >
              {lp}
            </a>
          );
        }
        return lp;
      });
    });

    return (
      <span key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Chatbot() {
  const phoneNumber = "917366890727";
  const whatsappMsg = encodeURIComponent(
    "Hi MapMend Solution! I'm interested in your digital services."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initial greeting message
  const initialMessage = {
    id: 1,
    sender: "bot",
    text: `${getTimeGreeting()}! 👋 I'm the MapMend AI Assistant. I can help you with our services, pricing, delivery timelines, and more. What would you like to know?`,
    timestamp: Date.now(),
  };

  const initialSuggestions = [
    "View Pricing Plans",
    "Our Services",
    "Book Free Audit",
    "Contact Us",
  ];

  // Initialize messages on first render
  useEffect(() => {
    setMessages([initialMessage]);
    setSuggestions(initialSuggestions);
  }, []);

  // Auto-scroll
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Auto-open after 30s on first visit
  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem("chatbot_auto_opened");
    if (alreadyOpened || hasAutoOpened) return;

    const timer = setTimeout(() => {
      if (!isOpen) {
        setUnreadCount(1);
        setHasAutoOpened(true);
        sessionStorage.setItem("chatbot_auto_opened", "true");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, hasAutoOpened]);

  // Copy message handler
  const copyMessage = (text, id) => {
    navigator.clipboard?.writeText(text.replace(/\*\*/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ─── Send Message ───────────────────────────────────────────────────────────
  const sendMessage = async (text) => {
    const trimmed = (text || inputText).trim();
    if (!trimmed || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setSuggestions([]);
    setIsTyping(true);

    try {
      // Build history for context (exclude the initial greeting and current message)
      const history = messages
        .filter((m) => m.id !== 1)
        .slice(-10)
        .map((m) => ({ sender: m.sender, text: m.text }));

      const res = await api.post("/api/chat", {
        message: trimmed,
        history,
      });

      const { reply, suggestions: newSuggestions } = res.data;

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: reply || "I'm sorry, I couldn't process that. Please try again or contact us on WhatsApp!",
        timestamp: Date.now(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
      setSuggestions(
        Array.isArray(newSuggestions) && newSuggestions.length > 0
          ? newSuggestions.slice(0, 3)
          : ["View pricing plans", "Our services", "Contact us"]
      );

      if (!isOpen) setUnreadCount((c) => c + 1);
    } catch {
      setIsTyping(false);
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "I'm having trouble connecting right now. You can reach our team directly on **WhatsApp at +91 7366890727** or try again in a moment! 🙏",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setSuggestions(["Try again", "Contact on WhatsApp", "View pricing"]);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleChipClick = (text) => {
    sendMessage(text);
  };

  // ─── Scroll-to-bottom FAB (shows when scrolled up) ─────────────────────────
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const handleChatScroll = () => {
    if (!chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
  };

  return (
    <>
      {/* ─── Trigger Button ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-br from-brandBlue to-brandOrange text-white shadow-xl shadow-brandBlue/30 hover:shadow-2xl hover:shadow-brandOrange/30 hover:scale-110 transition-all duration-300 overflow-hidden group"
            aria-label="Open chat"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform rounded-full" />
            <FiMessageSquare className="w-6 h-6 relative z-10" />

            {/* Unread badge */}
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-black text-white z-20 border-2 border-white dark:border-darkBg"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </motion.span>
            )}

            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping bg-brandBlue/30 pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Window ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-4rem)] flex flex-col rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-colors duration-500"
          >
            {/* ─── Header ─────────────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-brandBlue to-brandOrange p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-inner">
                  <FaRobot className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">
                    MapMend AI Assistant
                  </h3>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
                    <span className="text-[11px] text-white/80 font-medium">
                      {isTyping ? "Thinking..." : "Online"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 relative z-10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:bg-white/20 p-2 rounded-full transition-colors group relative"
                  aria-label="Chat on WhatsApp"
                  title="Direct WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Minimize Chat"
                >
                  <FiMinimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ─── Messages Area ──────────────────────────────────────── */}
            <div
              ref={chatContainerRef}
              onScroll={handleChatScroll}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#0a0a0f] transition-colors duration-500 relative"
              style={{ scrollbarWidth: "thin" }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex flex-col max-w-[85%] group">
                    {/* Bot avatar */}
                    {msg.sender === "bot" && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brandBlue to-brandOrange flex items-center justify-center shadow-sm">
                          <FaRobot className="text-white text-[8px]" />
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium">
                          AI Assistant
                        </span>
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed relative ${
                        msg.sender === "user"
                          ? "bg-gradient-to-br from-brandBlue to-brandBlue/90 text-white rounded-tr-md shadow-md shadow-brandBlue/20"
                          : "bg-white dark:bg-white/[0.06] text-slate-700 dark:text-gray-200 rounded-tl-md border border-slate-200 dark:border-white/10 shadow-sm"
                      }`}
                    >
                      {msg.sender === "bot"
                        ? renderMarkdown(msg.text)
                        : msg.text}

                      {/* Copy button (bot messages only) */}
                      {msg.sender === "bot" && (
                        <button
                          onClick={() => copyMessage(msg.text, msg.id)}
                          className="absolute -bottom-3 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-full p-1 shadow-sm"
                          title="Copy message"
                        >
                          {copiedId === msg.id ? (
                            <FiCheck className="w-3 h-3 text-green-500" />
                          ) : (
                            <FiCopy className="w-3 h-3 text-slate-400" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Timestamp */}
                    <span
                      className={`text-[10px] mt-1 ${
                        msg.sender === "user"
                          ? "text-right text-slate-400 dark:text-gray-600"
                          : "text-slate-400 dark:text-gray-600"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-brandBlue to-brandOrange flex items-center justify-center">
                        <FaRobot className="text-white text-[8px]" />
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-gray-500 font-medium">
                        AI is thinking...
                      </span>
                    </div>
                    <div className="bg-white dark:bg-white/[0.06] text-slate-500 rounded-2xl rounded-tl-md px-4 py-3 flex space-x-1.5 border border-slate-200 dark:border-white/10 shadow-sm w-fit">
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: 0 }}
                        className="w-2 h-2 bg-brandBlue/60 dark:bg-neonCyan/60 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: 0.15 }}
                        className="w-2 h-2 bg-brandBlue/60 dark:bg-neonCyan/60 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 0.7, delay: 0.3 }}
                        className="w-2 h-2 bg-brandBlue/60 dark:bg-neonCyan/60 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={scrollToBottom}
                  className="absolute bottom-[140px] right-4 z-10 w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-lg flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-brandBlue dark:hover:text-neonCyan transition-colors"
                >
                  <FiChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ─── quick reply Chips ──────────────────────────────────── */}
            <AnimatePresence>
              {suggestions.length > 0 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-slate-50 dark:bg-[#0a0a0f] border-t border-slate-100 dark:border-white/5 px-3 py-2 overflow-hidden transition-colors duration-500"
                >
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {suggestions.map((s, i) => (
                      <motion.button
                        key={`${s}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        onClick={() => handleChipClick(s)}
                        className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-gray-300 hover:bg-brandBlue/10 dark:hover:bg-neonCyan/10 hover:text-brandBlue dark:hover:text-neonCyan hover:border-brandBlue/30 dark:hover:border-neonCyan/30 transition-all duration-200 active:scale-95"
                      >
                        {s}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Input Area ────────────────────────────────────────── */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-[#0d0d14] border-t border-slate-200 dark:border-white/10 flex items-center space-x-2 shrink-0 transition-colors duration-500"
            >
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 border border-slate-200 dark:border-white/10 rounded-full px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-brandBlue/40 dark:focus:ring-neonCyan/40 focus:border-brandBlue dark:focus:border-neonCyan transition-all duration-300"
                  disabled={isTyping}
                />
                {inputText.length > 0 && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 dark:text-gray-600 font-mono">
                    {inputText.length}/500
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-gradient-to-br from-brandBlue to-brandOrange hover:shadow-lg hover:shadow-brandOrange/20 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center active:scale-90"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </form>

            {/* ─── Footer Badge ──────────────────────────────────────── */}
            <div className="bg-white dark:bg-[#0d0d14] px-3 py-1.5 flex items-center justify-center gap-1.5 border-t border-slate-100 dark:border-white/5 transition-colors duration-500">
              <FiZap className="w-3 h-3 text-brandOrange" />
              <span className="text-[9px] text-slate-400 dark:text-gray-600 font-semibold uppercase tracking-widest">
                Powered by AI • MapMend Solution
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
