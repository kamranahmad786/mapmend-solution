import React, { useState, useEffect } from "react";
import { FiTrendingUp, FiGlobe, FiActivity, FiBarChart2 } from "react-icons/fi";
import api from "../utils/api";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    seo: "--",
    speed: "--",
    activeSites: 0,
  });

  useEffect(() => {
    api.get("/api/sites/my")
      .then((res) => {
        setStats((prev) => ({
          ...prev,
          activeSites: res.data.length,
        }));
      })
      .catch(() => {});
  }, []);

  return (
    <div className="animate-fadeIn">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-extrabold text-brandBlue mb-6">
        Dashboard Overview
      </h1>

      {/* STATS CARDS */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {/* SEO SCORE */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow border border-blue-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">SEO Score</div>
              <div className="text-3xl text-brandBlue font-bold mt-1">
                {stats.seo}
              </div>
            </div>
            <FiTrendingUp className="text-4xl text-brandOrange" />
          </div>
        </div>

        {/* PAGE SPEED */}
        <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow border border-orange-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">PageSpeed</div>
              <div className="text-3xl text-brandBlue font-bold mt-1">
                {stats.speed}
              </div>
            </div>
            <FiActivity className="text-4xl text-brandBlue" />
          </div>
        </div>

        {/* ACTIVE SITES */}
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow border border-green-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-500">Active Websites</div>
              <div className="text-3xl text-brandBlue font-bold mt-1">
                {stats.activeSites}
              </div>
            </div>
            <FiGlobe className="text-4xl text-green-500" />
          </div>
        </div>
      </div>

      {/* WEBSITE PERFORMANCE SECTION */}
      <div className="bg-white p-8 rounded-2xl shadow mb-10 border border-gray-100">
        <h2 className="text-xl font-bold text-brandBlue mb-2 flex items-center gap-2">
          <FiBarChart2 className="text-brandOrange" /> Website Performance
        </h2>
        <p className="text-gray-600 mb-6">
          Track performance metrics of your connected websites. Detailed charts coming soon.
        </p>

        {/* Placeholder performance graph */}
        <div className="bg-gray-100 h-48 rounded-xl flex items-center justify-center text-gray-500">
          📊 Performance chart loading...
        </div>
      </div>

      {/* SMART INSIGHTS SECTION */}
      <div className="bg-white p-8 rounded-2xl shadow border border-gray-100">
        <h2 className="text-xl font-bold text-brandBlue mb-4 flex items-center gap-2">
          <FiTrendingUp className="text-brandOrange" /> Smart AI Insights
        </h2>

        <ul className="space-y-3 text-gray-700">
          <li>• Improve page titles & meta descriptions for better ranking.</li>
          <li>• Add more customer reviews to improve Google Maps visibility.</li>
          <li>• Optimize page speed to reduce bounce rate.</li>
        </ul>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10 grid sm:grid-cols-3 gap-6">
        <a
          href="/dashboard/ai"
          className="bg-brandBlue text-white text-center py-4 rounded-xl font-semibold shadow hover:bg-brandBlue/90 transition"
        >
          Run AI Analysis →
        </a>

        <a
          href="/dashboard/websites"
          className="bg-white border border-gray-200 text-center py-4 rounded-xl font-semibold shadow hover:shadow-md transition"
        >
          View My Websites →
        </a>

        <a
          href="/dashboard/invoices"
          className="bg-brandOrange text-white text-center py-4 rounded-xl font-semibold shadow hover:bg-brandOrange/90 transition"
        >
          Check Invoices →
        </a>
      </div>

    </div>
  );
}
