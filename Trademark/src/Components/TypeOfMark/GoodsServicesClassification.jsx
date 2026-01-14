import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function GoodsServicesClassification({ onNext, onPrevious }) {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [classes, setClasses] = useState([{ id: 1, class: "4", term: "sampe" }]);

  const addClass = () => {
    setClasses([...classes, { id: Date.now(), class: "", term: "" }]);
  };

  const removeClass = (id) => {
    setClasses(classes.filter((c) => c.id !== id));
  };

  const updateClass = (id, field, value) => {
    setClasses(classes.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // ✅ IMPORTANT: send payload to parent
  const handleNext = () => {
    const payload = {
      selectedLanguage,
      classes, // array of {id, class, term}
    };

    onNext?.(payload);
  };

  return (
    <div className="tm-modal-body">
      <h2 className="tm-modal-title">Goods and services classification</h2>

      <div
        style={{
          height: "3px",
          background: "var(--ipo-orange)",
          marginBottom: "1rem",
          borderRadius: "2px",
        }}
      />

      <p className="tm-modal-help">
        What goods and/or services should this trade mark protect? Search function is not working,
        kindly proceed to these sites for list of terms.{" "}
        <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>
          Madrid Goods and Services Manager
        </a>
        ,{" "}
        <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>
          WIPO Nice Classification
        </a>
        , or{" "}
        <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>
          Harmonised Database for Nice Classification
        </a>
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <button type="button" className="tm-file-btn">
          Search
        </button>

        <button
          type="button"
          className="tm-file-btn"
          onClick={addClass}
          style={{ fontWeight: "800" }}
        >
          + Add class
        </button>

        <a
          href="#"
          style={{
            color: "var(--ipo-orange)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          I want to provide my list
        </a>
      </div>

      {/* Language Tabs */}
      <div style={{ marginBottom: "1rem" }}>
        <button
          type="button"
          onClick={() => setSelectedLanguage("English")}
          style={{
            padding: "10px 20px",
            background: selectedLanguage === "English" ? "#fff" : "#f3f4f6",
            border: "1px solid var(--border)",
            borderBottom:
              selectedLanguage === "English"
                ? "2px solid var(--ipo-orange)"
                : "1px solid var(--border)",
            cursor: "pointer",
            fontWeight: selectedLanguage === "English" ? "800" : "600",
            borderRadius: "8px 8px 0 0",
          }}
        >
          English
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "800",
                  fontSize: "13px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Class
              </th>
              <th
                style={{
                  padding: "12px",
                  textAlign: "left",
                  fontWeight: "800",
                  fontSize: "13px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Term(s)
              </th>
            </tr>
          </thead>

          <tbody>
            {classes.map((item, index) => (
              <tr
                key={item.id}
                style={{
                  borderBottom: index < classes.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <td style={{ padding: "12px", fontSize: "20px", fontWeight: "900", width: "100px" }}>
                  {item.class || ""}
                </td>

                <td style={{ padding: "12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      border: "1px dashed #d1d5db",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      title="Help"
                    >
                      ?
                    </button>

                    {/* Class input (optional) */}
                    <input
                      type="text"
                      value={item.class}
                      onChange={(e) => updateClass(item.id, "class", e.target.value)}
                      placeholder="Class"
                      style={{
                        width: 90,
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        fontWeight: "800",
                      }}
                    />

                    <input
                      type="text"
                      value={item.term}
                      onChange={(e) => updateClass(item.id, "term", e.target.value)}
                      placeholder="Enter term"
                      style={{ flex: 1, border: "none", outline: "none", fontSize: "14px" }}
                    />

                    <button
                      type="button"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                      title="Search"
                    >
                      🔍
                    </button>

                    <button
                      type="button"
                      onClick={() => removeClass(item.id)}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        border: "1px solid #d1d5db",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#dc2626",
                      }}
                      title="Remove row"
                    >
                      ×
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tm-modal-footer" style={{ justifyContent: "space-between" }}>
        <button
          className="tm-file-btn"
          type="button"
          onClick={onPrevious}
          style={{ fontWeight: "800" }}
        >
          Previous
        </button>

        {/* ✅ FIXED: call handleNext so we pass payload */}
        <button className="tm-next" type="button" onClick={handleNext}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
