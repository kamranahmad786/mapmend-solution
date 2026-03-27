// src/utils/api.js
import axios from "axios";

// In dev, Vite proxies /api to localhost:5000. 
// In production (Render natively), it uses relative "". 
// On Vercel, it uses the VITE_API_URL you provide.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token automatically
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("mapmend_token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
