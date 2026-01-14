import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function GoodsAndServices({ onNext, onPrevious }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="tm-modal-body">
      <h2 className="tm-modal-title">Goods and services</h2>
      <div 
        style={{ 
          height: "3px", 
          background: "var(--ipo-orange)", 
          marginBottom: "1rem", 
          borderRadius: "2px" 
        }}
      ></div>

      <p className="tm-modal-help">
        What goods and/or services should this trade mark protect? Search function is not working, kindly proceed to these sites for list of terms. <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>Madrid Goods and Services Manager</a>, <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>WIPO Nice Classification</a>, or <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none" }}>Harmonised Database for Nice Classification</a>
      </p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", alignItems: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Search"
          className="tm-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: "0 0 200px", margin: 0 }}
        />
        <button type="button" className="tm-file-btn">
          Search
        </button>
        <a href="#" style={{ color: "var(--ipo-orange)", textDecoration: "none", fontSize: "14px", fontWeight: "700" }}>
          I want to provide my list
        </a>
      </div>

      <div className="tm-modal-footer" style={{ justifyContent: "space-between" }}>
        <button className="tm-file-btn" type="button" onClick={onPrevious} style={{ fontWeight: "800" }}>
          Previous
        </button>
        <button className="tm-next" type="button" onClick={onNext}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}