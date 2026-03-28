import React from "react";
import {
  FiGrid,
  FiGlobe,
  FiFileText,
  FiTrendingUp,
  FiUser,
  FiLogOut,
  FiMessageSquare,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function DashboardSidebar() {
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem("mapmend_token");
    window.location.href = "/login";
  };

  const menu = [
    { id: "home", label: "Overview", icon: <FiGrid />, path: "/dashboard" },
    { id: "ai", label: "AI Analysis", icon: <FiTrendingUp />, path: "/dashboard/ai" },
    { id: "sites", label: "My Websites", icon: <FiGlobe />, path: "/dashboard/websites" },
    { id: "invoices", label: "Invoices", icon: <FiFileText />, path: "/dashboard/invoices" },
    { id: "reviews", label: "Reviews", icon: <FiMessageSquare />, path: "/dashboard/reviews" },
    { id: "account", label: "Account", icon: <FiUser />, path: "/dashboard/account" },
  ];

  return (
    <aside
      className="
    fixed 
    top-[80px] 
    left-0 
    h-[calc(100vh-80px)] 
    w-64 
    bg-brandBlue 
    text-white 
    flex flex-col 
    shadow-xl 
    z-50
  "
    >
      {/* LOGO */}
      <div className="px-6 py-4">
        <img
          src="/logo-mapmend.png"
          alt="MapMend Logo"
          className="h-12 w-auto object-contain drop-shadow"
        />
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-1 px-4 mt-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`
                flex items-center gap-4 
                px-4 py-3 
                rounded-lg 
                transition
                font-medium
                ${isActive 
                  ? "bg-brandOrange text-white shadow-lg shadow-orange-950/20" 
                  : "text-white/90 hover:bg-brandOrange/20 hover:text-white"
                }
              `}
            >
              <span className={`text-lg ${isActive ? "animate-pulse" : ""}`}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* SPACER */}
      <div className="flex-1"></div>

      {/* LOGOUT */}
      <button
        onClick={logout}
        className="
          flex items-center gap-4 px-4 py-3 
          text-red-200 hover:bg-red-500/20 
          rounded-lg w-full transition 
          font-medium
        "
      >
        <FiLogOut className="text-lg" />
        Logout
      </button>
    </aside>
  );
}
