// src/pages/TermsConditions.jsx
import React from "react";
import SEO from "../components/SEO";

export default function TermsConditions() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 pb-20">
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions for using MapMend Solution services including websites, SEO, Google Maps optimization, and dashboards."
        url="https://mapmendsolution.com/terms-and-conditions"
      />

      <h1 className="text-4xl font-extrabold text-brandBlue mb-6">Terms & Conditions</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4 leading-relaxed">
        <h2 className="text-xl font-bold text-brandBlue">Service Usage</h2>
        <p>
          By using MapMend Solution, you agree to provide accurate information 
          and follow the service guidelines outlined on this website.
        </p>

        <h2 className="text-xl font-bold text-brandBlue">Payments</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All payments are processed securely via Razorpay.</li>
          <li>Work begins only after minimum 50% advance payment.</li>
        </ul>

        <h2 className="text-xl font-bold text-brandBlue">Project Delivery</h2>
        <p>
          Delivery timelines depend on service type. Most websites are completed 
          within 1–3 days unless customization is requested.
        </p>

        <p>
          For support or disputes, contact  
          <strong className="text-brandBlue"> infomapmendsolution@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
