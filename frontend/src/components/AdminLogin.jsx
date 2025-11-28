import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        form
      );

      // Save JWT token
      localStorage.setItem("mapmend_token", res.data.token);

      // Redirect to admin panel
      navigate("/admin");
    } catch (error) {
      setErr(error.response?.data?.error || "Invalid email or password");
    }
  };

  return (
    <div className="pt-24 max-w-md mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4 text-brandBlue">Admin Login</h2>

      <form onSubmit={submit} className="grid gap-4 bg-white p-6 rounded-xl shadow">
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="p-3 border rounded-lg w-full"
        />

        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="p-3 border rounded-lg w-full"
        />

        <button
          type="submit"
          className="bg-brandBlue text-white py-2 rounded-lg font-semibold hover:opacity-90"
        >
          Login
        </button>

        {err && <div className="text-red-600 text-sm">{err}</div>}
      </form>
    </div>
  );
}
