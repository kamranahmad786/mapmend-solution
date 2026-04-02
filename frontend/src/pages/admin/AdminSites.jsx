import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  FiGlobe, FiExternalLink, FiSearch, FiTrash2,
  FiPlus, FiX, FiSave, FiEdit2, FiCheckCircle, FiCalendar
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_OPTIONS = ["pending", "active", "completed"];
const STATUS_STYLE = {
  active:    "bg-neonCyan/10 text-neonCyan border-neonCyan/20",
  pending:   "bg-amber-500/10 text-amber-400 border-amber-500/20",
  completed: "bg-neonPurple/10 text-neonPurple border-neonPurple/20",
};

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#111116] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-extrabold text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <FiX className="text-xl" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-gray-400 uppercase tracking-widest font-bold">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan outline-none px-4 py-3 rounded-xl transition text-sm"
    />
  );
}

export default function AdminSites() {
  const [sites,   setSites]   = useState([]);
  const [users,   setUsers]   = useState([]);
  const [search,  setSearch]  = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editSite, setEditSite] = useState(null);
  const [saving,  setSaving]  = useState(false);
  const [toast,   setToast]   = useState(null);

  // Add form state
  const [form, setForm] = useState({
    userId: "", domain: "", name: "", seoScore: "", pagespeedScore: "", status: "pending", handoverDate: ""
  });

  // Edit form state
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchSites();
    api.get("/api/admin/users").then(r => setUsers(r.data.filter(u => u.role !== "admin"))).catch(() => {});
  }, []);

  const fetchSites = async () => {
    const res = await api.get("/api/admin/sites").catch(() => ({ data: [] }));
    setSites(res.data);
  };

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addSite = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/api/admin/sites", {
        userId:        form.userId,
        domain:        form.domain,
        name:          form.name || form.domain,
        seoScore:      form.seoScore ? Number(form.seoScore) : undefined,
        pagespeedScore: form.pagespeedScore ? Number(form.pagespeedScore) : undefined,
        status:        form.status,
        handoverDate:  form.handoverDate || undefined,
      });
      await fetchSites();
      setShowAdd(false);
      setForm({ userId: "", domain: "", name: "", seoScore: "", pagespeedScore: "", status: "pending", handoverDate: "" });
      showToast("Website added & client notified ✓");
    } catch (err) {
      showToast(err.response?.data?.error || "Error adding site", "error");
    } finally { setSaving(false); }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/api/admin/sites/${editSite._id}`, {
        domain:        editForm.domain,
        name:          editForm.name,
        seoScore:      editForm.seoScore ? Number(editForm.seoScore) : undefined,
        pagespeedScore: editForm.pagespeedScore ? Number(editForm.pagespeedScore) : undefined,
        status:        editForm.status,
        handoverDate:  editForm.handoverDate || null,
      });
      await fetchSites();
      setEditSite(null);
      showToast("Site updated & client notified ✓");
    } catch (err) {
      showToast(err.response?.data?.error || "Error updating site", "error");
    } finally { setSaving(false); }
  };

  const deleteSite = async (id) => {
    if (!window.confirm("Permanently delete this site record?")) return;
    await api.delete("/api/admin/sites/" + id).catch(() => {});
    setSites(prev => prev.filter(s => s._id !== id));
    showToast("Site deleted");
  };

  const openEdit = (site) => {
    setEditSite(site);
    setEditForm({
      domain:        site.domain || "",
      name:          site.name || "",
      seoScore:      site.seoScore || "",
      pagespeedScore: site.pagespeedScore || "",
      status:        site.status || "pending",
      handoverDate:  site.handoverDate ? new Date(site.handoverDate).toISOString().split('T')[0] : "",
    });
  };

  const filtered = sites.filter(s =>
    (s.domain || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.user?.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.user?.name  || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold shadow-2xl border backdrop-blur-xl ${
              toast.type === "success"
                ? "bg-neonCyan/10 border-neonCyan/30 text-neonCyan"
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}
          >
            <FiCheckCircle /> {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 glass-card p-6 rounded-3xl border border-white/5">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <FiGlobe className="text-neonBlue" /> Client Websites
          </h2>
          <p className="text-gray-400 mt-1 text-sm">Add & manage websites. Handover dates trigger official delivery notifications.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111]/80 border border-white/10 text-white placeholder-gray-600 focus:border-neonCyan outline-none py-3 pl-11 pr-4 rounded-xl text-sm transition" />
          </div>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-neonCyan text-black font-extrabold px-5 py-3 rounded-xl hover:scale-105 transition-transform shadow-[0_0_15px_rgba(6,182,212,0.3)] text-sm whitespace-nowrap">
            <FiPlus /> Add Website
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="glass-card rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-[#111] text-xs uppercase text-gray-400 font-bold tracking-widest border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Domain</th>
                <th className="px-6 py-4">SEO / Speed</th>
                <th className="px-6 py-4">Status & Handover</th>
                <th className="px-6 py-4">Submission</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.03]">
              {filtered.map((s, i) => (
                <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                  className="hover:bg-white/[0.02] transition-colors">

                  <td className="px-6 py-4">
                    <div className="font-bold text-white">{s.user?.name || "Unknown"}</div>
                    <div className="text-gray-500 text-xs">{s.user?.email || "—"}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-white">
                      {s.domain || "—"}
                      {s.domain && (
                        <a href={`https://${s.domain}`} target="_blank" rel="noreferrer"
                          className="text-gray-600 hover:text-neonBlue transition-colors">
                          <FiExternalLink className="text-xs" />
                        </a>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">{s.name || ""}</div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold">
                      {s.seoScore ? <span className="text-neonCyan">SEO {s.seoScore}</span> : <span className="text-gray-600">SEO —</span>}
                      <span className="text-gray-600 mx-2">/</span>
                      {s.pagespeedScore ? <span className="text-neonPurple">Speed {s.pagespeedScore}</span> : <span className="text-gray-600">Speed —</span>}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${STATUS_STYLE[s.status] || STATUS_STYLE.pending}`}>
                      {(s.status || "pending").toUpperCase()}
                    </span>
                    {s.handoverDate && (
                      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-gray-500 font-bold">
                        <FiCalendar className="text-neonCyan" /> 
                        {new Date(s.handoverDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(s.createdAt).toLocaleDateString("en-IN")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openEdit(s)}
                        className="text-neonCyan bg-neonCyan/10 hover:bg-neonCyan hover:text-black px-3 py-2 rounded-xl text-xs font-bold border border-neonCyan/20 transition-all flex items-center gap-1">
                        <FiEdit2 /> Edit
                      </button>
                      <button onClick={() => deleteSite(s._id)}
                        className="text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white px-3 py-2 rounded-xl text-lg border border-red-500/20 transition-all">
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="6" className="text-center py-16 text-gray-600">No websites found. Click "Add Website" to add one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SITE MODAL */}
      <AnimatePresence>
        {showAdd && (
          <Modal title="➕ Add Website for Client" onClose={() => setShowAdd(false)}>
            <form onSubmit={addSite} className="space-y-4">
              <Field label="Select Client *">
                <select value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required
                  className="w-full bg-white/5 border border-white/10 text-white focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition">
                  <option value="" disabled>— Pick a client —</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id} style={{ background: "#111" }}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </Field>
              <Field label="Domain / URL *">
                <Input value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} placeholder="e.g. myrestaurant.in" />
              </Field>
              <Field label="Business / Project Name">
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Sharma Restaurant" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="SEO Score">
                  <Input type="number" value={form.seoScore} onChange={e => setForm({ ...form, seoScore: e.target.value })} placeholder="0–100" />
                </Field>
                <Field label="Speed Score">
                  <Input type="number" value={form.pagespeedScore} onChange={e => setForm({ ...form, pagespeedScore: e.target.value })} placeholder="0–100" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Status">
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: "#111" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </Field>
                <Field label="Handover Date">
                  <Input type="date" value={form.handoverDate} onChange={e => setForm({ ...form, handoverDate: e.target.value })} />
                </Field>
              </div>
              <p className="text-xs text-gray-500">📧 The client will automatically receive an email notification with site details.</p>
              <button type="submit" disabled={saving}
                className="w-full bg-neonCyan text-black font-extrabold py-3 rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <FiSave />}
                {saving ? "Adding..." : "Add Website & Notify Client"}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* EDIT SITE MODAL */}
      <AnimatePresence>
        {editSite && (
          <Modal title={`✏️ Edit — ${editSite.domain}`} onClose={() => setEditSite(null)}>
            <form onSubmit={saveEdit} className="space-y-4">
              <Field label="Domain">
                <Input value={editForm.domain} onChange={e => setEditForm({ ...editForm, domain: e.target.value })} placeholder="domain.com" />
              </Field>
              <Field label="Business Name">
                <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Business name" />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="SEO Score">
                  <Input type="number" value={editForm.seoScore} onChange={e => setEditForm({ ...editForm, seoScore: e.target.value })} placeholder="0–100" />
                </Field>
                <Field label="Speed Score">
                  <Input type="number" value={editForm.pagespeedScore} onChange={e => setEditForm({ ...editForm, pagespeedScore: e.target.value })} placeholder="0–100" />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Status">
                  <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 text-white focus:border-neonCyan outline-none px-4 py-3 rounded-xl text-sm transition">
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: "#111" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </Field>
                <Field label="Handover Date">
                  <Input type="date" value={editForm.handoverDate} onChange={e => setEditForm({ ...editForm, handoverDate: e.target.value })} />
                </Field>
              </div>
              <p className="text-xs text-gray-500">📧 Changing status or handover date will notify the client via mail.</p>
              <button type="submit" disabled={saving}
                className="w-full bg-neonCyan text-black font-extrabold py-3 rounded-xl hover:scale-[1.01] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <FiSave />}
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>

    </div>
  );
}
