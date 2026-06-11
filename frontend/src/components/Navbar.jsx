import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTimes, FaBars, FaSun, FaMoon } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  
  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem("mapmend_token");
  const userRole = localStorage.getItem("mapmend_role") || "user";
  const dashboardUrl = userRole === "admin" ? "/admin" : "/dashboard";

  // Scroll logic for transparency & section spying
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ["hero", "services", "testimonials", "contact"];
      let current = "hero";
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = sec;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Sync logic
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const goToSection = (section) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${section}`;
    } else {
      document.getElementById(section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("mapmend_token");
    localStorage.removeItem("mapmend_role");
    localStorage.removeItem("mapmend_user_name");
    localStorage.removeItem("mapmend_user_email");
    window.location.href = "/";
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 glass-nav" : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => (window.location.href = "/")}
          >
            <div className="bg-slate-200 dark:bg-white/5 p-2 rounded-xl border border-slate-300 dark:border-white/10 group-hover:border-brandOrange/30 transition-colors">
              <img src="/logo-mapmend.png" alt="MapMend" className="h-8 w-auto object-contain" />
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="text-xl font-black tracking-tight flex gap-1.5">
                <span className="text-brandBlue">MapMend</span>
                <span className="text-brandOrange font-extrabold">Solution</span>
              </h1>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            {!location.pathname.startsWith("/dashboard") && (
              <div className="flex items-center gap-8">
                {["services", "pricing", "testimonials", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => goToSection(sec)}
                    className={`text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                      active === sec ? "text-brandOrange" : "text-slate-600 hover:text-brandOrange dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
                
                {/* BLOG LINK RESTORED */}
                <Link 
                  to="/blog"
                  className={`text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                    location.pathname.startsWith("/blog") ? "text-brandOrange" : "text-slate-600 hover:text-brandOrange dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  Blog
                </Link>
              </div>
            )}
            
            <div className="h-4 w-px bg-slate-300 dark:bg-white/10"></div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle Button (Desktop Right Side) */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-brandOrange dark:text-slate-400 dark:hover:text-yellow-400 transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
              </button>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-brandOrange dark:text-slate-300 dark:hover:text-white transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary py-1.5 px-4 text-xs font-black">
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-6">
                  <Link to={dashboardUrl} className="text-sm font-bold text-brandOrange hover:text-white transition-colors">
                    Portal Access
                  </Link>
                  <button onClick={logout} className="text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors">
                    Sign Out
                  </button>
                </div>
              )}
              
              <a 
                href="https://wa.me/917366890727"
                target="_blank"
                className="flex items-center gap-2 text-xs font-black bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-lg text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-all uppercase tracking-widest shadow-sm dark:shadow-xl"
              >
                Free Audit <FiArrowRight className="text-brandOrange" />
              </a>
            </div>
          </div>

          {/* Mobile Right Side: Toggle + Menu Trigger */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-brandOrange dark:text-slate-400 dark:hover:text-yellow-400 transition-colors"
            >
              {theme === "dark" ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
            <button className="text-2xl text-slate-800 dark:text-white outline-none" onClick={() => setOpen(true)}>
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-darkBg/60 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      >
        <aside 
          className={`absolute top-0 right-0 w-[85%] sm:w-[400px] h-full bg-brandNavy border-l border-white/5 p-10 flex flex-col transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-xl font-black text-white">Menu</h2>
            <button onClick={() => setOpen(false)} className="text-2xl text-slate-400 hover:text-white">
              <FaTimes />
            </button>
          </div>

          <nav className="flex flex-col gap-8 flex-1">
            {!location.pathname.startsWith("/dashboard") && (
              <>
                {["services", "pricing", "testimonials", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => goToSection(sec)}
                    className="text-2xl font-black text-white text-left hover:text-brandOrange transition-colors uppercase tracking-tight"
                  >
                    {sec}
                  </button>
                ))}
                <Link
                  to="/blog"
                  onClick={() => setOpen(false)}
                  className="text-2xl font-black text-white text-left hover:text-brandOrange transition-colors uppercase tracking-tight"
                >
                  Blog
                </Link>
              </>
            )}
            <div className="h-px w-full bg-white/5 my-4"></div>
            
            {!isLoggedIn ? (
              <div className="flex flex-col gap-6">
                <Link to="/login" onClick={() => setOpen(false)} className="text-xl font-bold text-slate-300">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-center">Register Now</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <Link to={dashboardUrl} onClick={() => setOpen(false)} className="text-xl font-bold text-brandOrange">Dashboard</Link>
                <button onClick={logout} className="text-xl font-bold text-rose-500 text-left">Logout</button>
              </div>
            )}
          </nav>

          <a 
            href="https://wa.me/917366890727"
            target="_blank"
            className="mt-auto w-full py-5 glass-card rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-sm hover:border-brandOrange/30 transition-all shadow-2xl"
          >
            Direct Support <FiArrowRight className="text-brandOrange" />
          </a>
        </aside>
      </div>
    </>
  );
}
