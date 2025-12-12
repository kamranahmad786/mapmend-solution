import React from "react";
import { FiFileText, FiDownload, FiAlertCircle } from "react-icons/fi";

export default function Invoices() {
  const invoices = []; // Later replace with API response

  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-extrabold text-brandBlue mb-6">Invoices</h1>

      {/* If no invoices */}
      {invoices.length === 0 && (
        <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brandBlue/10">
            <FiAlertCircle className="text-3xl text-brandBlue" />
          </div>

          <h3 className="text-xl font-semibold text-brandBlue mt-4">
            No Invoices Found
          </h3>

          <p className="text-gray-600 mt-2 max-w-md">
            You haven't purchased any plan yet. Once you upgrade, your invoices
            will appear here with download options.
          </p>

          <a
            href="/#pricing"
            className="mt-6 bg-brandOrange text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-brandOrange/90 transition"
          >
            View Pricing Plans
          </a>
        </div>
      )}

      {/* If invoices exist */}
      {invoices.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-600 border-b">
                <th className="pb-3">Invoice ID</th>
                <th className="pb-3">Plan</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3"></th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 text-brandBlue font-semibold">
                    {inv.id}
                  </td>
                  <td className="py-3">{inv.plan}</td>
                  <td className="py-3 font-medium">
                    ₹{(inv.amount / 100).toLocaleString()}
                  </td>
                  <td className="py-3">{inv.date}</td>
                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        inv.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : inv.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {inv.status.charAt(0).toUpperCase() +
                        inv.status.slice(1)}
                    </span>
                  </td>

                  <td className="py-3 text-right">
                    <button
                      className="flex items-center gap-2 text-brandBlue font-medium hover:text-brandOrange transition"
                      onClick={() => alert("Download logic goes here")}
                    >
                      <FiDownload /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
