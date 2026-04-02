import React from "react";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiPhone,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkBg text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-brandBlue/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white/5 p-2 rounded-xl border border-white/10">
                <img src="/logo-mapmend.png" alt="MapMend" className="h-8 w-auto" />
              </div>
              <h3 className="text-xl font-black tracking-tight flex gap-1.5">
                <span className="text-brandBlue">MapMend</span>
                <span className="text-brandOrange">Solution</span>
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Architecting high-performance digital infrastructure and strategic local SEO visibility for elite businesses.
            </p>
            <div className="flex gap-4">
              {[FiFacebook, FiInstagram, FaWhatsapp].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brandOrange hover:border-brandOrange/30 transition-all">
                  <Icon className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Infrastructure (Legal) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brandOrange mb-8">Infrastructure</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", href: "/about-us" },
                { name: "Refund Policy", href: "/refund-policy" },
                { name: "Privacy Protocol", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-and-conditions" },
                { name: "Cancellation", href: "/cancellation-policy" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    {link.name} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-brandOrange" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem (Quick Links) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brandBlue mb-8">Ecosystem</h4>
            <ul className="space-y-4">
              {[
                { name: "Core Services", href: "/#services" },
                { name: "Growth Pricing", href: "/#pricing" },
                { name: "Intelligence Blog", href: "/blog" },
                { name: "Contact Node", href: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    {link.name} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity text-brandBlue" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operations (Contact) */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-brandBlue mb-8">Operations</h4>
            <div className="space-y-6">
              <a href="mailto:infomapmendsolution@gmail.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-brandOrange transition-colors">
                  <FiMail />
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Email Control</div>
                   <div className="text-sm font-bold text-white group-hover:text-brandOrange transition-colors">infomapmendsolution@gmail.com</div>
                </div>
              </a>
              
              <a href="https://wa.me/917366890727" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-brandOrange transition-colors">
                  <FiPhone />
                </div>
                <div>
                   <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Support</div>
                   <div className="text-sm font-bold text-white group-hover:text-brandOrange transition-colors">+91 73668 90727</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            © {currentYear} MapMend Solution · Registered in Jharkhand, India
          </div>
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
             <span>v2.0.4 Deployment</span>
             <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Systems Operational
             </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
