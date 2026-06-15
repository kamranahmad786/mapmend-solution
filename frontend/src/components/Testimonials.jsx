import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FiStar } from "react-icons/fi";
import { motion } from "framer-motion";

const FALLBACK_TESTIMONIALS = [
  {
    name: "Gabrielle Williams",
    review: "Creative geniuses who listen, understand, and craft captivating visuals an agency that truly understands our needs.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "Samantha Johnson",
    review: "Exceeded our expectations with innovative designs that brought our vision to life a truly remarkable creative agency.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "Isabella Rodriguez",
    review: "Their ability to capture our brand essence in every project is unparalleled an invaluable creative collaborator.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "John Peter",
    review: "Their team's artistic flair and strategic approach resulted in remarkable campaigns a reliable creative partner.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "Natalie Martinez",
    review: "From concept to execution, their creativity knows no bounds a game changer for our brand's success.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "Victoria Thompson",
    review: "A refreshing and imaginative agency that consistently delivers exceptional results highly recommended for any project.",
    role: "CEO and co founder of ABC Company",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    review: "MapMend delivered a high performance digital asset for my enterprise. The architectural precision and SEO results are unmatched.",
    role: "Founder, Verma Digital",
    rating: 5,
  },
  {
    name: "Amit Traders",
    review: "Their Google Maps optimization protocols boosted our organic leads exponentially. A critical partner for any business in this era.",
    role: "Operations Head",
    rating: 5,
  }
];

export default function Testimonials() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api
      .get(`/api/testimonials`)
      .then((res) => {
        // If API returns fewer than 6, merge with fallbacks to ensure marquee looks full
        const apiData = res.data || [];
        if (apiData.length < 6) {
          setList([...apiData, ...FALLBACK_TESTIMONIALS].slice(0, 8));
        } else {
          setList(apiData);
        }
      })
      .catch(() => {
        setList(FALLBACK_TESTIMONIALS);
      });
  }, []);

  // Split list into two rows for the marquee effect
  const row1 = list.slice(0, Math.ceil(list.length / 2));
  const row2 = list.slice(Math.ceil(list.length / 2));

  // Duplicating the rows to create the infinite scroll illusion
  const marqueeRow1 = [...row1, ...row1, ...row1];
  const marqueeRow2 = [...row2, ...row2, ...row2];

  if (list.length === 0) return null;

  return (
    <section id="testimonials" className="py-32 bg-lightBg dark:bg-darkBg relative overflow-hidden flex flex-col items-center">

      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 w-full text-center relative z-10 flex flex-col items-center">

        {/* The "1 Lakh users" Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 bg-black dark:bg-[#111] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-2xl mb-12 border border-white/10 dark:border-white/5"
        >
          <div className="bg-brandBlue rounded-full p-1.5 flex items-center justify-center">
            <FiStar className="w-3.5 h-3.5 text-white fill-current" />
          </div>
          Rated 4.9/5 by over 50+ businesses
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Words of praise from others about our presence.
          </h2>
        </motion.div>
      </div>

      {/* ─── Infinite Marquee Area ────────────────────────────────────────── */}
      <div className="w-full max-w-[100vw] relative z-10">

        {/* Edge Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-lightBg dark:from-darkBg to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-lightBg dark:from-darkBg to-transparent z-20 pointer-events-none" />

        <div className="flex flex-col gap-6 w-full">

          {/* Row 1 Scrolling Left */}
          <div className="flex overflow-hidden w-full">
            <div className="flex animate-marquee gap-6 w-max whitespace-nowrap pl-6">
              {marqueeRow1.map((item, idx) => (
                <TestimonialCard key={`row1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2 Scrolling Left (Slightly slower or offset for organic feel) */}
          <div className="flex overflow-hidden w-full">
            <div className="flex animate-marquee gap-6 w-max whitespace-nowrap pl-6 [animation-duration:50s]">
              {marqueeRow2.map((item, idx) => (
                <TestimonialCard key={`row2-${idx}`} item={item} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Individual Card Component ───────────────────────────────────────────
function TestimonialCard({ item }) {
  // Generate a realistic avatar using UI Avatars
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random&color=fff&size=128`;

  return (
    <div className="w-[380px] h-[320px] bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 flex flex-col justify-between shrink-0 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

      <div>
        {/* Quote Icon (using pure CSS for exact look) */}
        <div className="text-6xl text-brandBlue font-serif leading-[0] tracking-tighter mb-8 mt-6 select-none opacity-80">
          “
        </div>

        {/* Review Text */}
        <p className="text-slate-700 dark:text-gray-300 text-[15px] leading-relaxed font-medium whitespace-normal line-clamp-4">
          {item.review}
        </p>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-6">
        <img
          src={avatarUrl}
          alt={item.name}
          className="w-12 h-12 rounded-full border-2 border-white dark:border-white/10 shadow-sm object-cover"
          loading="lazy"
        />
        <div className="flex flex-col">
          <span className="text-slate-900 dark:text-white font-bold text-[15px]">
            {item.name}
          </span>
          <span className="text-slate-500 dark:text-gray-500 text-xs font-medium mt-0.5 whitespace-normal line-clamp-1">
            {item.role || "Verified Client"}
          </span>
        </div>
      </div>

    </div>
  );
}
