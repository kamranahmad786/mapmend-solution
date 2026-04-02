import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FiStar, FiCheckCircle, FiSend, FiMessageSquare, FiAlertCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="text-3xl transition-all hover:scale-125 focus:outline-none"
        >
          <FiStar
            className={`transition-colors ${(hovered || value) >= n ? "text-neonCyan fill-current" : "text-gray-600"}`}
          />
        </button>
      ))}
    </div>
  );
}

export default function UserReviews() {
  const [myReview,   setMyReview]   = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [form,       setForm]       = useState({ review: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState("");

  useEffect(() => {
    api.get("/api/testimonials/my")
      .then(r => setMyReview(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.review.trim()) return setError("Please write your experience.");
    setSubmitting(true);
    setError("");
    try {
      const res = await api.post("/api/testimonials", form);
      setMyReview(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error submitting review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-4 border-neonCyan/20 border-t-neonCyan rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-2xl space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FiMessageSquare className="text-neonPink" /> My Review
        </h1>
        <p className="text-gray-400 mt-1">Share your MapMend experience and help other businesses find us.</p>
      </div>

      <AnimatePresence mode="wait">

        {/* ALREADY SUBMITTED */}
        {myReview && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card border border-neonCyan/20 rounded-3xl p-10 relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neonCyan/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 text-center mb-8">
              <div className="w-20 h-20 bg-neonCyan/10 border border-neonCyan/30 rounded-full flex items-center justify-center text-neonCyan text-4xl mx-auto mb-4 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <FiCheckCircle />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-1">Review Submitted!</h2>
              <p className={`text-sm font-bold px-4 py-1.5 rounded-full inline-block mt-1 ${
                myReview.approved
                  ? "bg-neonCyan/10 text-neonCyan border border-neonCyan/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}>
                {myReview.approved ? "✓ Live on Website" : "⏳ Pending Admin Approval"}
              </p>
            </div>

            {/* REVIEW CARD */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative z-10">
              <div className="flex gap-1 text-neonCyan mb-4">
                {[...Array(Math.max(0, Math.min(5, Number(myReview.rating || 5))))].map((_, i) => (
                  <FiStar key={i} className="fill-current text-xl" />
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed text-lg italic">"{myReview.review}"</p>
            </div>

            <p className="relative z-10 mt-6 text-xs text-gray-600 text-center">
              Reviews are permanent to maintain authenticity. Contact support for major corrections.
            </p>
          </motion.div>
        )}

        {/* SUBMISSION FORM */}
        {!myReview && (
          <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <form onSubmit={handleSubmit} className="glass-card border border-white/10 rounded-3xl p-8 space-y-6">

              {/* STAR RATING */}
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest font-bold mb-4">
                  Your Rating
                </label>
                <StarPicker value={form.rating} onChange={v => setForm({ ...form, rating: v })} />
                <p className="text-xs text-gray-600 mt-2">
                  {form.rating === 5 ? "Excellent 🎉" : form.rating === 4 ? "Great 👍" : form.rating === 3 ? "Good 😊" : form.rating === 2 ? "Fair 🤔" : "Poor 😞"}
                </p>
              </div>

              {/* REVIEW TEXT */}
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">
                  Your Experience
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.review}
                  onChange={e => setForm({ ...form, review: e.target.value })}
                  placeholder="Tell us how MapMend changed your digital presence..."
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan focus:ring-1 focus:ring-neonCyan outline-none p-4 rounded-2xl transition-all duration-300 resize-none text-sm"
                />
                <div className="text-right text-xs text-gray-600 mt-1">{form.review.length} / 500</div>
              </div>

              {/* ERROR */}
              {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl"
                >
                  <FiAlertCircle /> {error}
                </motion.div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={submitting || !form.review.trim()}
                className="w-full bg-gradient-to-r from-neonCyan to-neonBlue text-black font-extrabold uppercase tracking-widest py-4 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiSend /> Publish My Review</>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
