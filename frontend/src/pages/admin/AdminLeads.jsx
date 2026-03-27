import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { FiMail, FiCheckCircle, FiClock, FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await api.get("/api/admin/contacts");
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const markResolved = async (id, currentStatus) => {
    const next = currentStatus === "resolved" ? "unread" : "resolved";
    try {
      const res = await api.put(`/api/admin/contacts/${id}`, { status: next });
      setLeads((prev) => prev.map((l) => (l._id === id ? res.data : l)));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonPink/10 rounded-full blur-[150px] pointer-events-none"></div>
        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FiMail className="text-neonPink" /> Lead Inbox
        </h2>
        <p className="text-gray-400 mt-2">Manage incoming prospects from the Homepage Contact Form.</p>
      </div>

      {/* FEED */}
      <div className="grid gap-6">
        {leads.length === 0 ? (
          <div className="glass-card p-10 rounded-3xl text-center text-gray-500 font-medium">
            Inbox is empty format. No hot leads waiting.
          </div>
        ) : (
          leads.map((lead, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={lead._id}
              className={`glass-card p-6 md:p-8 rounded-3xl border transition-colors relative group overflow-hidden ${
                lead.status === "resolved" 
                  ? "border-white/5 bg-black/40 opacity-70" 
                  : "border-neonPink/20 bg-[#08080c]/80 shadow-[0_0_20px_rgba(236,72,153,0.05)]"
              }`}
            >
              {/* Unread Glow */}
              {lead.status !== "resolved" && (
                <div className="absolute top-0 left-0 w-1 h-full bg-neonPink shadow-[0_0_15px_rgba(236,72,153,0.8)]"></div>
              )}

              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                
                {/* LEAD INFO */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h3 className={`text-xl font-extrabold ${lead.status === 'resolved' ? 'text-gray-300' : 'text-white'}`}>{lead.name}</h3>
                    {lead.business && (
                      <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider rounded-lg border border-white/5 flex items-center gap-1">
                        <FiStar className="text-neonPurple" /> {lead.business}
                      </span>
                    )}
                    <span className="text-gray-500 text-sm ml-auto md:ml-0 flex items-center gap-1">
                      <FiClock /> {new Date(lead.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Email Address</span>
                      <p className="text-neonCyan font-medium mt-1">
                        <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                      </p>
                    </div>
                    {lead.phone && (
                      <div>
                        <span className="text-gray-500 text-xs uppercase font-bold tracking-wider">Phone Number</span>
                        <p className="text-white mt-1">{lead.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-0">
                    <p className={`whitespace-pre-wrap text-sm leading-relaxed ${lead.status === 'resolved' ? 'text-gray-500' : 'text-gray-300'}`}>
                      "{lead.message}"
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 shrink-0 self-stretch justify-start items-end md:items-center pt-2">
                  <button
                    onClick={() => markResolved(lead._id, lead.status)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all border ${
                      lead.status === "resolved" 
                        ? "bg-transparent text-gray-500 border-white/10 hover:text-white hover:border-white/20"
                        : "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-black hover:border-green-400 shadow-[0_0_10px_rgba(74,222,128,0.2)]"
                    }`}
                  >
                    <FiCheckCircle className="text-lg" />
                    {lead.status === "resolved" ? "Mark Unread" : "Resolve Query"}
                  </button>
                  
                  {lead.status !== "resolved" && (
                    <a href={`mailto:${lead.email}`} className="text-sm text-neonCyan hover:text-white transition-colors mt-2 text-center underline underline-offset-4">
                      Direct Reply
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          ))
        )}
      </div>
      
    </div>
  );
}
