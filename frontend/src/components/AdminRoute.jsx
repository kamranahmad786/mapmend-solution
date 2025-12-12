// src/components/AdminRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get("/api/auth/me")
      .then(res => {
        if (mounted) setOk(res.data?.role === "admin");
      })
      .catch(() => setOk(false));
    return () => (mounted = false);
  }, []);

  if (ok === null) return <div className="p-8 text-center">Checking role...</div>;
  if (!ok) return <Navigate to="/login" replace />;
  return children;
}
