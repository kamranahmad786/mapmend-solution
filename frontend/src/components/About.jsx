import React from "react";
import { FaSearch, FaTools, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <section id="about" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6">

          {/* Section Label */}
          <span className="inline-block bg-brandOrange/10 text-brandOrange px-4 py-1 rounded-full font-semibold text-sm shadow">
            ABOUT MAPMEND SOLUTION
          </span>

          <h3 className="text-4xl md:text-5xl font-extrabold text-brandBlue leading-tight">
            Fix Your Online Presence & Grow Your Business Effortlessly
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            Most local businesses lose customers simply because their
            <strong className="text-brandBlue"> Google Maps listing is incorrect </strong>  
            or their website looks outdated.  
            <br /><br />
            <span className="font-semibold text-brandBlue">
              MapMend Solution solves this instantly
            </span>{" "}
            by fixing your online presence, improving visibility, and helping
            customers trust your business.
          </p>

          {/* FEATURE LIST */}
          <div className="space-y-5">

            {/* Feature 1 */}
            <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-2xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaSearch />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Deep Audit & Problem Detection</h4>
                <p className="text-gray-600 text-sm">
                  We review Maps, website, categories, contact info, images & more — nothing gets missed.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-2xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaTools />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Complete Professional Fix</h4>
                <p className="text-gray-600 text-sm">
                  We update your Maps profile, optimize SEO, refresh design & boost online trust — all within 1–3 days.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex gap-4 items-start bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition">
              <div className="w-12 h-12 rounded-2xl bg-brandOrange text-white flex items-center justify-center text-lg shadow">
                <FaPhoneAlt />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Increase Calls & Real Customers</h4>
                <p className="text-gray-600 text-sm">
                  A strong digital presence instantly increases calls, enquiries & store visits.
                </p>
              </div>
            </div>

          </div>

          {/* CTA BUTTON */}
          {/* <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-6 bg-brandBlue text-white px-8 py-3 rounded-xl text-lg font-semibold shadow hover:bg-brandBlue/90 transition"
          >
            Get My Free Audit <FaCheckCircle />
          </a> */}
        </div>

        {/* RIGHT — PREMIUM ILLUSTRATION CARD */}
        <div className="flex justify-center">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-gray-200 hover:shadow-2xl transition">

            <img
              src="/about-mapmend.png"
              alt="Map & Website Illustration"
              className="w-60 mx-auto mb-6 drop-shadow-xl rounded-2xl"
            />

            <h4 className="text-2xl font-bold text-brandBlue mb-3 text-center">
              We Make Your Business Discoverable
            </h4>

            <p className="text-gray-600 text-center text-base leading-relaxed mb-4">
              Whether customers search on Google Maps or visit your website,
              your business must look professional & trustworthy.
            </p>

            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-brandOrange" /> Accurate Maps categories & photos
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-brandOrange" /> Professional website appearance
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-brandOrange" /> Faster loading & better user experience
              </li>
            </ul>

            <a
              href="#contact"
              className="block text-center mt-6 bg-brandOrange text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-brandOrange/90 transition"
            >
              Request My Audit → 
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
