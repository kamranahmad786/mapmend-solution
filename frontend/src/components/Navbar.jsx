import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
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
            <div className="bg-white/5 p-2 rounded-xl border border-white/10 group-hover:border-brandOrange/30 transition-colors">
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
          <div className="hidden lg:flex items-center gap-10">
            {!location.pathname.startsWith("/dashboard") && (
              <div className="flex items-center gap-8">
                {["services", "testimonials", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => goToSection(sec)}
                    className={`text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                      active === sec ? "text-brandOrange" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {sec}
                  </button>
                ))}
                
                {/* BLOG LINK RESTORED */}
                <Link 
                  to="/blog"
                  className={`text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                    location.pathname.startsWith("/blog") ? "text-brandOrange" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Blog
                </Link>
              </div>
            )}
            
            <div className="h-4 w-px bg-white/10 mx-2"></div>

            <div className="flex items-center gap-6">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">
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
                className="flex items-center gap-2 text-xs font-black bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all uppercase tracking-widest shadow-xl"
              >
                Free Audit <FiArrowRight className="text-brandOrange" />
              </a>
            </div>
          </div>

          {/* Mobile Trigger */}
          <button className="lg:hidden text-2xl text-white outline-none" onClick={() => setOpen(true)}>
            <FaBars />
          </button>
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
                {["services", "testimonials", "contact"].map((sec) => (
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
