import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { FiCreditCard, FiDollarSign, FiPlus, FiX, FiSave, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_STYLE = {
  paid:     "bg-neonCyan/10 text-neonCyan border-neonCyan/20",
  captured: "bg-neonCyan/10 text-neonCyan border-neonCyan/20",
  created:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
  refunded: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  manual:   "bg-neonPurple/10 text-neonPurple border-neonPurple/20",
};

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [users,    setUsers]    = useState([]);
  const [showAdd,  setShowAdd]  = useState(false);
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState(null);

  const [form, setForm] = useState({
    userId: "", planTitle: "Starter Plan", amount: "", note: ""
  });

  useEffect(() => {
    fetchPayments();
    api.get("/api/admin/users").then(r => setUsers(r.data.filter(u => u.role !== "admin"))).catch(() => {});
  }, []);

  const fetchPayments = async () => {
    const res = await api.get("/api/admin/payments").catch(() => ({ data: [] }));
    setPayments(res.data);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const recordPayment = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/api/admin/payments/manual", {
        userId:    form.userId,
        planTitle: form.planTitle,
        amount:    parseFloat(form.amount),
        note:      form.note,
      });
      await fetchPayments();
      setShowAdd(false);
      setForm({ userId: "", planTitle: "Starter Plan", amount: "", note: "" });
      showToast("Payment recorded & invoice emailed to client ✓");
    } catch (err) {
      showToast(err.response?.data?.error || "Error recording payment", "error");
    } finally { setSaving(false); }
  };

  const totalRevenue = payments
    .filter(p => p.status === "paid" || p.status === "captured")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-neonCyan/10 border-neonCyan/30 text-neonCyan"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
            <FiCheckCircle /> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-3xl border border-white/5">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <FiCreditCard className="text-neonCyan" /> Revenue & Payments
          </h2>
          <p className="text-gray-400 mt-1 text-sm">
            Total Collected: <span className="text-neonCyan font-extrabold">₹{(totalRevenue / 100).toLocaleString("en-IN")}</span>
            <span className="ml-2 text-gray-600">across {payments.filter(p => p.status === "paid" || p.status === "captured").length} paid invoices</span>
          </p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-neonCyan text-black font-extrabold px-5 py-3 rounded-xl hover:scale-105 transition-transform text-sm shadow-[0_0_15px_rgba(6,182,212,0.25)]">
          <FiPlus /> Record Manual Payment
        </button>
      </div>

      {/* TABLE */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#111] text-xs uppercase text-gray-400 font-bold tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Plan & Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Order / Reference</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {payments.map((p, i) => (
                <motion.tr key={p._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{p.user?.name || p.userEmail?.split("@")[0] || "—"}</div>
                    <div className="text-gray-500 text-xs">{p.user?.email || p.userEmail || "—"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <FiDollarSign className="text-neonCyan" />
                      <span className="font-extrabold text-white text-lg">₹{(p.amount / 100).toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-neonPurple font-bold uppercase tracking-widest">{p.planTitle || p.planId || "—"}</span>
                      {(p.planId === "manual" || (p.razorpayOrderId || "").startsWith("MANUAL")) && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neonPurple/10 text-neonPurple border border-neonPurple/20">MANUAL</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLE[p.status] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}>
                      {(p.status || "unknown").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                    <div className="truncate max-w-[200px]">{p.razorpayOrderId || "—"}</div>
                    <div className="text-gray-700 truncate max-w-[200px]">{p.razorpayPaymentId || ""}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(p.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </motion.tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan="5" className="text-center py-16 text-gray-600">No payment records yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RECORD MANUAL PAYMENT MODAL */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              className="bg-[#111116] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl">
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h3 className="text-lg font-extrabold text-white">💰 Record Manual Payment</h3>
                <button onClick={() => setShowAdd(false)} className="text-gray-500 hover:text-white transition"><FiX className="text-xl" /></button>
              </div>
              <form onSubmit={recordPayment} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Select Client *</label>
                  <select value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required
                    className="w-full bg-white/5 border border-white/10 text-white focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition">
                    <option value="" disabled>— Pick a client —</option>
                    {users.map(u => <option key={u._id} value={u._id} style={{ background: "#111" }}>{u.name} ({u.email})</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Plan / Description *</label>
                  <input value={form.planTitle} onChange={e => setForm({ ...form, planTitle: e.target.value })} required
                    placeholder="e.g. Starter Plan, Custom Website"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Amount (₹) *</label>
                  <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required
                    placeholder="e.g. 1999"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Note (optional)</label>
                  <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })}
                    placeholder="e.g. Cash payment received on 01 Apr 2026"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition" />
                </div>
                <p className="text-xs text-gray-500">📧 The client will receive a payment confirmation + PDF invoice by email.</p>
                <button type="submit" disabled={saving}
                  className="w-full bg-neonCyan text-black font-extrabold py-3 rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {saving ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <FiSave />}
                  {saving ? "Recording..." : "Record Payment & Email Invoice"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
