// src/pages/PrivacyPolicy.jsx
import React from "react";
import SEO from "../components/SEO";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 max-w-4xl mx-auto px-6 pb-20">
      <SEO
        title="Privacy Policy"
        description="Learn how MapMend Solution protects your data, privacy, and account information."
        url="https://mapmendsolution.com/privacy-policy"
      />

      <h1 className="text-4xl font-extrabold text-brandBlue mb-6">Privacy Policy</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4 leading-relaxed">
        <p>
          At <strong>MapMend Solution</strong>, your privacy is our priority. We collect only 
          the information necessary to provide high-quality digital services.
        </p>

        <h2 className="text-xl font-bold text-brandBlue">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name, email, and phone number</li>
          <li>Business details provided during audit</li>
          <li>Analytics and performance insights</li>
        </ul>

        <h2 className="text-xl font-bold text-brandBlue">How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To create websites and marketing reports</li>
          <li>To improve Google Maps performance</li>
          <li>For account login and dashboard features</li>
        </ul>

        <p>
          We never sell or misuse your personal information.  
          For any privacy concerns, contact us at:  
          <strong className="text-brandBlue"> infomapmendsolution@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
