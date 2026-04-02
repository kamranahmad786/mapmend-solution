import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-24 right-6 z-[9999] flex flex-col gap-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto"
            >
              <ToastItem toast={toast} onClose={() => removeToast(toast.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ toast, onClose }) => {
  const icons = {
    success: <FiCheckCircle className="text-green-400" />,
    error: <FiAlertCircle className="text-red-400" />,
    info: <FiInfo className="text-brandBlue" />,
  };

  const colors = {
    success: "border-green-500/20 bg-green-500/5",
    error: "border-red-500/20 bg-red-500/5",
    info: "border-brandBlue/20 bg-brandBlue/5",
  };

  return (
    <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl glass-card border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-md ${colors[toast.type]}`}>
      <div className="text-2xl shrink-0">
        {icons[toast.type]}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white leading-relaxed">
          {toast.message}
        </p>
      </div>
      <button 
        onClick={onClose}
        className="text-gray-500 hover:text-white transition-colors p-1"
      >
        <FiX />
      </button>
    </div>
  );
};
