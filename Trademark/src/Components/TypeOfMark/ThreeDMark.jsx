/* =========================
   ThreeDMark.jsx (FULL UPDATED)
   ✅ Uses Base64 preview so it still shows in Confirmation
========================= */
import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function ThreeDMark({ onNext }) {
  const [description, setDescription] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [isCollective, setIsCollective] = useState(false);
  const [hasColor, setHasColor] = useState(false);
  const [files, setFiles] = useState([]);

  // ✅ persistent preview
  const [imagePreview, setImagePreview] = useState("");

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    setFiles(selected);

    const first = selected?.[0];
    if (!first) {
      setImagePreview("");
      return;
    }

    if (first.type?.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result); // DataURL
      reader.readAsDataURL(first);
    } else {
      setImagePreview("");
    }
  };

  return (
    <div className="tm-modal-body">
      <p className="tm-modal-help">
        Please attach reproduction of the mark. (The mark must not exceed 8cm × 8cm. If colour/s is/are claimed, the
        reproduction must show the colour/s claimed.)
      </p>

      <div className="tm-field">
        <label className="tm-label">Attach attachment(s)</label>
        <div className="tm-file-row">
          <label className="tm-file-btn">
            Add file(s)
            <input type="file" multiple onChange={handleFiles} style={{ display: "none" }} />
          </label>
          <div className="tm-file-meta">
            {files.length ? `${files.length} file(s) selected` : "No files selected"}
          </div>
        </div>

        {/* ✅ optional preview */}
        {imagePreview && (
          <div style={{ marginTop: 12 }}>
            <img
              src={imagePreview}
              alt="Uploaded mark preview"
              style={{ width: "100%", maxWidth: 420, borderRadius: 8, border: "1px solid #e5e7eb" }}
            />
          </div>
        )}
      </div>

      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">
            Description of the mark, if there is a claim of color/s specify the principal parts of the mark that are in the
            color/s identified.
          </label>
          <textarea className="tm-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="tm-sidehint">Fill this field with the description of the mark being applied for.</div>
      </div>

      <div className="tm-field tm-two-col">
        <div>
          <label className="tm-label">
            Disclaimer, if any (any word/s or component of the mark over which no exclusive right is claimed)
          </label>
          <textarea className="tm-textarea" value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} />
        </div>
        <div className="tm-sidehint">Fill in this field with the disclaimer of the mark being applied for.</div>
      </div>

      <div className="tm-checks">
        <label className="tm-check">
          <input type="checkbox" checked={isCollective} onChange={(e) => setIsCollective(e.target.checked)} />
          <span>Check if it is a collective mark.</span>
        </label>

        <label className="tm-check">
          <input type="checkbox" checked={hasColor} onChange={(e) => setHasColor(e.target.checked)} />
          <span>Check if your trade mark contain any colour.</span>
        </label>
      </div>

      <div className="tm-modal-footer">
        <button
          className="tm-next"
          type="button"
          onClick={() =>
            onNext?.({
              description,
              disclaimer,
              isCollective,
              hasColor,
              files,
              imagePreview, // ✅ used by Confirmation
            })
          }
        >
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
