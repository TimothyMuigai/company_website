"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  type?: "error" | "warning" | "info";
};

export default function ErrorModal({
  isOpen,
  onClose,
  title,
  message,
  actionLabel,
  onAction,
  type = "error",
}: ErrorModalProps) {
  const typeStyles = {
    error: {
      backdrop: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-500",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    warning: {
      backdrop: "bg-amber-50",
      border: "border-amber-200",
      icon: "text-amber-500",
      button: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
    },
    info: {
      backdrop: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-500",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
  };

  const styles = typeStyles[type];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className={`bg-white rounded-2xl shadow-2xl max-w-sm w-full border ${styles.border} overflow-hidden`}>
              {/* Header with close button */}
              <div className={`${styles.backdrop} px-6 py-5 flex items-start justify-between border-b ${styles.border}`}>
                <div className="flex items-start gap-3 flex-1">
                  <AlertCircle className={`w-6 h-6 mt-0.5 flex-shrink-0 ${styles.icon}`} />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {title || (type === "error" ? "Error" : type === "warning" ? "Warning" : "Information")}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
              </div>

              {/* Footer with actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Dismiss
                </button>
                {actionLabel && onAction && (
                  <button
                    onClick={() => {
                      onAction();
                      onClose();
                    }}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles.button}`}
                  >
                    {actionLabel}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
