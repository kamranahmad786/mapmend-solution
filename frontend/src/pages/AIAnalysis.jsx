import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { FiCpu, FiCheckCircle, FiLoader } from "react-icons/fi";

export default function AIAnalysis() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/ai/analyze")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-extrabold text-brandBlue mb-6 flex items-center gap-2">
        <FiCpu className="text-brandOrange" /> AI Analysis
      </h1>

      {/* AI SUMMARY CARD */}
      <div className="bg-gradient-to-br from-brandBlue/10 to-white p-8 rounded-2xl shadow-lg border border-brandBlue/10 mb-8">
        <h2 className="text-2xl font-bold text-brandBlue mb-4">AI Summary</h2>

        {loading ? (
          <div className="animate-pulse h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        ) : (
          <p className="text-gray-700 leading-relaxed text-lg">
            {data?.summary || "No summary available"}
          </p>
        )}
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-brandBlue mb-6">AI Recommendations</h2>

        {loading ? (
          <div className="space-y-3">
            <div className="animate-pulse h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ) : data?.recommendations?.length > 0 ? (
          <ul className="space-y-4">
            {data.recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <FiCheckCircle className="text-brandOrange mt-1 text-xl" />
                <span className="text-gray-700 text-lg leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recommendations available.</p>
        )}
      </div>
    </div>
  );
}
