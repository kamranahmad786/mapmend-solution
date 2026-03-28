import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FiStar, FiCheckCircle, FiSend, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";

export default function UserReviews() {
  const [myReview, setMyReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ review: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyReview();
  }, []);

  const fetchMyReview = async () => {
    try {
      const res = await api.get("/api/testimonials/my");
      setMyReview(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      <div className="w-12 h-12 border-4 border-brandBlue border-t-brandOrange rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
      <h1 className="text-3xl font-extrabold text-brandBlue mb-2 flex items-center gap-3">
        <FiMessageSquare className="text-brandOrange" /> Share Your Experience
      </h1>
      <p className="text-gray-600 mb-10">We value your feedback. Let the world know how MapMend helped your business.</p>

      {myReview ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-green-100 rounded-3xl p-10 shadow-xl relative overflow-hidden text-center"
        >
          {/* Subtle decoration */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl shadow-inner animate-bounce-slow">
              <FiCheckCircle />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Published!</h2>
          <p className="text-green-600 font-semibold mb-8">
            {myReview.approved ? "Live on website" : "Pending Admin Approval"}
          </p>

          <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl text-left italic relative">
            <span className="text-4xl text-gray-200 absolute -top-2 left-4 font-serif">“</span>
            <div className="flex gap-1 text-brandOrange mb-4">
              {[...Array(myReview.rating)].map((_, i) => <FiStar key={i} className="fill-current" />)}
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {myReview.review}
            </p>
            <span className="text-4xl text-gray-200 absolute -bottom-6 right-4 font-serif">”</span>
          </div>

          <p className="mt-8 text-sm text-gray-400 italic">
            Note: To maintain authenticity, reviews cannot be edited once published. Please contact support if you need major changes.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-blue-50 rounded-3xl p-10 shadow-2xl space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">How many stars?</label>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setForm({ ...form, rating: num })}
                  className={`text-3xl transition-all hover:scale-125 ${form.rating >= num ? 'text-brandOrange' : 'text-gray-200'}`}
                >
                  <FiStar className={form.rating >= num ? "fill-current" : ""} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest mb-4">Your Experience</label>
            <textarea
              required
              rows="6"
              value={form.review}
              onChange={(e) => setForm({ ...form, review: e.target.value })}
              placeholder="Tell us how MapMend changed your digital presence..."
              className="w-full bg-gray-50 border-2 border-transparent focus:border-brandBlue focus:bg-white p-5 rounded-2xl outline-none transition-all text-gray-800"
            />
          </div>

          {error && <p className="text-red-500 font-semibold text-center">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brandBlue text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl hover:bg-brandBlue/90 hover:scale-[1.01] active:hover:scale-[0.99] disabled:opacity-50 transition-all flex items-center justify-center gap-3"
          >
            {submitting ? "Publishing Experience..." : <><FiSend /> Publish My Review</>}
          </button>
        </form>
      )}
    </div>
  );
}
