import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUsers, FiMail, FiCreditCard, FiGlobe, FiMessageSquare, FiLogOut, FiPieChart } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const loc = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/admin", icon: <FiPieChart />, label: "Overview", exact: true },
    { to: "/admin/users", icon: <FiUsers />, label: "Users" },
    { to: "/admin/leads", icon: <FiMail />, label: "Lead Inbox" },
    { to: "/admin/payments", icon: <FiCreditCard />, label: "Payments" },
    { to: "/admin/sites", icon: <FiGlobe />, label: "Site Audits" },
    { to: "/admin/testimonials", icon: <FiMessageSquare />, label: "Testimonials" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("mapmend_token");
    localStorage.removeItem("mapmend_role");
    navigate("/admin/login");
  };

  return (
    <div className="w-64 h-full glass-card border-r border-white/5 flex flex-col pt-0 bg-[#08080c]/80 backdrop-blur-2xl">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-xl font-extrabold text-white tracking-tight">Admin <span className="text-gradient">Center</span></h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const isActive = link.exact
            ? loc.pathname === link.to
            : loc.pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden ${
                isActive ? "text-white font-bold" : "text-gray-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="admin-active-bg"
                  className="absolute inset-0 bg-neonCyan/20 border border-neonCyan/30 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-neonCyan to-neonPurple transition-opacity duration-300"></div>

              <span className={`text-lg relative z-10 ${isActive ? "text-neonCyan drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "text-gray-500 group-hover:text-neonCyan transition-colors"}`}>
                {link.icon}
              </span>
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-400 hover:text-neonPink hover:bg-neonPink/10 transition-colors border border-transparent hover:border-neonPink/20"
        >
          <FiLogOut className="text-lg" />
          <span className="font-semibold">Logout System</span>
        </button>
      </div>
    </div>
  );
}
