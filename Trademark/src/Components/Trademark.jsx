import React, { useState } from "react";
import "../Css/Trademark.css";

import MarkTypeModal from "./TypeOfMark/MarkTypeModal";
import WordMark from "./TypeOfMark/WordMark";
import FigurativeMark from "./TypeOfMark/FigurativeMark";
import FigurativeWithWordsMark from "./TypeOfMark/FigurativeWithWordsMark";
import ThreeDMark from "./TypeOfMark/ThreeDMark";
import StampedOrMarked from "./TypeOfMark/StampedOrMarked";

export default function Trademark() {
  const [language, setLanguage] = useState("English");
  const [selectedMarkType, setSelectedMarkType] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalKey, setModalKey] = useState(null);

  const markTypes = [
    {
      id: "word",
      title: "Word mark",
      icon: "A",
      description:
        "A word mark is represented using words, letters, numbers or any other characters that can be typed.",
      iconStyle: "text-icon",
    },
    {
      id: "figurative",
      title: "Figurative mark",
      icon: "●",
      description:
        "A figurative mark is represented using pictures, graphics or images. A figurative mark does not contain words or letters.",
      iconStyle: "shape-icon",
    },
    {
      id: "figurative-words",
      title: "Figurative with words mark",
      icon: "A",
      description:
        "A figurative mark containing word elements combines the use of pictures, graphics or images with words or letters.",
      iconStyle: "combined-icon",
    },
    {
      id: "3d",
      title: "3D mark",
      icon: "●",
      description:
        "A three-dimensional mark is represented using a three-dimensional shape, such as the actual product or its packaging.",
      iconStyle: "shape-icon",
    },
    {
      id: "stamped",
      title: "Stamped or marked container of good",
      icon: "A",
      description:
        "A stamped or marked container of goods is any container or vessel on which a mark is impressed or molded. The representation should be a single JPEG file of an image, sketch, or photo.",
      iconStyle: "combined-icon",
    },
  ];

  const handleMarkTypeClick = (markId) => {
    setSelectedMarkType(markId);

    if (markId === "word" || markId === "figurative" || markId === "figurative-words" || markId === "3d" || markId === "stamped") {
      setModalKey(markId);
      setModalOpen(true);
    }

    console.log("Selected mark type:", markId);
  };

  const handleNext = () => {
    console.log("Next clicked", { language, selectedMarkType });
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalKey(null);
  };

  const onModalNext = (payload) => {
    console.log("Modal Next payload:", modalKey, payload);
    closeModal();
  };

  const modalTitle =
    modalKey === "word"
      ? "Word mark"
      : modalKey === "figurative"
      ? "Figurative mark"
      : modalKey === "figurative-words"
      ? "Figurative with words mark"
      : modalKey === "3d"
      ? "3D mark"
      : modalKey === "stamped"
      ? "Stamped or marked container of good"
      : "Type of mark";

  return (
    <div className="trademark-container">
      <div className="trademark-form">
        <div className="form-section">
          <h2 className="section-title">Language</h2>

          <div className="language-info">
            <p className="info-text">
              Language of the application:{" "}
              <span className="highlight">{language}</span>.
            </p>
          </div>

          <div className="form-field">
            <label className="field-label">
              Language <span className="required">*</span>
            </label>
            <select
              className="select-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Type of mark</h2>

          <p className="section-description">
            Which of the following types best describes the mark you want to apply for?
          </p>

          <div className="mark-types-grid">
            {markTypes.map((mark) => (
              <div
                key={mark.id}
                className={`mark-card ${selectedMarkType === mark.id ? "selected" : ""}`}
                onClick={() => handleMarkTypeClick(mark.id)}
                role="button"
                tabIndex={0}
              >
                <div className="mark-card-header">
                  <div className={`mark-icon ${mark.iconStyle}`}>{mark.icon}</div>
                  <h3 className="mark-title">{mark.title}</h3>
                </div>
                <p className="mark-description">{mark.description}</p>
                <div className="card-corner-indicator">.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="button-section">
          <button className="next-button" onClick={handleNext}>
            Next
            <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <MarkTypeModal open={modalOpen} title={modalTitle} onClose={closeModal}>
        {modalKey === "word" ? (
          <WordMark onNext={onModalNext} />
        ) : null}

        {modalKey === "figurative" ? (
          <FigurativeMark onNext={onModalNext} />
        ) : null}

        {modalKey === "figurative-words" ? (
          <FigurativeWithWordsMark onNext={onModalNext} />
        ) : null}

        {modalKey === "3d" ? <ThreeDMark onNext={onModalNext} /> : null}

        {modalKey === "stamped" ? <StampedOrMarked onNext={onModalNext} /> : null}
      </MarkTypeModal>
    </div>
  );
}
