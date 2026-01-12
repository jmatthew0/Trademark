import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function WordMark({ onNext }) {
  const [tradeMark, setTradeMark] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [translation, setTranslation] = useState("");
  const [isCollective, setIsCollective] = useState(false);

  return (
    <div className="tm-modal-body">

      <div className="tm-field">
        <label className="tm-label">
          Trade mark <span className="tm-required">*</span>
        </label>
        <input
          className="tm-input"
          value={tradeMark}
          onChange={(e) => setTradeMark(e.target.value)}
          placeholder=""
        />
      </div>

      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">
            Disclaimer, if any (any word/s or component of the mark over which no exclusive right is claimed)
          </label>
          <textarea
            className="tm-textarea"
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
          />
        </div>
        <div className="tm-sidehint">Fill in this field with the disclaimer of the mark being applied for.</div>
      </div>

      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">Translation/Transliteration</label>
          <textarea
            className="tm-textarea"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
        </div>
        <div className="tm-sidehint">
          Fill in this field with the translation/transliteration of the mark being applied for.
        </div>
      </div>

      <div className="tm-checks">
        <label className="tm-check">
          <input type="checkbox" checked={isCollective} onChange={(e) => setIsCollective(e.target.checked)} />
          <span>Check if it is a collective mark.</span>
        </label>
      </div>

      <div className="tm-modal-footer">
        <button className="tm-next" type="button" onClick={() => onNext?.({ tradeMark, disclaimer, translation, isCollective })}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}