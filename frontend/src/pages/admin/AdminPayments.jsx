import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { FiCreditCard, FiExternalLink, FiDollarSign } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await api.get("/api/admin/payments");
      setPayments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const refund = async (paymentId) => {
    if (!window.confirm("Are you sure you want to refund this amount?")) return;
    try {
      const res = await api.post("/api/admin/payments/refund", { paymentId });
      alert("Refund Initiated: " + res.data.refund.id);
      fetchPayments();
    } catch (err) {
      alert(err.response?.data?.error || "Refund failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FiCreditCard className="text-green-400" /> Revenue & Payments
          </h2>
          <p className="text-gray-400 mt-2">Track Razorpay transactions and issue instant algorithmic refunds.</p>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl bg-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#111] text-xs uppercase text-gray-400 font-bold tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Transaction Details</th>
                <th className="px-6 py-4">Plan & Amount</th>
                <th className="px-6 py-4">Current Status</th>
                <th className="px-6 py-4">Payment Tracking IDs</th>
                <th className="px-6 py-4 text-center">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {payments.map((p, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={p._id} className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{p.userId?.name || "Unknown"}</div>
                    <div className="text-gray-500 text-sm">{p.userId?.email || "No email"}</div>
                    <div className="text-gray-600 text-xs mt-1">{new Date(p.createdAt).toLocaleDateString()}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-green-400" />
                      <span className="font-extrabold text-white text-lg">₹{(p.amount / 100).toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-neonPurple font-bold uppercase tracking-widest mt-1">
                      {p.planId}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full border ${
                      p.status === 'captured' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                      p.status === 'refunded' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
                      'bg-gray-500/10 text-gray-400 border-gray-500/20'
                    }`}>
                      {p.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-xs font-mono space-y-1">
                    <div><span className="text-gray-600 block mb-0.5 uppercase tracking-wider">Razorpay ID</span> {p.razorpayPaymentId || "N/A"}</div>
                    <div><span className="text-gray-600 block mb-0.5 mt-2 uppercase tracking-wider">Order DB</span> {p.orderId || "N/A"}</div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {p.status === "captured" ? (
                      <button 
                        onClick={() => refund(p._id)}
                        className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold border border-red-500/20 hover:border-red-400 transition-colors"
                      >
                        Refund Payment
                      </button>
                    ) : (
                      <span className="text-gray-500 text-xs italic tracking-wider uppercase font-bold px-4">
                        Locked
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
              
              {payments.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">No payment records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
