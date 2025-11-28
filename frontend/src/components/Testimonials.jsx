import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

export default function Testimonials() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/testimonials`)
      .then((res) => setList(res.data))
      .catch(() => {
        // Fallback Testimonials
        setList([
          {
            name: "Rahul Verma",
            review: "MapMend created a beautiful website for my shop. Highly satisfied!",
            rating: 5,
          },
          {
            name: "Sneha Enterprises",
            review: "Very professional and fast work. Website delivered in just 2 days!",
            rating: 5,
          },
          {
            name: "Amit Traders",
            review: "Google Maps optimization boosted our daily customer calls.",
            rating: 5,
          },
        ]);
      });
  }, []);

  // Auto-generate avatar (initials)
  const getAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=ff7a00&color=fff&bold=true&size=120`;

  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center py-24 bg-gradient-to-b from-gray-50 to-white relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dots.png')] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-brandBlue mb-4">
          Trusted by Businesses Across India
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg">
          See how businesses improved their visibility, trust and customer calls after working with MapMend Solution.
        </p>

        {/* Testimonials Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {list.map((t, i) => (
            <div
              key={i}
              className="relative bg-white p-8 rounded-3xl border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.08)]
                         hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className="flex justify-start mb-5">
                <img
                  src={getAvatar(t.name)}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-brandOrange shadow"
                />
              </div>

              {/* Stars */}
              <div className="flex gap-1 text-brandOrange mb-3">
                {[...Array(t.rating || 5)].map((_, idx) => (
                  <FaStar key={idx} />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 leading-relaxed text-[16px] mb-5">
                “{t.review}”
              </p>

              {/* Name */}
              <div className="font-bold text-brandBlue text-lg">{t.name}</div>

              {/* Decorative Orange Highlight */}
              <div className="absolute left-6 bottom-6 w-16 h-1 bg-brandOrange rounded-full opacity-60 group-hover:w-24 transition-all"></div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="https://wa.me/917366890727?text=Hello,%20I%20want%20to%20grow%20my%20business%20online.%20Please%20help%20me."
            target="_blank"
            className="inline-block bg-brandBlue hover:bg-brandBlue/90 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow transition"
          >
            Join Our Happy Clients →
          </a>
        </div>

      </div>
    </section>
  );
}
