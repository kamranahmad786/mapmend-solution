import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/auth/login", form);
      localStorage.setItem("mapmend_token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">

      {/* WRAPPER */}
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">

        {/* LEFT — BRAND PANEL */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-brandBlue to-blue-700 text-white p-12">

          {/* UPDATED LOGO BLOCK */}
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-white p-3 rounded-xl shadow-lg">
              <img
                src="/logo-mapmend.png"
                alt="MapMend Solution Logo"
                className="h-12 w-12 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">MapMend Solution</h1>
              <p className="text-white/80 text-sm -mt-1">Elevate Your Business Online</p>
            </div>
          </div>

          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Welcome Back 👋
          </h2>

          <p className="text-white/90 text-lg mb-8">
            Log in to access your website audit dashboard, SEO insights, 
            Google Maps reports and business growth tools.
          </p>

          <ul className="space-y-4 text-white/90 text-sm">
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              Track your business performance
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              Access detailed website & SEO reports
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">✓</span>
              Get AI-driven improvement recommendations
            </li>
          </ul>

          <div className="mt-10">
            <p className="text-sm opacity-80">Don’t have an account?</p>
            <Link
              to="/register"
              className="inline-block mt-2 bg-white text-brandBlue px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-200 transition"
            >
              Create Account →
            </Link>
          </div>
        </div>

        {/* RIGHT — LOGIN FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-brandBlue mb-6 text-center md:text-left">
            Login to Your Account
          </h2>

          <form onSubmit={submit} className="grid gap-4">

            <input
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              Login
            </button>

            {err && <div className="text-red-600 text-sm">{err}</div>}
          </form>

          {/* Mobile Register link */}
          <div className="mt-6 md:hidden text-center">
            <p className="text-gray-600">Don’t have an account?</p>
            <Link to="/register" className="text-brandBlue font-semibold">
              Register →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
