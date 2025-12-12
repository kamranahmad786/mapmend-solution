import React from "react";
import {
  FiGrid,
  FiGlobe,
  FiFileText,
  FiTrendingUp,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

export default function DashboardSidebar() {
  const logout = () => {
    localStorage.removeItem("mapmend_token");
    window.location.href = "/login";
  };

  const menu = [
    { id: "home", label: "Overview", icon: <FiGrid />, path: "/dashboard" },
    { id: "ai", label: "AI Analysis", icon: <FiTrendingUp />, path: "/dashboard/ai" },
    { id: "sites", label: "My Websites", icon: <FiGlobe />, path: "/dashboard/websites" },
    { id: "invoices", label: "Invoices", icon: <FiFileText />, path: "/dashboard/invoices" },
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
        {menu.map((item) => (
          <a
            key={item.id}
            href={item.path}
            className="
              flex items-center gap-4 
              px-4 py-3 
              rounded-lg 
              text-white/90 
              hover:bg-brandOrange/20 
              hover:text-white 
              transition
              font-medium
            "
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
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
