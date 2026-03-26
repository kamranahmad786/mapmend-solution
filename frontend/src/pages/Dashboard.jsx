// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // Show loader for 0.8s
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* FIXED SIDEBAR (under navbar height) */}
      <div className="fixed left-0 top-[80px] h-[calc(100vh-80px)] z-40">
        <DashboardSidebar />
      </div>

      {/* MAIN CONTENT AREA */}
      <main
        className="
          ml-64        /* space for sidebar */
          pt-[100px]  /* space for navbar */
          px-8 
          pb-10
          min-h-screen
          overflow-y-auto
        "
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
