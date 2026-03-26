import React from "react";

export default function DashboardLoader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-20 animate-fadeIn">

      {/* Animated Rings */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-brandBlue border-t-transparent rounded-full animate-spinSlow"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brandOrange border-b-transparent rounded-full animate-spinReverse"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-brandBlue font-semibold text-lg">
        Loading your dashboard...
      </p>

      <p className="text-gray-500 text-sm mt-1">
        Fetching analytics & business insights
      </p>
    </div>
  );
}
