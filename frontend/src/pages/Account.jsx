import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiAlertCircle, FiSave, FiShield } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold shadow-2xl border backdrop-blur-xl ${
        type === "success"
          ? "bg-neonCyan/10 border-neonCyan/30 text-neonCyan"
          : "bg-red-500/10 border-red-500/30 text-red-400"
      }`}
    >
      {type === "success" ? <FiCheckCircle className="text-lg" /> : <FiAlertCircle className="text-lg" />}
      {message}
    </motion.div>
  );
}

export default function Account() {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast,   setToast]   = useState(null);

  // Profile form
  const [profile,  setProfile]  = useState({ name: "", email: "" });
  const [savingP,  setSavingP]  = useState(false);

  // Password form
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [savingPwd, setSavingPwd] = useState(false);
  const [pwdError,  setPwdError]  = useState("");

  const showToast = (message, type = "success") => setToast({ message, type });

  useEffect(() => {
    api.get("/api/auth/me")
      .then(r => {
        setUser(r.data);
        setProfile({ name: r.data.name || "", email: r.data.email || "" });
      })
      .catch(() => showToast("Could not load profile data.", "error"))
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingP(true);
    try {
      await api.put("/api/auth/profile", { name: profile.name, email: profile.email });
      localStorage.setItem("mapmend_user_name", profile.name);
      showToast("Profile updated successfully!");
      setUser(prev => ({ ...prev, name: profile.name, email: profile.email }));
    } catch (err) {
      showToast(err.response?.data?.error || "Failed to update profile.", "error");
    } finally {
      setSavingP(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    setPwdError("");
    if (passwords.newPassword !== passwords.confirm) {
      return setPwdError("New passwords do not match.");
    }
    if (passwords.newPassword.length < 6) {
      return setPwdError("New password must be at least 6 characters.");
    }
    setSavingPwd(true);
    try {
      await api.put("/api/auth/password", {
        currentPassword: passwords.currentPassword,
        newPassword:     passwords.newPassword,
      });
      showToast("Password changed successfully!");
      setPasswords({ currentPassword: "", newPassword: "", confirm: "" });
    } catch (err) {
      setPwdError(err.response?.data?.error || "Failed to change password.");
    } finally {
      setSavingPwd(false);
    }
  };

  const initials = user?.name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl space-y-8">

      {/* TOAST */}
      <AnimatePresence>
        {toast && <Toast key="toast" {...toast} onDone={() => setToast(null)} />}
      </AnimatePresence>

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FiUser className="text-neonPurple" /> Account Settings
        </h1>
        <p className="text-gray-400 mt-1">Manage your profile, security, and account preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {/* AVATAR CARD */}
        <div className="glass-card border border-white/10 rounded-3xl p-8 flex flex-col items-center gap-4 text-center md:row-span-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neonCyan to-neonPurple flex items-center justify-center text-black font-extrabold text-3xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            {initials}
          </div>
          <div>
            <div className="text-xl font-extrabold text-white">{user?.name || "—"}</div>
            <div className="text-sm text-gray-500 mt-0.5">{user?.email}</div>
          </div>
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-neonCyan/10 text-neonCyan border border-neonCyan/20 uppercase tracking-widest">
            {user?.role || "client"}
          </span>
          <p className="text-xs text-gray-600 mt-2">Your avatar is auto-generated from your initials.</p>
        </div>

        {/* PROFILE FORM */}
        <form onSubmit={saveProfile} className="md:col-span-2 glass-card border border-white/10 rounded-3xl p-8 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FiUser className="text-neonCyan" /> Profile Information
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Full Name</label>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-neonCyan transition">
                <FiUser className="text-gray-500 shrink-0" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Your full name"
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-600 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">Email Address</label>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-neonCyan transition">
                <FiMail className="text-gray-500 shrink-0" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({ ...profile, email: e.target.value })}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-600 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={savingP}
              className="flex items-center gap-2 bg-neonCyan text-black font-extrabold px-6 py-3 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              {savingP ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <FiSave />}
              {savingP ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* PASSWORD FORM */}
        <form onSubmit={savePassword} className="md:col-span-2 glass-card border border-white/10 rounded-3xl p-8 space-y-5">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FiShield className="text-neonPurple" /> Change Password
          </h2>

          <div className="space-y-4">
            {[
              { key: "currentPassword", label: "Current Password",  placeholder: "Your current password" },
              { key: "newPassword",     label: "New Password",      placeholder: "At least 6 characters" },
              { key: "confirm",         label: "Confirm New Password", placeholder: "Re-enter new password" },
            ].map(f => (
              <div key={f.key} className="space-y-1.5">
                <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">{f.label}</label>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-neonPurple transition">
                  <FiLock className="text-gray-500 shrink-0" />
                  <input
                    type="password"
                    value={passwords[f.key]}
                    onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-600 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>

          {pwdError && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl"
            >
              <FiAlertCircle /> {pwdError}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={savingPwd}
            className="flex items-center gap-2 bg-neonPurple text-white font-extrabold px-6 py-3 rounded-xl hover:scale-[1.02] transition-all disabled:opacity-50 text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)]"
          >
            {savingPwd ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FiShield />}
            {savingPwd ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
