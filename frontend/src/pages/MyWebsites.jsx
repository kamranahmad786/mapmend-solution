import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiGlobe, FiExternalLink, FiAlertCircle } from "react-icons/fi";

export default function MyWebsites() {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    api.get("/api/sites/my")
      .then((res) => setSites(res.data || []))
      .catch(() => setSites([]));
  }, []);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-brandBlue mb-6">
        My Websites
      </h1>

      {/* Empty State */}
      {sites.length === 0 && (
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 text-center flex flex-col items-center">
          <div className="w-16 h-16 flex items-center justify-center bg-brandBlue/10 rounded-full">
            <FiAlertCircle className="text-3xl text-brandBlue" />
          </div>

          <h3 className="text-xl font-semibold text-brandBlue mt-4">
            No Websites Added Yet
          </h3>

          <p className="text-gray-600 mt-2 max-w-md">
            Once you purchase a plan or submit your website details, all your projects
            will appear here with analytics and tools.
          </p>

          <a
            href="/#pricing"
            className="mt-6 bg-brandOrange text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-brandOrange/90 transition"
          >
            Explore Pricing Plans
          </a>
        </div>
      )}

      {/* Websites List */}
      {sites.length > 0 && (
        <div className="space-y-5">
          {sites.map((s) => (
            <div
              key={s._id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex justify-between items-center hover:shadow-xl transition"
            >
              {/* LEFT: Info */}
              <div className="flex items-center gap-4">
                <div className="bg-brandBlue/10 p-3 rounded-xl">
                  <FiGlobe className="text-2xl text-brandBlue" />
                </div>

                <div>
                  <div className="text-lg font-bold text-brandBlue">
                    {s.domain || "Unnamed Website"}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {s.name || "No site title"}
                  </div>

                  {/* Status */}
                  <div className="mt-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full 
                      ${
                        s.status === "active"
                          ? "bg-green-100 text-green-700"
                          : s.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.status ? s.status.toUpperCase() : "PENDING"}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: Action Button */}
              <a
                href={`/site/${s._id}`}
                className="flex items-center gap-2 bg-brandBlue text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-brandBlue/90 transition"
              >
                Open <FiExternalLink />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
