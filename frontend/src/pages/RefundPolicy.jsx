// src/pages/RefundPolicy.jsx
import React from "react";
import SEO from "../components/SEO";

export default function RefundPolicy() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 pb-20">
      <SEO 
        title="Refund Policy"
        description="Refund policy for MapMend Solution — transparency, fair refund rules, and customer-first practices."
        url="https://mapmendsolution.com/refund-policy"
      />

      <h1 className="text-4xl font-extrabold text-brandBlue mb-6">Refund Policy</h1>

      <div className="bg-white p-6 rounded-2xl shadow leading-relaxed space-y-4">
        <p>
          At <strong>MapMend Solution</strong>, we aim to deliver high-quality digital services 
          including website development, Google Maps optimization, and business audits.
        </p>

        <h2 className="text-xl font-bold text-brandBlue">Refund Eligibility</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Refunds are eligible within 7 days of purchase **only if work has not started**.</li>
          <li>If initial drafts or work has been delivered, partial refund may apply.</li>
          <li>No refunds for completed projects or delivered websites.</li>
        </ul>

        <h2 className="text-xl font-bold text-brandBlue">Non-Refundable Services</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Google Maps optimization already initiated</li>
          <li>Website drafts delivered</li>
          <li>SEO audit reports generated</li>
        </ul>

        <p>
          To request a refund, email us at:  
          <strong className="text-brandBlue"> infomapmendsolution@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
