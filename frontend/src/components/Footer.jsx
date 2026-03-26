import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-neonBlue/10 to-transparent pointer-events-none blur-2xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* GRID LAYOUT – 4 CLEAN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND COLUMN */}
          <div>
            <h3 className="text-3xl font-extrabold text-neonCyan text-glow">
              MapMend Solution
            </h3>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Helping next-gen businesses grow with AI-driven websites, Google Maps
              automation, and powerful visibility solutions.
            </p>
          </div>

          {/* LEGAL COLUMN */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">
              Legal
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-neonPink transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonPink rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/refund-policy"
                  className="hover:text-neonPink transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonPink rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  Refund Policy
                </a>
              </li>

              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-neonPink transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonPink rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms-and-conditions"
                  className="hover:text-neonPink transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonPink rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/cancellation-policy"
                  className="hover:text-neonPink transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonPink rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS COLUMN */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-white uppercase tracking-wide">
              Quick Links
            </h4>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a
                  href="/#services"
                  className="hover:text-neonCyan transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonCyan rounded-full shadow-[0_0_5px_#06b6d4]"></span>
                  Services
                </a>
              </li>

              <li>
                <a
                  href="/#pricing"
                  className="hover:text-neonCyan transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonCyan rounded-full shadow-[0_0_5px_#06b6d4]"></span>
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/blog"
                  className="hover:text-neonCyan transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonCyan rounded-full shadow-[0_0_5px_#06b6d4]"></span>
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="/#contact"
                  className="hover:text-neonCyan transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-neonCyan rounded-full shadow-[0_0_5px_#06b6d4]"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-white">
              Contact Us
            </h4>

            <div className="space-y-3 text-gray-400">

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-neonPurple" />
                <a
                  href="mailto:infomapmendsolution@gmail.com"
                  className="hover:text-neonPurple transition"
                >
                  infomapmendsolution@gmail.com
                </a>
              </p>

              <p className="flex items-center gap-2">
                <FaWhatsapp className="text-neonPurple" />
                <a
                  href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
                  className="hover:text-neonPurple transition"
                >
                  +91 73668 90727
                </a>
              </p>

              <p className="text-gray-500 text-sm mt-3 border-l-2 border-neonPurple/50 pl-3">
                Availability: 9 AM – 11 PM <br />(Automated & Human Reply)
              </p>
            </div>

            <div className="flex gap-4 text-2xl mt-6">
              <a href="#" className="text-gray-400 hover:text-neonCyan transition hover:scale-110">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-neonPink transition hover:scale-110">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/917366890727"
                className="text-gray-400 hover:text-neonPurple transition hover:scale-110"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-16 pt-6"></div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-500 text-sm flex flex-col md:flex-row justify-center gap-2">
          <span>© {new Date().getFullYear()} MapMend Solution.</span>
          <span>Architecting Digital Visibility.</span>
        </div>
      </div>
    </footer>
  );
}
