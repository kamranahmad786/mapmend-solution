import React from "react";
import {
  FiGrid,
  FiGlobe,
  FiFileText,
  FiCpu,
  FiUser,
  FiLogOut,
  FiMessageSquare,
  FiArrowLeft,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const name = localStorage.getItem("mapmend_user_name") || "User";
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  const logout = () => {
    localStorage.removeItem("mapmend_token");
    localStorage.removeItem("mapmend_role");
    localStorage.removeItem("mapmend_user_name");
    navigate("/login");
  };

  const menu = [
    { id: "home",     label: "Overview",    icon: <FiGrid />,         path: "/dashboard" },
    { id: "ai",       label: "Performance Analysis", icon: <FiCpu />,          path: "/dashboard/ai" },
    { id: "sites",    label: "My Websites", icon: <FiGlobe />,        path: "/dashboard/websites" },
    { id: "invoices", label: "Invoices",    icon: <FiFileText />,     path: "/dashboard/invoices" },
    { id: "reviews",  label: "My Review",   icon: <FiMessageSquare />,path: "/dashboard/reviews" },
    { id: "account",  label: "Account",     icon: <FiUser />,         path: "/dashboard/account" },
  ];

  return (
    <aside className="w-64 h-full bg-[#08080c]/95 backdrop-blur-2xl border-r border-white/5 flex flex-col shadow-2xl">
      
      {/* BRAND */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img src="/logo-mapmend.png" alt="MapMend" className="h-9 w-auto object-contain" />
          <div>
            <div className="text-sm font-extrabold tracking-tight flex gap-1">
              <span className="text-brandBlue">MapMend</span>
              <span className="text-brandOrange">Solution</span>
            </div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Client Portal</div>
          </div>
        </div>
      </div>

      {/* USER CHIP */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/10">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neonCyan to-neonPurple flex items-center justify-center text-black font-black text-sm shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            {initials}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-bold text-white truncate">{name}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Active Client</div>
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = item.path === "/dashboard"
            ? location.pathname === "/dashboard"
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative group overflow-hidden ${
                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="dash-active-bg"
                  className="absolute inset-0 bg-neonCyan/15 border border-neonCyan/30 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-neonCyan to-neonPurple rounded-xl transition-opacity duration-300" />
              <span className={`text-lg relative z-10 transition-colors ${isActive ? "text-neonCyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "text-gray-500 group-hover:text-neonCyan"}`}>
                {item.icon}
              </span>
              <span className="relative z-10 text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* BACK TO SITE & LOGOUT */}
      <div className="p-3 border-t border-white/5 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
        >
          <FiArrowLeft className="text-lg" />
          <span className="text-sm font-semibold">Back to Website</span>
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
        >
          <FiLogOut className="text-lg" />
          <span className="text-sm font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
