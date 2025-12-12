// src/pages/CancellationPolicy.jsx
import React from "react";
import SEO from "../components/SEO";

export default function CancellationPolicy() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 pb-20">
      <SEO
        title="Cancellation Policy"
        description="Cancellation rules for website development, Google Maps services, and digital marketing packages."
        url="https://mapmendsolution.com/cancellation-policy"
      />

      <h1 className="text-4xl font-extrabold text-brandBlue mb-6">Cancellation Policy</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4 leading-relaxed">
        <p>
          Cancellations must be requested before the project work begins.  
          Once drafts, designs, or Maps optimization is started, cancellation may not be possible.
        </p>

        <h2 className="text-xl font-bold text-brandBlue">Cancellation Window</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Cancellations allowed within 24 hours of payment.</li>
          <li>No cancellations once website or audit work is delivered.</li>
        </ul>

        <p>
          For cancellation requests, email  
          <strong className="text-brandBlue"> infomapmendsolution@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
