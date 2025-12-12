// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import api from "../utils/api";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("mapmend_token");
    if (!token) {
      setLoading(false);
      return;
    }

    // fetch profile (backend should provide /api/auth/me)
    api.get("/api/auth/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("mapmend_token");
    setUser(null);
  };

  return { user, setUser, loading, logout };
}
