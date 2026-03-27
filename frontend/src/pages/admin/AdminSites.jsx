import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { FiGlobe, FiExternalLink, FiSearch, FiTrash2, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminSites() {
  const [sites, setSites] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await api.get("/api/admin/sites");
      setSites(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSite = async (id) => {
    if (!window.confirm("WARNING: Destroying this site audit record is unrecoverable. Proceed?")) return;
    try {
      await api.delete("/api/admin/sites/" + id);
      setSites((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.error || "Error deleting site");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "needs_improvement" ? "good" : "needs_improvement";
    try {
      const res = await api.put("/api/admin/sites/" + id, { status: nextStatus });
      setSites((prev) => prev.map((s) => (s._id === id ? res.data : s)));
    } catch (err) {
      alert(err.response?.data?.error || "Error updating status");
    }
  };

  const filtered = sites.filter((s) => s.domain.toLowerCase().includes(search.toLowerCase()) || (s.userId?.email && s.userId.email.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonBlue/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FiGlobe className="text-neonBlue" /> Connected Sites & Audits
          </h2>
          <p className="text-gray-400 mt-2">Monitor client domains and forcefully alter Search Engine Indexing updates.</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search domains or emails..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonBlue focus:ring-1 focus:ring-neonBlue outline-none py-3 pl-11 pr-4 rounded-xl transition-all duration-300"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl bg-black/40 pb-20 md:pb-0">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#111] text-xs uppercase text-gray-400 font-bold tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Client Domain</th>
                <th className="px-6 py-4">Attached Client</th>
                <th className="px-6 py-4">Current Audit Score</th>
                <th className="px-6 py-4">Submission Date</th>
                <th className="px-6 py-4 text-center">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filtered.map((s, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={s._id} className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-lg flex items-center gap-2">
                      <a href={`https://${s.domain}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-neonBlue">{s.domain}</a>
                      <FiExternalLink className="text-gray-600 text-sm" />
                    </div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider mt-1 flex gap-2">
                       <span>Last Updated: <span className="text-gray-300 font-bold ml-1">{new Date(s.lastChecked).toLocaleDateString()}</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-white font-semibold">{s.userId?.name || "Unknown"}</div>
                    <div className="text-gray-500 text-sm">{s.userId?.email || "No email attached"}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-1.5 text-xs font-bold rounded-lg border ${
                        s.status === 'good' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {s.status === 'needs_improvement' ? 'Needs Improvement' : 'Healthy Index'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        onClick={() => toggleStatus(s._id, s.status)}
                        className="text-neonCyan hover:text-white bg-neonCyan/10 hover:bg-neonCyan/20 px-4 py-2 rounded-xl text-xs font-bold border border-neonCyan/20 hover:border-neonCyan hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all flex items-center gap-2"
                        title="Force update the SEO Score to trigger alerts for the user"
                      >
                        <FiEdit2 /> Toggle Score
                      </button>
                      
                      <button 
                        onClick={() => deleteSite(s._id)}
                        className="text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500 px-3 py-2 rounded-xl text-lg border border-red-500/20 hover:border-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                        title="Permanently Delete Domain Record"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500 font-medium">No system domains registered to audit.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
