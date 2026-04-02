// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { FiEye, FiXCircle } from "react-icons/fi";
import api from "../utils/api";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const impersonateId   = localStorage.getItem("impersonate_user_id");
  const impersonateName = localStorage.getItem("impersonate_user_name");

  // Verify session — allow admins only if they are in impersonation mode
  useEffect(() => {
    const token         = localStorage.getItem("mapmend_token");
    const role          = localStorage.getItem("mapmend_role");
    const impersonating = localStorage.getItem("impersonate_user_id");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    if (role === "admin" && !impersonating) {
      navigate("/admin", { replace: true });
      return;
    }

    // Fetch and cache the user's name for the sidebar
    api.get("/api/auth/me")
      .then(res => {
        if (res.data?.name) {
          localStorage.setItem("mapmend_user_name", res.data.name);
        }
      })
      .catch(() => {})
      .finally(() => setTimeout(() => setLoading(false), 600));
  }, []);

  const exitImpersonation = () => {
    localStorage.removeItem("impersonate_user_id");
    localStorage.removeItem("impersonate_user_name");
    navigate("/admin/users");
  };

  return (
    <div className="bg-[#050505] min-h-screen flex text-white overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 shrink-0 fixed left-0 top-0 h-full z-40">
        <DashboardSidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">

        {/* IMPERSONATION BANNER */}
        {impersonateId && (
          <div className="fixed top-0 left-64 right-0 z-50 bg-gradient-to-r from-brandBlue to-neonPurple/80 text-white py-2.5 px-6 flex items-center justify-between shadow-xl border-b border-white/10">
            <div className="flex items-center gap-3 font-bold text-sm tracking-wide">
              <FiEye className="animate-pulse text-lg text-neonCyan" />
              <span className="uppercase text-xs opacity-70 tracking-widest">Inspection Mode</span>
              <span className="bg-white/20 px-3 py-1 rounded-lg text-sm">Viewing as {impersonateName}</span>
            </div>
            <button
              onClick={exitImpersonation}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-lg border border-red-400"
            >
              <FiXCircle /> Exit
            </button>
          </div>
        )}

        {/* CONTENT */}
        <main className={`flex-1 overflow-y-auto px-8 pb-12 ${impersonateId ? "pt-[60px]" : "pt-8"}`}>

          {/* FULL-SCREEN LOADER */}
          {loading && (
            <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-[999]">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin shadow-[0_0_20px_rgba(6,182,212,0.4)]" />
                <p className="mt-5 text-neonCyan font-bold tracking-widest text-sm animate-pulse uppercase">
                  Loading Dashboard...
                </p>
              </div>
            </div>
          )}

          {!loading && <Outlet />}
        </main>
      </div>
    </div>
  );
}
