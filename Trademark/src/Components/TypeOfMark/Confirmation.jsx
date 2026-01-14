import React, { useState } from "react";
import "../../Css/Confirmation.css";

export default function Confirmation({ data, onPrevious, onClose }) {
  const [declarationSmallEntity, setDeclarationSmallEntity] = useState(false);
  const [priorityExamination, setPriorityExamination] = useState(false);
  const [declarationActualUse, setDeclarationActualUse] = useState(false);
  const [specialPowerAttorney, setSpecialPowerAttorney] = useState(false);
  const [youthFiler, setYouthFiler] = useState(false);
  const [payorFullName, setPayorFullName] = useState("");
  const [additionalPayorDetail, setAdditionalPayorDetail] = useState("");

  const handleSubmit = () => {
    const finalSubmission = {
      ...data,
      declarations: {
        declarationSmallEntity,
        priorityExamination,
        declarationActualUse,
        specialPowerAttorney,
        youthFiler,
      },
      payor: {
        fullName: payorFullName,
        additionalDetail: additionalPayorDetail,
      },
    };

    console.log("Submitting application...", finalSubmission);
    alert("Application submitted successfully!");
    onClose();
  };

  const markTypeLabel =
    data?.selectedMarkType === "word"
      ? "Word mark"
      : data?.selectedMarkType === "figurative"
      ? "Figurative mark"
      : data?.selectedMarkType === "figurative-words"
      ? "Figurative with words mark"
      : data?.selectedMarkType === "3d"
      ? "3D mark"
      : data?.selectedMarkType === "stamped"
      ? "Stamped or marked container of good"
      : "Type of mark";

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-container">
        <h1 className="confirmation-title">Confirmation</h1>
        <p className="confirmation-subtitle">
          Before you submit your trade mark application, please confirm that the details are correct.
        </p>

        {/* Trademark details */}
        <div className="confirmation-section">
          <div className="section-header">
            <h2>Trademark details</h2>
            <button className="modify-btn">modify</button>
          </div>

          <div className="section-content">
            {/* ✅ Show preview image */}
            {data?.markData?.imagePreview ? (
              <img src={data.markData.imagePreview} alt="Mark" className="mark-image" />
            ) : null}

            <div className="detail-row">
              <span className="detail-icon">A</span>
              <span>{markTypeLabel}</span>
            </div>

            <div className="detail-item">
              <strong>Mark</strong>
              <p>{data.markData?.tradeMark || data.markData?.markText || data.markData?.description || "—"}</p>
            </div>

            <div className="detail-item">
              <strong>Language</strong>
              <p>{data.language || "English"}</p>
            </div>
          </div>
        </div>

        {/* Goods and services */}
        <div className="confirmation-section">
          <div className="section-header">
            <h2>Goods and services</h2>
            <button className="modify-btn">modify</button>
          </div>
          <div className="section-content">
            <div className="class-number">{data.classification?.selectedClasses?.length || 4}</div>
            <p>{data.goodsServices?.description || "—"}</p>
          </div>
        </div>

        {/* Your details */}
        <div className="confirmation-section">
          <div className="section-header">
            <h2>Your details</h2>
            <button className="modify-btn">modify</button>
          </div>

          <div className="section-content">
            <h3>Representative information</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>ID</th>
                  <th>Organisation</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.applicantRepresentative?.representatives?.length > 0 ? (
                  data.applicantRepresentative.representatives.map((rep, index) => (
                    <tr key={rep.id}>
                      <td>{index + 1}</td>
                      <td>{rep.id?.toString().substring(0, 5) || "EffgO"}</td>
                      <td>{rep.nameOfEmployer || "sample"}</td>
                      <td>-</td>
                      <td>{`${rep.firstName} ${rep.surname}`.substring(0, 15)}...</td>
                      <td>{rep.country || "PH"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>1</td>
                    <td>EffgO</td>
                    <td>sample</td>
                    <td>-</td>
                    <td>sample sam...</td>
                    <td>PH</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3>Applicant information</h3>
            <table className="details-table">
              <thead>
                <tr>
                  <th>Number</th>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {data.applicantRepresentative?.applicants?.length > 0 ? (
                  data.applicantRepresentative.applicants.map((app, index) => (
                    <tr key={app.id}>
                      <td>{index + 1}</td>
                      <td>{app.id?.toString().substring(0, 5) || "EffgO"}</td>
                      <td>{app.applicantType || "Business/Company"}</td>
                      <td>{`${app.firstName} ${app.surname}`}</td>
                      <td>{app.country || "BN"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>1</td>
                    <td>EffgO</td>
                    <td>Business/Company</td>
                    <td>sample</td>
                    <td>BN</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Claims */}
        <div className="confirmation-section">
          <div className="section-header">
            <h2>Claims</h2>
            <button className="modify-btn">modify</button>
          </div>
        </div>

        {/* Declaration of Small Entity */}
        <div className="declaration-section">
          <h2>Declaration of Small Entity</h2>
          <p>
            By ticking off the box, the applicant is making a declaration that their assets are Php 100 million or below. In
            this regard that the applicant is determined to have assets higher than Php 100 million, it shall be a ground for
            denial of the application.
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={declarationSmallEntity}
              onChange={(e) => setDeclarationSmallEntity(e.target.checked)}
            />
            <span>Declaration of Small Entity</span>
          </label>
        </div>

        {/* Priority Examination */}
        <div className="declaration-section">
          <h2>Priority Examination</h2>
          <p>
            This is a request for priority examination under Rule 6(506) of the Trademark Regulations. Priority of
            examination may be granted upon submission of a petition under oath that the application fulfills any of the
            requirements under Rule 6(506). The request for priority examination is subject to the payment of an
            additional fee.
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={priorityExamination}
              onChange={(e) => setPriorityExamination(e.target.checked)}
            />
            <span>Priority Examination</span>
          </label>
        </div>

        {/* Declaration of Actual Use */}
        <div className="declaration-section">
          <h2>Declaration of Actual Use</h2>
          <p>
            If an applicant wishes to submit the Declaration of Actual Use (DAU) together with this application, the DAU
            must be attached and additional fees paid.
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={declarationActualUse}
              onChange={(e) => setDeclarationActualUse(e.target.checked)}
            />
            <span>Declaration of Actual Use</span>
          </label>
        </div>

        {/* Special Power of Attorney */}
        <div className="declaration-section">
          <h2>Special Power of Attorney</h2>
          <p>
            If the applicant wishes to submit the Power of Attorney together with this application, the SPA must be
            attached.
          </p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={specialPowerAttorney}
              onChange={(e) => setSpecialPowerAttorney(e.target.checked)}
            />
            <span>Special Power of Attorney</span>
          </label>
        </div>

        {/* Youth Filer */}
        <div className="declaration-section">
          <h2>Youth Filer</h2>
          <p>To avail of the YBR, certificate must be attached</p>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={youthFiler}
              onChange={(e) => setYouthFiler(e.target.checked)}
            />
            <span>Youth Filer</span>
          </label>
        </div>

        {/* Payor / Payment Details */}
        <div className="payment-section">
          <h2>Payor / Payment Details</h2>
          <p>Enter the payor's name and details. This information will added in the Official Receipt (O.R.).</p>

          <div className="form-field">
            <label>
              Full name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={payorFullName}
              onChange={(e) => setPayorFullName(e.target.value)}
              className="text-input"
              placeholder="Enter full name"
            />
          </div>

          <div className="form-field">
            <label>Additional Payor's detail</label>
            <input
              type="text"
              value={additionalPayorDetail}
              onChange={(e) => setAdditionalPayorDetail(e.target.value)}
              className="text-input"
              placeholder="Enter additional details"
            />
          </div>
        </div>

        {/* Notice */}
        <div className="notice-section">
          <h3>NOTICE</h3>
          <p>
            <strong>Notice:</strong> When you click on "Submit" you will be transferred to the Payment Page for the selection
            of the payment option after a GEN number has been issued. In the event that you are unable to select the mode of
            payment you want to use - If you select online payment, you will then be transferred to the bank's payment site.
          </p>
          <p>Please remember that the filing date will be issued only after payment has been received by the IPOPHL.</p>
        </div>

        {/* Buttons */}
        <div className="button-section">
          <button className="previous-btn" onClick={onPrevious}>
            Previous
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit →
          </button>
        </div>
      </div>
    </div>
  );
}
