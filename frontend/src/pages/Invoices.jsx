import React, { useEffect, useState } from "react";
import { FiFileText, FiDownload, FiAlertCircle, FiCreditCard, FiCalendar, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import api from "../utils/api";

const STATUS_CONFIG = {
  paid:    { label: "Paid",    icon: <FiCheckCircle />, cls: "bg-neonCyan/10 text-neonCyan border-neonCyan/20",       dot: "bg-neonCyan" },
  created: { label: "Pending", icon: <FiClock />,       cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",   dot: "bg-amber-400" },
  pending: { label: "Pending", icon: <FiClock />,       cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",   dot: "bg-amber-400" },
  failed:  { label: "Failed",  icon: <FiXCircle />,     cls: "bg-red-500/10 text-red-400 border-red-500/20",         dot: "bg-red-500" },
};

const PLAN_COLORS = {
  starter:  "from-brandBlue/10 dark:from-neonBlue/20 to-accentCyan/5 dark:to-neonCyan/10 border-brandBlue/20 dark:border-neonBlue/20",
  business: "from-brandOrange/10 dark:from-neonPurple/20 to-neonPink/5 dark:to-neonPink/10 border-brandOrange/20 dark:border-neonPurple/20",
  premium:  "from-amber-500/10 dark:from-amber-500/20 to-brandOrange/5 dark:to-brandOrange/10 border-amber-500/20",
};

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get("/api/payments/my")
      .then(res => setInvoices(res.data || []))
      .catch(() => setInvoices([]))
      .finally(() => setLoading(false));
  }, []);

  const downloadInvoice = (payId) => {
    let url = `${import.meta.env.VITE_API_URL || ""}/api/payments/${payId}/invoice?token=${localStorage.getItem("mapmend_token")}`;
    const impersonateId = localStorage.getItem("impersonate_user_id");
    if (impersonateId) url += `&userId=${impersonateId}`;
    window.open(url, "_blank");
  };

  // Summary totals
  const totalPaid   = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalCount  = invoices.length;
  const paidCount   = invoices.filter(i => i.status === "paid").length;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.3)]" />
    </div>
  );

  return (
    <div className="max-w-5xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <FiFileText className="text-brandOrange dark:text-neonPurple" /> Invoices
        </h1>
        <p className="text-slate-600 dark:text-gray-400 mt-1">Track your payment history and download invoices.</p>
      </div>

      {/* EMPTY STATE */}
      {invoices.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="glass-card border border-slate-200 dark:border-white/10 rounded-3xl p-16 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-brandOrange/10 dark:bg-neonPurple/10 border border-brandOrange/20 dark:border-neonPurple/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
            <FiCreditCard className="text-3xl text-brandOrange dark:text-neonPurple" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">No Invoices Yet</h3>
          <p className="text-slate-500 dark:text-gray-400 max-w-md mb-8">
            Once you purchase a MapMend plan, your invoices will appear here with full download options.
          </p>
          <a
            href="/#pricing"
            className="inline-block bg-slate-900 dark:bg-white text-white dark:text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            View Pricing Plans →
          </a>
        </motion.div>
      )}

      {/* SUMMARY CARDS */}
      {invoices.length > 0 && (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: "Total Paid",
                value: `₹${(totalPaid / 100).toLocaleString("en-IN")}`,
                icon:  <FiCreditCard />,
                color: "from-brandBlue/10 dark:from-neonCyan/20 to-accentCyan/5 dark:to-neonBlue/10 border-brandBlue/20 dark:border-neonCyan/20",
                iconCls: "text-brandBlue dark:text-neonCyan",
                glow: "shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.1)]",
              },
              {
                label: "Total Invoices",
                value: totalCount,
                icon:  <FiFileText />,
                color: "from-brandOrange/10 dark:from-neonPurple/20 to-neonPink/5 dark:to-neonPink/10 border-brandOrange/20 dark:border-neonPurple/20",
                iconCls: "text-brandOrange dark:text-neonPurple",
                glow: "shadow-md dark:shadow-[0_0_20px_rgba(139,92,246,0.1)]",
              },
              {
                label: "Completed Payments",
                value: paidCount,
                icon:  <FiCheckCircle />,
                color: "from-brandBlue/10 dark:from-neonBlue/20 to-accentCyan/5 dark:to-neonCyan/10 border-brandBlue/20 dark:border-neonBlue/20",
                iconCls: "text-brandBlue dark:text-neonBlue",
                glow: "shadow-md dark:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
              },
            ].map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-gradient-to-br ${card.color} border rounded-2xl p-5 flex items-center gap-4 ${card.glow}`}
              >
                <div className={`w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xl ${card.iconCls}`}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-0.5">{card.label}</div>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{card.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* INVOICE CARDS */}
          <div className="space-y-3">
            {invoices.map((inv, i) => {
              const st = STATUS_CONFIG[inv.status] || STATUS_CONFIG.pending;
              const planColor = PLAN_COLORS[inv.planId] || "from-slate-100 dark:from-white/5 to-slate-50 dark:to-white/5 border-slate-200 dark:border-white/10";

              return (
                <motion.div
                  key={inv._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className={`bg-gradient-to-br ${planColor} border rounded-2xl p-5 hover:border-brandBlue/30 dark:hover:border-white/20 transition-all duration-300 hover-glow`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    {/* LEFT Plan info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                        <FiFileText className="text-xl text-slate-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-base">
                          {inv.planTitle || "MapMend Plan"}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-gray-500 font-mono mt-0.5 truncate max-w-[200px]">
                          {inv.razorpayOrderId || `INV-${inv._id?.slice(-6).toUpperCase()}`}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          {/* Status badge */}
                          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${st.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${st.dot} animate-pulse`} />
                            {st.label}
                          </span>
                          {/* Date */}
                          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-gray-500">
                            <FiCalendar className="text-[10px]" />
                            {new Date(inv.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric", month: "short", year: "numeric"
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT Amount + Download */}
                    <div className="flex items-center gap-5 sm:flex-col sm:items-end sm:gap-2">
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        ₹{(inv.amount / 100).toLocaleString("en-IN")}
                      </div>
                      {inv.status === "paid" && (
                        <button
                          onClick={() => downloadInvoice(inv._id)}
                          className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 hover:bg-brandBlue dark:hover:bg-neonCyan hover:text-white dark:hover:text-black text-brandBlue dark:text-neonCyan border border-brandBlue/20 dark:border-neonCyan/20 hover:border-brandBlue dark:hover:border-neonCyan px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 group"
                        >
                          <FiDownload className="group-hover:scale-110 transition-transform" />
                          PDF Invoice
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* FOOTER NOTE */}
          <p className="text-center text-xs text-slate-500 dark:text-gray-600 pb-4">
            Need help with a payment? Contact us on{" "}
            <a
              href="https://wa.me/917366890727"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brandBlue dark:text-neonCyan hover:underline font-semibold"
            >
              WhatsApp
            </a>
          </p>
        </>
      )}
    </div>
  );
}
