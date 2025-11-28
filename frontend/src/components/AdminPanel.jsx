import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function getToken() {
  return localStorage.getItem("mapmend_token");
}

export default function AdminPanel() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 5 });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const authHeader = () => ({
    headers: { Authorization: "Bearer " + getToken() }
  });

  const add = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/testimonials",
        form,
        authHeader()
      );
      setTestimonials((prev) => [res.data, ...prev]);
      setForm({ name: "", review: "", rating: 5 });
    } catch (err) {
      setError(err.response?.data?.error || "Error adding testimonial");
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_URL + "/api/testimonials/" + id,
        authHeader()
      );
      setTestimonials((prev) =>
        prev.filter((t) => (t._id || t.id) !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("mapmend_token");
    navigate("/admin/login");
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <button onClick={logout} className="text-sm text-brandBlue">
          Logout
        </button>
      </div>

      {/* ADD TESTIMONIAL */}
      <section className="mb-10">
        <h3 className="font-semibold mb-3">Add Testimonial</h3>

        <form onSubmit={add} className="grid gap-3 md:grid-cols-3">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="p-3 border rounded"
          />
          <input
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            placeholder="Rating"
            className="p-3 border rounded"
          />
          <textarea
            value={form.review}
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            placeholder="Review"
            className="p-3 border rounded md:col-span-3"
            rows={3}
          ></textarea>

          <button
            type="submit"
            className="bg-brandBlue text-white px-4 py-2 rounded md:col-span-3"
          >
            Add Testimonial
          </button>

          {error && (
            <div className="text-red-600 md:col-span-3">{error}</div>
          )}
        </form>
      </section>

      {/* MANAGE TESTIMONIALS */}
      <section>
        <h3 className="font-semibold mb-3">Manage Testimonials</h3>

        <div className="grid gap-4">
          {testimonials.map((t, i) => (
            <div
              key={t._id || t.id || i}
              className="p-4 border rounded flex justify-between items-start"
            >
              <div>
                <div className="font-bold text-brandBlue">{t.name}</div>
                <div className="text-sm italic">{t.review}</div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="text-sm">⭐ {t.rating || 5}</div>
                <button
                  onClick={() => remove(t._id || t.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
