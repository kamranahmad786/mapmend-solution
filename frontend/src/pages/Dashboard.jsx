// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Navbar from "../components/Navbar";
import { FiEye, FiXCircle } from "react-icons/fi";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const impersonateId = localStorage.getItem("impersonate_user_id");
  const impersonateName = localStorage.getItem("impersonate_user_name");

  // Show loader for 0.8s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const exitImpersonation = () => {
    localStorage.removeItem("impersonate_user_id");
    localStorage.removeItem("impersonate_user_name");
    navigate("/admin/users");
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* IMPERSONATION BANNER */}
      {impersonateId && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-brandBlue text-white py-2 px-6 flex items-center justify-between shadow-xl animate-slideDown border-b border-white/10">
          <div className="flex items-center gap-3 font-bold text-sm tracking-wide">
            <FiEye className="animate-pulse text-lg" />
            <span className="uppercase opacity-70">Inspection Mode:</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg">Viewing as {impersonateName}</span>
          </div>
          <button 
            onClick={exitImpersonation}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1 rounded-lg text-xs font-black uppercase tracking-tighter transition-all hover:scale-105 active:scale-95 shadow-lg border border-red-400"
          >
            <FiXCircle /> Exit Inspection
          </button>
        </div>
      )}

      {/* FIXED NAVBAR */}
      <div className={`fixed left-0 right-0 z-50 transition-all ${impersonateId ? 'top-[44px]' : 'top-0'}`}>
        <Navbar />
      </div>

      {/* FIXED SIDEBAR (under navbar height) */}
      <div className={`fixed left-0 z-40 h-full transition-all ${impersonateId ? 'top-[124px]' : 'top-[80px]'}`}>
        <DashboardSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <main
        className={`
          ml-64        /* space for sidebar */
          px-8 
          pb-10
          min-h-screen
          overflow-y-auto
          transition-all
          ${impersonateId ? 'pt-[140px]' : 'pt-[100px]'}
        `}
      >
        {/* FULL-SCREEN LOADER */}
        {loading && (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[999]">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 border-4 border-brandBlue border-t-brandOrange rounded-full animate-spin"></div>
              <p className="mt-4 text-brandBlue font-semibold text-lg animate-pulse">
                Loading Dashboard...
              </p>
            </div>
          </div>
        )}

        {/* PAGE CONTENT */}
        {!loading && <Outlet />}
      </main>

    </div>
  );
}
