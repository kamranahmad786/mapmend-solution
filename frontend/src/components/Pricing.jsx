import React from "react";

export default function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "₹999",
      bullets: ["1-page lead site", "Basic Google Maps fix", "1 week support"],
      tag: "Fast & Affordable",
      highlight: false,
      msg: "Hello%2C%20I%20am%20interested%20in%20the%20Starter%20Plan%20for%20my%20business."
    },
    {
      title: "Business",
      price: "₹1,999",
      bullets: ["3-page website", "Full Maps optimization", "Photos + Contact forms"],
      tag: "Most Popular",
      highlight: true,
      msg: "Hello%2C%20I%20want%20the%20Business%20Plan%20for%20my%20business.%20Please%20guide%20me."
    },
    {
      title: "Premium",
      price: "₹4,499",
      bullets: ["Custom website", "Advanced Maps SEO", "Analytics + Maintenance"],
      tag: "All-in-one Solution",
      highlight: false,
      msg: "Hello%2C%20I%20want%20the%20Premium%20Plan.%20Share%20details%20and%20next%20steps."
    },
  ];

  return (
    <section
      id="pricing"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-brandBlue mb-3">
          Simple & Transparent Pricing
        </h2>
        <p className="text-gray-600 mb-14 text-lg max-w-2xl mx-auto">
          Clear pricing for every business. No hidden fees. Pay 50% now, 50% after project completion.
        </p>

        {/* Pricing Grid */}
        <div className="grid gap-10 md:grid-cols-3">

          {plans.map((p) => (
            <div
              key={p.title}
              className={`relative group p-8 rounded-3xl shadow-lg border transition transform hover:-translate-y-3 hover:shadow-2xl
              ${p.highlight ? "border-brandOrange bg-white scale-105" : "border-gray-200 bg-white"}`}
            >
              {/* Badge */}
              <span
                className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold shadow
                ${p.highlight ? "bg-brandOrange text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {p.tag}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-brandBlue mt-4">{p.title}</h3>

              {/* Price */}
              <div className="text-4xl font-extrabold text-brandOrange my-6">{p.price}</div>

              {/* Bullet List */}
              <ul className="text-gray-600 space-y-3 text-sm mb-8">
                {p.bullets.map((b) => (
                  <li key={b} className="flex items-center justify-center gap-2">
                    <span className="text-brandOrange text-lg">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/917366890727?text=${p.msg}`}
                target="_blank"
                className={`block w-full text-center px-6 py-3 rounded-xl text-lg font-semibold transition
                ${p.highlight ? "bg-brandOrange text-white hover:bg-brandOrange/90" : "bg-brandBlue text-white hover:bg-brandBlue/90"}`}
              >
                Get {p.title}
              </a>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white rounded-3xl blur-3xl transition pointer-events-none"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
