import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { FiTrash2, FiStar, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: "", review: "", rating: 5 });
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await api.get("/api/testimonials");
      setTestimonials(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const add = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/api/testimonials", form);
      setTestimonials((prev) => [res.data, ...prev]);
      setForm({ name: "", review: "", rating: 5 });
    } catch (err) {
      setError(err.response?.data?.error || "Error adding testimonial");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete("/api/testimonials/" + id);
      setTestimonials((prev) => prev.filter((t) => (t._id || t.id) !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      
      {/* HEADER SECTION */}
      <div className="glass-card p-8 rounded-3xl border border-white/5 bg-[#08080c]/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neonPurple/10 rounded-full blur-[100px] pointer-events-none"></div>
        <h2 className="text-3xl font-extrabold text-white">Client Testimonials</h2>
        <p className="text-gray-400 mt-2">Add glowing reviews to boost conversion rates on the main landing page.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* ADD FORM */}
        <div className="glass-card p-6 rounded-3xl border border-white/5 lg:col-span-1 shadow-2xl relative order-2 lg:order-1">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiPlus className="text-neonCyan" /> Inject Review
          </h3>

          <form onSubmit={add} className="grid md:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="md:col-span-2 lg:col-span-1 border border-white/10 bg-black/40 rounded-xl p-1 flex items-center">
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Client Name"
                className="w-full bg-transparent text-white p-3 outline-none placeholder-gray-500"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-1 border border-white/10 bg-black/40 rounded-xl p-1 flex items-center relative">
              <FiStar className="text-neonCyan absolute left-4" />
              <input
                type="number"
                min="1"
                max="5"
                required
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                placeholder="Rating (1-5)"
                className="w-full bg-transparent text-white p-3 pl-10 outline-none placeholder-gray-500"
              />
            </div>
            
            <div className="md:col-span-2 lg:col-span-1 border border-white/10 bg-black/40 rounded-xl p-1">
              <textarea
                required
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                placeholder="Write the glowing review here..."
                className="w-full bg-transparent text-white p-3 outline-none placeholder-gray-500 min-h-[120px]"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 lg:col-span-1 w-full bg-gradient-to-r from-neonCyan to-neonBlue text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-transform"
            >
              Publish Testimonial
            </button>

            {error && (
              <div className="md:col-span-2 lg:col-span-1 text-neonPink text-sm text-center font-semibold bg-neonPink/10 py-2 border border-neonPink/20 rounded-lg">
                {error}
              </div>
            )}
          </form>
        </div>

        {/* FEED / LIST */}
        <div className="glass-card p-6 rounded-3xl border border-white/5 lg:col-span-2 shadow-2xl bg-[#08080c]/50 order-1 lg:order-2 h-[70vh] overflow-y-auto custom-scrollbar">
          <h3 className="text-xl font-bold text-white mb-6 sticky top-0 bg-[#08080c] py-2 z-10 border-b border-white/5">
            Active Feed
          </h3>

          <div className="space-y-4">
            {testimonials.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No testimonials published yet.</div>
            ) : (
                testimonials.map((t, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    key={t._id || t.id || i}
                    className="p-5 border border-white/10 rounded-2xl flex flex-col md:flex-row justify-between items-start gap-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-extrabold text-white text-lg">{t.name}</div>
                        <div className="text-neonCyan text-sm flex tracking-widest">{ "★".repeat(t.rating || 5) }</div>
                      </div>
                      <div className="text-gray-400 text-sm leading-relaxed max-w-xl italic border-l-2 border-white/10 pl-4 py-1">"{t.review}"</div>
                    </div>

                    <button
                      onClick={() => remove(t._id || t.id)}
                      className="text-gray-500 hover:text-neonPink p-2 hover:bg-neonPink/10 rounded-xl transition-all duration-300 shadow-md border border-transparent hover:border-neonPink/20"
                      title="Delete Testimonial"
                    >
                      <FiTrash2 className="text-lg" />
                    </button>
                  </motion.div>
                ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
