import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="flex bg-gray-50">
      {/* FIXED TOP NAVBAR */}
      <Navbar />
      
      {/* FIXED SIDEBAR (ALIGN UNDER NAVBAR HEIGHT) */}
      <DashboardSidebar />

      {/* SCROLLABLE CONTENT */}
      <main
        className="
          ml-64 
          mt-[80px] 
          p-8 
          w-full
          min-h-[calc(100vh-80px)]
          overflow-y-auto
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
