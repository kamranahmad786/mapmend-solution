import React from "react";
import { FaSearch, FaTools, FaPhoneAlt } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h3 className="text-4xl font-extrabold text-brandBlue leading-tight mb-4">
            Is Your Business Losing Customers Online?
          </h3>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            7 out of 10 local businesses don’t show up properly on Google Maps or have outdated websites.
            This makes customers trust your competitors instead of you.  
            <span className="font-semibold text-brandBlue">
              MapMend Solution fixes these issues so your business gets more visibility, calls, and customers.
            </span>
          </p>

          {/* 3 ICON SECTIONS */}
          <div className="space-y-6">

            <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow border">
              <div className="w-12 h-12 rounded-xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaSearch />
              </div>
              <div>
                <div className="text-lg font-semibold">We Identify the Problems</div>
                <div className="text-gray-600 text-sm">
                  Your Maps listing, website, photos, categories — everything is checked in our audit.
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow border">
              <div className="w-12 h-12 rounded-xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaTools />
              </div>
              <div>
                <div className="text-lg font-semibold">We Fix Everything Professionally</div>
                <div className="text-gray-600 text-sm">
                  Website, Google Maps, SEO, images — all optimized in <strong>1–3 days</strong>.
                </div>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow border">
              <div className="w-12 h-12 rounded-xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaPhoneAlt />
              </div>
              <div>
                <div className="text-lg font-semibold">You Get More Calls & Customers</div>
                <div className="text-gray-600 text-sm">
                  A fixed online presence boosts trust — leading to more enquiries and more sales.
                </div>
              </div>
            </div>

          </div>

          {/* CTA BUTTON */}
          {/* <a
            href="#contact"
            className="inline-block mt-8 bg-brandBlue text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:scale-105 transition"
          >
            Get Your Free Audit Report
          </a> */}

        </div>

        {/* RIGHT VISUAL (MODERN ILLUSTRATION CARD) */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-gray-100">

            <img
              src="/about-mapmend.png"
              alt="Map & Website Illustration"
              className="w-49 mx-auto mb-6 drop-shadow-xl rounded-2xl"
            />

            <h4 className="text-xl font-bold text-brandBlue mb-3 text-center">
              Your Online Presence, Fixed.
            </h4>

            <p className="text-gray-600 text-center text-sm leading-relaxed mb-4">
              We correct your Google Maps listing, design modern pages, fix contact buttons,
              and make your business discoverable instantly.
            </p>

            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Correct categories, hours & photos</li>
              <li>• Add website, contact buttons & directions</li>
              <li>• Website redesign for loading speed & clarity</li>
            </ul>

            <a
              href="#contact"
              className="block text-center mt-6 bg-brandOrange text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-brandOrange/90 transition"
            >
              Request My Audit Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
