import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID LAYOUT – 4 CLEAN COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND COLUMN */}
          <div>
            <h3 className="text-3xl font-extrabold text-brandOrange">
              MapMend Solution
            </h3>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Helping local businesses grow with stunning websites, Google Maps
              optimization, and powerful visibility solutions.
            </p>
          </div>

          {/* LEGAL COLUMN */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-brandOrange uppercase tracking-wide">
              Legal
            </h4>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/refund-policy"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Refund Policy
                </a>
              </li>

              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="/terms-and-conditions"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="/cancellation-policy"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Cancellation Policy
                </a>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS COLUMN */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-brandOrange uppercase tracking-wide">
              Quick Links
            </h4>

            <ul className="space-y-3 text-gray-300 text-sm">
              <li>
                <a
                  href="/#services"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Services
                </a>
              </li>

              <li>
                <a
                  href="/#pricing"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/blog"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="/#contact"
                  className="hover:text-brandOrange transition flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-brandOrange rounded-full"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT COLUMN */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-brandOrange">
              Contact Us
            </h4>

            <div className="space-y-3 text-gray-300">

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-brandOrange" />
                <a
                  href="mailto:infomapmendsolution@gmail.com"
                  className="hover:text-brandOrange transition"
                >
                  infomapmendsolution@gmail.com
                </a>
              </p>

              <p className="flex items-center gap-2">
                <FaWhatsapp className="text-brandOrange" />
                <a
                  href="https://wa.me/917366890727?text=Hello%2C%20I%20want%20a%20free%20website%20%26%20Google%20Maps%20audit."
                  className="hover:text-brandOrange transition"
                >
                  +91 73668 90727
                </a>
              </p>

              <p className="text-gray-400 text-sm mt-3">
                Availability: 9 AM – 11 PM (Fast Reply)
              </p>
            </div>

            <div className="flex gap-4 text-2xl mt-6">
              <a href="#" className="hover:text-brandOrange transition">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-brandOrange transition">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/917366890727"
                className="hover:text-brandOrange transition"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-16 pt-6"></div>

        {/* COPYRIGHT */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} MapMend Solution — Making Local Businesses Visible.
        </div>
      </div>
    </footer>
  );
}
