import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { FiUser, FiActivity, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-neonPurple/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div>
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <FiUser className="text-neonCyan" /> Manage Users
          </h2>
          <p className="text-gray-400 mt-2">See every client authenticated in MapMend ecosystem.</p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none py-3 pl-11 pr-4 rounded-xl transition-all duration-300"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl bg-black/40">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#111] text-xs uppercase text-gray-400 font-bold tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Email Address</th>
                <th className="px-6 py-4">System Role</th>
                <th className="px-6 py-4 flex gap-2"><FiActivity /> Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filtered.map((user, i) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={user._id} className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neonCyan/20 to-neonPurple/20 border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${user.role === 'admin' ? 'bg-neonPink/10 text-neonPink border border-neonPink/20' : 'bg-neonCyan/10 text-neonCyan border border-neonCyan/20'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
              
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-500">No users found matching query.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
