import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function StampedOrMarked({ onNext }) {
  const [tradeMark, setTradeMark] = useState("");
  const [description, setDescription] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [isCollective, setIsCollective] = useState(false);
  const [hasColor, setHasColor] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files || []));
  };

  return (
    <div className="tm-modal-body">

      <p className="tm-modal-help">
        Please attach reproduction of the mark. (The mark must not exceed 8cm × 8cm.
        If colour/s is/are claimed, the reproduction must show the colour/s claimed.)
      </p>

      {/* FILE UPLOAD */}
      <div className="tm-field">
        <label className="tm-label">Attach attachment(s)</label>
        <div className="tm-file-row">
          <label className="tm-file-btn">
            Add file(s)
            <input type="file" multiple hidden onChange={handleFiles} />
          </label>
          <div className="tm-file-meta">
            {files.length ? `${files.length} file(s) selected` : "No files selected"}
          </div>
        </div>
      </div>

      {/* TRADEMARK */}
      <div className="tm-field">
        <label className="tm-label">
          Trade mark <span className="tm-required">*</span>
        </label>
        <input
          className="tm-input"
          value={tradeMark}
          onChange={(e) => setTradeMark(e.target.value)}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">
            Description of the mark, if there is a claim of color/s specify the
            principal parts of the mark that are in the color/s identified.
          </label>
          <textarea
            className="tm-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="tm-sidehint">
          Fill this field with the description of the mark being applied for.
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">
            Disclaimer, if any (any word/s or component of the mark over which no
            exclusive right is claimed)
          </label>
          <textarea
            className="tm-textarea"
            value={disclaimer}
            onChange={(e) => setDisclaimer(e.target.value)}
          />
        </div>
        <div className="tm-sidehint">
          Fill in this field with the disclaimer of the mark being applied for.
        </div>
      </div>

      {/* CHECKBOXES */}
      <div className="tm-checks">
        <label className="tm-check">
          <input
            type="checkbox"
            checked={isCollective}
            onChange={(e) => setIsCollective(e.target.checked)}
          />
          <span>Check if it is a collective mark.</span>
        </label>

        <label className="tm-check">
          <input
            type="checkbox"
            checked={hasColor}
            onChange={(e) => setHasColor(e.target.checked)}
          />
          <span>Check if your trade mark contain any colour.</span>
        </label>
      </div>

      {/* FOOTER */}
      <div className="tm-modal-footer">
        <button
          className="tm-next"
          type="button"
          onClick={() =>
            onNext?.({
              tradeMark,
              description,
              disclaimer,
              isCollective,
              hasColor,
              files,
            })
          }
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
