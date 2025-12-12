import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await api.post("/api/auth/register", form);
      setStatus("success");
      navigate("/login");
    } catch (err) {
      setStatus(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">

      {/* WRAPPER */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT — MARKETING PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-brandBlue to-blue-700 text-white p-10">
          <div className="mb-6">
            <img
              src="/logo-mapmend.png"
              alt="MapMend Solution Logo"
              className="h-14 drop-shadow-lg"
            />
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Join MapMend Solution
          </h2>

          <p className="text-white/90 text-lg mb-8">
            Create your free account and manage website audits, SEO insights, 
            Google Maps improvements, business performance, and more — all in one dashboard.
          </p>

          <ul className="space-y-4 text-white/90 text-sm">
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              Free Website & Maps Audit Panel
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              AI-Based Website Analysis
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              Track Performance & Growth
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              24/7 Client Support
            </li>
          </ul>

          <div className="mt-10">
            <p className="text-sm opacity-80">Already have an account?</p>
            <Link
              to="/login"
              className="inline-block mt-2 bg-white text-brandBlue px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
            >
              Login Here →
            </Link>
          </div>
        </div>

        {/* RIGHT — REGISTRATION FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-brandBlue mb-6 text-center md:text-left">
            Create Your Account
          </h2>

          <form onSubmit={submit} className="grid gap-4">

            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full Name"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-brandBlue outline-none"
            />

            <input
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="Email Address"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-brandBlue outline-none"
            />

            <input
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              placeholder="Password"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-brandBlue outline-none"
            />

            <button
              type="submit"
              className="bg-brandBlue text-white py-3 rounded-lg font-semibold hover:bg-brandBlue/90 transition"
            >
              {status === "loading" ? "Creating Account..." : "Register"}
            </button>

            {status && status !== "loading" && (
              <div className={`text-center text-sm mt-2 ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                {status === "success"
                  ? "Account created successfully!"
                  : status}
              </div>
            )}
          </form>

          {/* Mobile Login link */}
          <div className="mt-6 md:hidden text-center">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/login" className="text-brandBlue font-semibold">
              Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
