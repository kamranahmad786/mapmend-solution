import React, { useState } from "react";

const faqs = [
  {
    q: "How long does a website take?",
    a: "Typically 1–3 days for a 1–3 page website. Custom work may take longer."
  },
  {
    q: "Will you update our Google Maps listing?",
    a: "Yes — we fix categories, hours, photos, website link and help you set up a review strategy."
  },
  {
    q: "How do I pay?",
    a: "We accept UPI, bank transfer, or payment links. Pay 50% to start and 50% after completion."
  },
  {
    q: "Do you offer maintenance?",
    a: "Yes — monthly maintenance packages are available for updates, backups and monitoring."
  },
  {
    q: "Will my business really get more customers after this?",
    a: "Yes — improving your Google Maps listing and website increases visibility and trust, which leads to more calls, enquiries, and footfall. Most clients begin seeing results within days."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section
      id="faq"
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">

        {/* Header */}
        <h2 className="text-4xl font-extrabold text-center text-brandBlue mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
          Clear answers to help you understand our service and process.
        </p>

        {/* Accordion */}
        <div className="space-y-5">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border shadow-md hover:shadow-xl transition"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left flex justify-between items-center"
              >
                <span className="text-lg font-semibold text-brandBlue">{f.q}</span>
                <span className="text-brandOrange text-3xl leading-none">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              <div
                className={`mt-3 text-gray-600 text-sm leading-relaxed transition-all duration-300 ${
                  open === i
                    ? "opacity-100 max-h-[300px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
