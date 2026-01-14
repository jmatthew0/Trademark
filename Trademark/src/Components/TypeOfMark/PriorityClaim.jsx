import React, { useMemo, useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function PriorityClaim({ onNext, onPrevious }) {
  const [priority, setPriority] = useState(""); // "yes" | "no"

  const isValid = useMemo(() => priority === "yes" || priority === "no", [priority]);

  const handleNext = () => {
    // pass selection back to Trademark.jsx
    onNext?.({ priorityClaim: priority });
  };

  return (
    <div className="tm-modal-body">
      {/* ===== Similarity Report ===== */}
      <h2 className="tm-modal-title">
        Similarity report - trade marks that may affect your application.
      </h2>

      {/* uniform orange divider */}
      <div
        style={{
          height: "3px",
          background: "var(--ipo-orange)",
          marginBottom: "1rem",
          borderRadius: "2px",
        }}
      />

      <p className="tm-modal-help" style={{ lineHeight: 1.6 }}>
        <strong>IMPORTANT:</strong> This similarity report is only a preliminary search report and
        is not legally binding on the IPOPHIL. The only purpose of the report is to provide you
        with a list of possible conflicting marks from the database of the IPOPHIL and is
        designed to assist you in deciding whether or not to proceed with your application. The
        preliminary search is limited to word search only. The trademark examiner will conduct a
        more thorough and exhaustive search as part of the examination process.
      </p>

      <p className="tm-modal-help" style={{ marginTop: "1rem" }}>
        There were no similar marks found.
      </p>

      {/* ===== Priority Claim ===== */}
      <div style={{ marginTop: "2rem" }}>
        <h2 className="tm-modal-title">Priority Claim</h2>

        <div
          style={{
            height: "3px",
            background: "var(--ipo-orange)",
            marginBottom: "1rem",
            borderRadius: "2px",
            maxWidth: "240px",
          }}
        />

        <p className="tm-modal-help">
          Would you like to claim the priority of earlier (an) application/s filed in another
          office/country in the last six(6) months?
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <button
            type="button"
            className="tm-file-btn"
            onClick={() => setPriority("yes")}
            aria-pressed={priority === "yes"}
            style={{
              minWidth: "120px",
              fontWeight: "800",
              border: priority === "yes" ? "2px solid var(--ipo-orange)" : undefined,
            }}
          >
            Yes
          </button>

          <button
            type="button"
            className="tm-file-btn"
            onClick={() => setPriority("no")}
            aria-pressed={priority === "no"}
            style={{
              minWidth: "120px",
              fontWeight: "800",
              border: priority === "no" ? "2px solid var(--ipo-orange)" : undefined,
            }}
          >
            No
          </button>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="tm-modal-footer" style={{ justifyContent: "space-between" }}>
        <button
          className="tm-file-btn"
          type="button"
          onClick={onPrevious}
          style={{ fontWeight: "800" }}
        >
          Previous
        </button>

        <button
          className="tm-next"
          type="button"
          onClick={handleNext}
          disabled={!isValid}
          title={!isValid ? "Please select Yes or No" : ""}
          style={{
            opacity: !isValid ? 0.6 : 1,
            cursor: !isValid ? "not-allowed" : "pointer",
          }}
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
