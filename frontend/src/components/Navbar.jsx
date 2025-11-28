import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("hero");
  const location = useLocation();

  // Scroll spy
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

  // Auto hide navbar
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleHide = () => {
      const current = window.scrollY;
      setHidden(current > lastScroll && current > 100);
      lastScroll = current;
    };
    window.addEventListener("scroll", handleHide);
    return () => window.removeEventListener("scroll", handleHide);
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

  return (
    <>
      {/* TOP NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${hidden ? "-translate-y-full" : "translate-y-0"} 
        bg-white/60 backdrop-blur-lg shadow`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
      
{/* LOGO */}
<div
  className="flex items-center gap-1 cursor-pointer"
  onClick={() => goToSection("hero")}
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

            <a
              href="/blog"
              className={`relative text-sm font-medium transition ${
                location.pathname.startsWith("/blog")
                  ? "text-brandBlue"
                  : "text-gray-700 hover:text-brandBlue"
              }`}
            >
              Blog
              {location.pathname.startsWith("/blog") && (
                <span className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-brandOrange rounded-full"></span>
              )}
            </a>

            <a
              href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
              target="_blank"
              className="bg-brandBlue text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow hover:bg-brandBlue/90 transition"
            >
              Get Free Quote
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="md:hidden text-3xl text-brandBlue" onClick={() => setOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* BACKGROUND BLUR OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* MOBILE SLIDE-IN MENU */}
      <aside
        className={`fixed top-0 right-0 w-[75%] h-full bg-white shadow-xl z-50 
        transform transition-all duration-300 
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* CLOSE BUTTON */}
        <button
          className="absolute top-5 right-5 text-2xl text-gray-700 hover:text-brandBlue transition"
          onClick={() => setOpen(false)}
        >
          <FaTimes />
        </button>

        {/* MENU CONTENT */}
        <div className="pt-24 px-6 flex flex-col gap-8">

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

          <a
            href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
            target="_blank"
            className="w-full bg-brandBlue text-white text-center py-3 rounded-lg text-lg font-semibold shadow hover:bg-brandBlue/90 transition"
          >
            Get Free Quote
          </a>
        </div>
      </aside>
    </>
  );
}
