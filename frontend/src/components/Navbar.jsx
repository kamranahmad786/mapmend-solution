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
    window.location.href = "/";
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${hidden ? "-translate-y-full" : "translate-y-0"} 
        bg-white/70 backdrop-blur-xl shadow`}
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
              <h1 className="text-xl font-bold text-brandBlue tracking-tight">
                MapMend Solution
              </h1>
              <p className="text-xs text-gray-500">Elevate Your Business Online</p>
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
                      active === sec ? "text-brandBlue" : "text-gray-700 hover:text-brandBlue"
                    }`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                    {active === sec && (
                      <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-brandOrange rounded-full"></span>
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
                  ? "text-brandBlue"
                  : "text-gray-700 hover:text-brandBlue"
              }`}
            >
              Blog
            </a>

            {/* AUTH BUTTONS */}
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-brandBlue transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-brandOrange text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-brandOrange/90 transition"
                >
                  Register
                </a>
              </>
            ) : (
              <>
                <a
                  href="/dashboard"
                  className="text-sm font-semibold text-brandBlue hover:text-brandOrange transition"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800 transition"
                >
                  Logout
                </button>
              </>
            )}

            {/* WHATSAPP CTA */}
            <a
              href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
              target="_blank"
              className="bg-brandBlue text-white px-5 py-2 rounded-lg text-sm font-semibold shadow hover:bg-brandBlue/90 transition"
            >
              Get Free Quote
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden text-3xl text-brandBlue" onClick={() => setOpen(true)}>
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
        className={`fixed top-0 right-0 w-[75%] h-full bg-white shadow-xl z-50 
        transform transition-all duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-brandBlue transition"
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
              <a href="/dashboard" className="text-lg font-semibold text-brandBlue">
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
