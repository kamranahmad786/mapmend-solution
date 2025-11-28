// src/components/CityLanding.jsx
import React from "react";
import SEO from "./SEO";

export default function CityLanding({ city = "Udaipur" }) {
  const title = `${city} Website Designer | Google Maps Optimization ${city}`;
  const desc = `Affordable website design and Google Maps optimization for businesses in ${city}. Get a website starting at ₹1,999 and boost local visibility.`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MapMend Solution",
    "url": `${import.meta.env.VITE_SITE_URL || ""}/${city.toLowerCase()}`,
    "address": { "@type": "PostalAddress", "addressLocality": city, "addressCountry": "IN" }
  };

  return (
    <>
      <SEO title={title} description={desc} url={`${import.meta.env.VITE_SITE_URL || ""}/${city.toLowerCase()}`} schema={schema} />
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-brandBlue mb-4">{city} Website Designer & Google Maps Expert</h1>
          <p className="text-gray-700 mb-6">{desc}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Local SEO for {city}</h3>
              <p>We optimize your Google Maps listing, images, category and website to increase local calls.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Most projects done in 1–3 days with clear updates — perfect for local shops & services.</p>
            </div>
          </div>

          <a href="#contact" className="inline-block mt-6 bg-brandOrange text-white px-6 py-3 rounded-xl">Request Free Audit</a>
        </div>
      </section>
    </>
  );
}
