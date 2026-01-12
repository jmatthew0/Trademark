import React, { useEffect } from "react";
import "../../Css/TypeOfMarks.css";

export default function MarkTypeModal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="tm-modal-overlay" role="dialog" aria-modal="true" aria-label={title || "Modal"}>
      <div className="tm-modal-backdrop" onClick={onClose} />
      <div className="tm-modal">
        <div className="tm-modal-head">
          <div className="tm-modal-head-title">{title}</div>
          <button type="button" className="tm-modal-x" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="tm-modal-content">{children}</div>
      </div>
    </div>
  );
}
