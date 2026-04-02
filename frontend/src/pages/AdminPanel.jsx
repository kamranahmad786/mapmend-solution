import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("mapmend_token");
    const role  = localStorage.getItem("mapmend_role");

    if (!token || role !== "admin") {
      // Clear any stale client session and redirect to admin login
      navigate("/admin/login", { replace: true });
      return;
    }
    // Simulate secure hand-shake loader
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white flex overflow-hidden">
      
      {/* FULL-SCREEN SECURE LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-[#08080c]/90 backdrop-blur-md flex items-center justify-center z-[999]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <p className="mt-6 text-neonCyan font-extrabold tracking-widest text-lg animate-pulse">
              AUTHENTICATING...
            </p>
          </div>
        </div>
      )}

      {/* ADMIN SIDEBAR (Left Anchor) */}
      <div className="w-64 shrink-0 hidden md:block">
        <AdminSidebar />
      </div>

      {/* MOBILE WARNING (optional but robust) */}
      <div className="md:hidden flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#08080c]">
        <h2 className="text-2xl font-bold text-white mb-4">Desktop Required</h2>
        <p className="text-gray-400">The MapMend Administrator Command Center is optimized strictly for desktop displays to manage high-density intelligence data.</p>
        <button onClick={() => navigate("/")} className="mt-8 px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">Return Home</button>
      </div>

      {/* MAIN CONTENT AREA */}
      {!loading && (
        <main className="flex-1 h-screen overflow-y-auto hidden md:block relative custom-scrollbar">
          {/* Subtle noise/grid overlay can go here */}
          <div className="p-10">
            <Outlet />
          </div>
        </main>
      )}

    </div>
  );
}
