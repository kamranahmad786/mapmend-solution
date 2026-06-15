import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { FiEdit3, FiImage, FiFileText, FiTag, FiBriefcase, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

export default function SubmitBlog() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    img: "",
    authorRole: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await api.post("/api/blogs", form);
      if (res.data) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/blog");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Submit Intelligence | MapMend Solution" />
      
      <main className="min-h-screen bg-lightBg dark:bg-darkBg pt-32 pb-24 relative overflow-hidden text-slate-900 dark:text-white flex items-center justify-center px-6">
        {/* Subtle Background Decor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandBlue/5 rounded-full blur-[180px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full relative z-10"
        >
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-brandBlue/10 border border-brandBlue/20 rounded-full flex items-center justify-center text-brandBlue text-2xl mx-auto mb-6">
              <FiEdit3 />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
              Submit Intelligence
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Share your tactical research and insights with the MapMend network.
            </p>
          </div>

          <div className="bg-white dark:bg-brandNavy/30 border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {success ? (
              <div className="text-center py-20">
                <FiCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-2">Submission Successful!</h2>
                <p className="text-slate-500 dark:text-slate-400">Your intelligence entry has been logged and published. Redirecting...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {error && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold">
                    <FiAlertCircle className="text-lg" /> {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Article Title
                    </label>
                    <div className="relative">
                      <FiFileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="e.g., The Future of Local SEO Algorithms"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g., Engineering, Marketing"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                      />
                    </div>
                  </div>

                  {/* Author Role */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Your Professional Role
                    </label>
                    <div className="relative">
                      <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="text" 
                        name="authorRole"
                        value={form.authorRole}
                        onChange={handleChange}
                        placeholder="e.g., Lead Strategist"
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                      />
                    </div>
                  </div>

                  {/* Cover Image URL */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Cover Image URL
                    </label>
                    <div className="relative">
                      <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        required
                        type="url" 
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                      />
                    </div>
                  </div>

                  {/* Excerpt */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Short Excerpt
                    </label>
                    <textarea 
                      required
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleChange}
                      rows="2"
                      placeholder="A compelling 1-2 sentence summary of the article..."
                      className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Content */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
                      Full Intelligence Content
                    </label>
                    <textarea 
                      required
                      name="content"
                      value={form.content}
                      onChange={handleChange}
                      rows="8"
                      placeholder="Write your full article here..."
                      className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                  <button type="button" onClick={() => navigate("/blog")} className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold transition-colors">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-brandBlue text-white font-black uppercase tracking-widest text-xs px-8 py-4 rounded-xl hover:bg-brandBlue/90 hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? "Submitting..." : "Publish Intelligence"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>
    </>
  );
}
