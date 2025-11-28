import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-brandBlue to-brandOrange p-10 rounded-3xl shadow-xl mb-16 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Ready to Fix Your Online Presence?
          </h2>
          <p className="text-white/90 mt-3 text-lg max-w-2xl">
            Get a modern website and optimized Google Maps listing that attracts customers instantly.
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-6 bg-white text-brandBlue px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition"
          >
            Get Free Business Audit <FaArrowRight />
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand Section */}
          <div>
            <h3 className="text-3xl font-extrabold text-brandOrange">MapMend Solution</h3>
            <p className="text-gray-300 mt-4 leading-relaxed">
              Helping local businesses grow with stunning websites,  
              Google Maps optimization, and powerful online visibility solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-brandOrange">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#services" className="hover:text-brandOrange transition">Services</a></li>
              <li><a href="#testimonials" className="hover:text-brandOrange transition">Testimonials</a></li>
              <li><a href="#pricing" className="hover:text-brandOrange transition">Pricing</a></li>
              <li><a href="#faq" className="hover:text-brandOrange transition">FAQ</a></li>
              <li><a href="#contact" className="hover:text-brandOrange transition">Contact</a></li>
              <li><a href="/blog" className="hover:text-brandOrange transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-brandOrange">Contact Us</h4>
            <div className="space-y-3 text-gray-300">

              <p className="flex items-center gap-2">
                <FaEnvelope className="text-brandOrange" />
                <a
                  href="mailto:infomapmendsolution@gmail.com"
                  className="hover:text-brandOrange transition"
                >
                  info@mapmendsolution.com
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
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4 text-brandOrange">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-brandOrange transition"><FaFacebook /></a>
              <a href="#" className="hover:text-brandOrange transition"><FaInstagram /></a>
              <a
                href="https://wa.me/917366890727"
                className="hover:text-brandOrange transition"
              >
                <FaWhatsapp />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Stay updated with tips to grow your business online.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-16 pt-6"></div>

        {/* Bottom Copyright */}
        <div className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} MapMend Solution — Making Local Businesses Visible.
        </div>
      </div>
    </footer>
  );
}
