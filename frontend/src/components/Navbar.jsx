import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const location = useLocation();

  // Detect login status
  const isLoggedIn = !!localStorage.getItem("mapmend_token");
  const userRole = localStorage.getItem("mapmend_role") || "user";
  const dashboardUrl = userRole === "admin" ? "/admin" : "/dashboard";

  // Scroll Spy
  useEffect(() => {
    const sections = ["hero", "services", "testimonials", "contact"];
    const handleScroll = () => {
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

  // Auto Hide Navbar
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleHide = () => {
      const current = window.scrollY;

      // Prevent hiding inside dashboard area
      if (location.pathname.startsWith("/dashboard")) {
        setHidden(false);
        return;
      }

      setHidden(current > lastScroll && current > 100);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleHide);
    return () => window.removeEventListener("scroll", handleHide);
  }, [location.pathname]);

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

  const handleLogout = () => {
    localStorage.removeItem("mapmend_token");
    localStorage.removeItem("mapmend_role");
    window.location.href = "/";
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${hidden ? "-translate-y-full" : "translate-y-0"} 
        glass-nav`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <img
              src="/logo-mapmend.png"
              alt="MapMend Solution Logo"
              className="h-12 w-auto object-contain drop-shadow-md"
            />
            <div className="leading-tight">
              <h1 className="text-xl font-bold text-white tracking-tight text-glow">
                MapMend Solution
              </h1>
              <p className="text-xs text-neonCyan">Elevate Your Business Online</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">

            {/* Hide scroll links in dashboard */}
            {!location.pathname.startsWith("/dashboard") && (
              <>
                {["services", "testimonials", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => goToSection(sec)}
                    className={`relative text-sm font-medium transition ${
                      active === sec ? "text-neonCyan text-glow" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    {active === sec && (
                      <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-neonCyan rounded-full shadow-[0_0_8px_#06b6d4]"></span>
                    )}
                  </button>
                ))}
              </>
            )}

            {/* BLOG */}
            <a
              href="/blog"
              className={`relative text-sm font-medium transition ${
                location.pathname.startsWith("/blog")
                  ? "text-neonCyan text-glow"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Blog
            </a>

            {/* AUTH BUTTONS */}
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-brandOrange text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(242,97,34,0.5)] hover:bg-brandOrange/90 transition hover-glow"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <a
                  href={dashboardUrl}
                  className="text-sm font-semibold text-neonCyan hover:text-white transition"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            )}

            {/* WHATSAPP CTA */}
            <a
              href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
              target="_blank"
              className="bg-neonBlue text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:bg-blue-500 transition hover-glow"
            >
              Get Free Quote
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-3xl text-white" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* MOBILE MENU */}
      <aside
        className={`fixed top-0 right-0 w-[75%] h-full bg-[#0a0a0f] border-l border-white/10 shadow-2xl z-50 
        transform transition-all duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-white transition"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        <div className="pt-24 px-6 flex flex-col gap-8">

          {/* Scroll links only on home page */}
          {!location.pathname.startsWith("/dashboard") && (
            <nav className="flex flex-col gap-6">
              {["services", "testimonials", "contact"].map((sec) => (
                <button
                  key={sec}
                  onClick={() => goToSection(sec)}
                  className="text-lg font-semibold text-gray-700 hover:text-brandBlue transition text-left"
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </button>
              ))}

              <a
                href="/blog"
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-gray-700 hover:text-brandBlue transition text-left"
              >
                Blog
              </a>
            </nav>
          )}

          {/* AUTH MOBILE */}
          {!isLoggedIn ? (
            <>
              <a href="/login" className="text-lg font-semibold hover:text-brandBlue">
                Login
              </a>

              <a
                href="/register"
                className="w-full bg-brandOrange text-white text-center py-3 rounded-lg text-lg font-semibold shadow hover:bg-brandOrange/90"
              >
                Register
              </a>
            </>
          ) : (
            <>
              <a href={dashboardUrl} className="text-lg font-semibold text-brandBlue">
                Dashboard
              </a>

              <button
                onClick={handleLogout}
                className="w-full text-left text-lg font-semibold text-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* WHATSAPP CTA */}
          <a
            href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
            target="_blank"
            className="w-full bg-brandBlue text-white text-center py-3 rounded-lg text-lg font-semibold shadow hover:bg-brandBlue/90"
          >
            Get Free Quote
          </a>
        </div>
      </aside>
    </>
  );
}
