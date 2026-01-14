import React, { useState } from "react";
import "../../Css/FigurativeMark.css";

export default function FigurativeMark({ onNext }) {
  // Step state
  const [step, setStep] = useState("figurative-mark"); // figurative-mark, goods-services, similarity-report, applicant-representative, confirmation

  // Step 1: Figurative Mark
  const [files, setFiles] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [isCollective, setIsCollective] = useState(false);
  const [hasColor, setHasColor] = useState(false);
  const [errors, setErrors] = useState({});

  // Step 2: Goods and Services
  const [goodsServices, setGoodsServices] = useState("");
  const [provideListModalOpen, setProvideListModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classTerms, setClassTerms] = useState({});
  const [currentTerms, setCurrentTerms] = useState("");
  const [savedClassTerms, setSavedClassTerms] = useState([]);

  // Step 3: Similarity Report
  const [priorityClaim, setPriorityClaim] = useState(null);
  const [showPriorityForm, setShowPriorityForm] = useState(false);
  const [priorityCountry, setPriorityCountry] = useState("");
  const [priorityFilingDate, setPriorityFilingDate] = useState("");
  const [priorityFilingNumber, setPriorityFilingNumber] = useState("");
  const [copyOfFiling, setCopyOfFiling] = useState("now");
  const [translationOfFiling, setTranslationOfFiling] = useState("now");
  const [priorityClaims, setPriorityClaims] = useState([]);

  // Step 4: Applicant and Representative
  const [applicants, setApplicants] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [showApplicantForm, setShowApplicantForm] = useState(false);
  const [showRepresentativeForm, setShowRepresentativeForm] = useState(false);
  const [applicantFormData, setApplicantFormData] = useState({
    applicantType: "Business/Company",
    legalName: "",
    firstName: "",
    surname: "",
    countryOfRegistration: "",
    countryOfCitizenship: "",
    street: "",
    number: "",
    postCode: "",
    city: "",
    country: "",
    telephone: "",
    email: ""
  });

  const [representativeFormData, setRepresentativeFormData] = useState({
    representativeType: "Employee/Other Representative of Application",
    typeOfLegalPractitioner: "Professional Practitioner",
    firstName: "",
    surname: "",
    countryOfCitizenship: "",
    nameOfEmployer: "",
    nameOfLawFirm: "",
    street: "",
    number: "",
    postCode: "",
    city: "",
    country: "",
    stateProvince: "",
    telephone: "",
    email: ""
  });

  // Step 5: Confirmation
  const [smallEntityDeclaration, setSmallEntityDeclaration] = useState(false);
  const [priorityExamination, setPriorityExamination] = useState(false);
  const [actualUseDeclaration, setActualUseDeclaration] = useState(false);
  const [specialPowerOfAttorney, setSpecialPowerOfAttorney] = useState(false);
  const [youthFiler, setYouthFiler] = useState(false);
  const [payorFullName, setPayorFullName] = useState("");
  const [additionalPayor, setAdditionalPayor] = useState("");

  // Figurative Mark Step Handlers
  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    
    // Create preview for the first file
    if (selectedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
      };
      reader.readAsDataURL(selectedFiles[0]);
    }
  };

  const validateFigurativeMark = () => {
    const newErrors = {};
    if (files.length === 0) {
      newErrors.files = "At least one file is required";
    }
    return newErrors;
  };

  const handleFigurativeMarkNext = () => {
    const newErrors = validateFigurativeMark();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep("goods-services");
  };

  // Goods and Services Step Handlers
  const handleGoodsServicesNext = () => {
    setStep("similarity-report");
  };

  const handleGoodsServicesPrevious = () => {
    setStep("figurative-mark");
  };

  // Similarity Report Step Handlers
  const handleSimilarityReportNext = () => {
    if (priorityClaim !== null) {
      setStep("applicant-representative");
    }
  };

  const handleSimilarityReportPrevious = () => {
    setStep("goods-services");
  };
  
  const handlePriorityClaimYes = () => {
    setPriorityClaim(true);
    setShowPriorityForm(true);
  };
  
  const handlePriorityClaimNo = () => {
    setPriorityClaim(false);
    setShowPriorityForm(false);
    setPriorityClaims([]);
  };
  
  const handleAddPriorityClaim = () => {
    if (priorityCountry && priorityFilingDate && priorityFilingNumber) {
      const newClaim = {
        id: Date.now(),
        country: priorityCountry,
        filingDate: priorityFilingDate,
        filingNumber: priorityFilingNumber,
        copyOfFiling,
        translationOfFiling
      };
      setPriorityClaims([...priorityClaims, newClaim]);
      setPriorityCountry("");
      setPriorityFilingDate("");
      setPriorityFilingNumber("");
      setCopyOfFiling("now");
      setTranslationOfFiling("now");
      setShowPriorityForm(false);
    }
  };
  
  const handleCancelPriorityClaim = () => {
    setShowPriorityForm(false);
    setPriorityCountry("");
    setPriorityFilingDate("");
    setPriorityFilingNumber("");
    setCopyOfFiling("now");
    setTranslationOfFiling("now");
  };

  // Applicant and Representative Step Handlers
  const handleApplicantTypeChange = (type) => {
    setApplicantFormData({ ...applicantFormData, applicantType: type });
  };
  
  const handleApplicantFormChange = (field, value) => {
    setApplicantFormData({ ...applicantFormData, [field]: value });
  };
  
  const handleAddApplicant = () => {
    const { applicantType: type, email } = applicantFormData;
    if (type === "Business/Company") {
      const { legalName, country } = applicantFormData;
      if (!legalName.trim() || !country) return;
    } else {
      const { firstName, surname, country } = applicantFormData;
      if (!firstName.trim() || !surname.trim() || !country) return;
    }
    
    const newApplicant = {
      id: Date.now(),
      ...applicantFormData
    };
    setApplicants([...applicants, newApplicant]);
    resetApplicantForm();
  };
  
  const handleCancelApplicant = () => {
    setShowApplicantForm(false);
    resetApplicantForm();
  };
  
  const resetApplicantForm = () => {
    setApplicantFormData({
      applicantType: "Business/Company",
      legalName: "",
      firstName: "",
      surname: "",
      countryOfRegistration: "",
      countryOfCitizenship: "",
      street: "",
      number: "",
      postCode: "",
      city: "",
      country: "",
      telephone: "",
      email: ""
    });
  };

  const handleRemoveApplicant = (id) => {
    setApplicants(applicants.filter((app) => app.id !== id));
  };

  const handleAddRepresentative = () => {
    setShowRepresentativeForm(true);
  };

  const handleRepresentativeTypeChange = (type) => {
    setRepresentativeFormData({ ...representativeFormData, representativeType: type });
  };

  const handleRepresentativeFormChange = (field, value) => {
    setRepresentativeFormData({ ...representativeFormData, [field]: value });
  };

  const handleAddRepresentative2 = () => {
    const { representativeType, firstName, surname, country, email } = representativeFormData;
    if (!firstName.trim() || !surname.trim() || !country || !email.trim()) return;

    const newRepresentative = {
      id: Date.now(),
      ...representativeFormData
    };
    setRepresentatives([...representatives, newRepresentative]);
    resetRepresentativeForm();
  };

  const handleCancelRepresentative = () => {
    setShowRepresentativeForm(false);
    resetRepresentativeForm();
  };

  const resetRepresentativeForm = () => {
    setRepresentativeFormData({
      representativeType: "Employee/Other Representative of Application",
      typeOfLegalPractitioner: "Professional Practitioner",
      firstName: "",
      surname: "",
      countryOfCitizenship: "",
      nameOfEmployer: "",
      nameOfLawFirm: "",
      street: "",
      number: "",
      postCode: "",
      city: "",
      country: "",
      stateProvince: "",
      telephone: "",
      email: ""
    });
  };

  const handleRemoveRepresentative = (id) => {
    setRepresentatives(representatives.filter((rep) => rep.id !== id));
  };

  const handleApplicantRepresentativeNext = () => {
    setStep("confirmation");
  };

  const handleApplicantRepresentativePrevious = () => {
    setStep("similarity-report");
  };

  // Confirmation Step Handlers
  const handleConfirmationSubmit = () => {
    onNext?.({
      figurativeMark: { files, filePreview, description, disclaimer, isCollective, hasColor },
      goodsServices: { goodsServices },
      similarityReport: { priorityClaim },
      applicantRepresentative: { applicants, representatives },
      confirmation: {
        smallEntityDeclaration,
        priorityExamination,
        actualUseDeclaration,
        specialPowerOfAttorney,
        youthFiler,
        payorFullName,
        additionalPayor,
      },
    });
  };

  const handleConfirmationPrevious = () => {
    setStep("applicant-representative");
  };

  const renderStep = () => {
    // Render Step 1: Figurative Mark
    if (step === "figurative-mark") {
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
          {errors.files && <span className="tm-error-message">{errors.files}</span>}
        </div>

        {filePreview && (
          <div className="tm-field">
            <label className="tm-label">File Preview</label>
            <div className="tm-file-preview">
              <img src={filePreview} alt="Preview" />
            </div>
          </div>
        )}

        <div className="tm-field tm-two-col">
          <div>
            <label className="tm-label">
              Description of the mark, if there is a claim of color/s specify the principal parts of the mark that are in the
              color/s identified.
            </label>
            <textarea
              className="tm-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="tm-sidehint">Fill this field with the description of the mark being applied for.</div>
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
          <button className="tm-next" type="button" onClick={handleFigurativeMarkNext}>
            Next
          </button>
        </div>
      </div>
    );
  }

  // Render Step 2: Goods and Services
  if (step === "goods-services") {
    return (
      <div className="tm-modal-body">
        <div className="tm-field">
          <label className="tm-label">
            What goods and/or services should this trade mark protect? Search function is not working, kindly proceed
            to these sites for list of terms:{" "}
            <a href="https://webaccess.wipo.int/mgs/" target="_blank" rel="noopener noreferrer" className="tm-link">
              Madrid Goods and Services Manager
            </a>
            , <a href="https://nclpub.wipo.int/enfr/" target="_blank" rel="noopener noreferrer" className="tm-link">
              WIPO Nice Classification
            </a>
            , or{" "}
            <a
              href="https://euipo.europa.eu/ec2/search/find?language=en&text=&niceClass=&size=25&page=1&harmonised=true&officeList=PH&searchMode=WORDSPREFIX&sortBy=relevance"
              target="_blank"
              rel="noopener noreferrer"
              className="tm-link"
            >
              Harmonised Database for Nice Classification
            </a>
          </label>
        </div>

        <div className="tm-field">
          <textarea
            className="tm-textarea"
            value={goodsServices}
            onChange={(e) => setGoodsServices(e.target.value)}
            placeholder="Enter goods and/or services..."
            rows="6"
          />
        </div>

        <div className="tm-field">
          <button type="button" className="tm-search-button" onClick={() => console.log("Search clicked")}>
            Search
          </button>
          <button type="button" className="tm-provide-list-button" onClick={() => setProvideListModalOpen(true)}>
            I want to provide my list
          </button>
        </div>

        {savedClassTerms.length > 0 && (
          <div className="tm-goods-services-table-container">
            <div className="tm-language-selector">
              <span className="tm-language-label">English</span>
            </div>
            <table className="tm-goods-services-table">
              <thead>
                <tr>
                  <th className="tm-class-column">Class</th>
                  <th>Term(s)</th>
                </tr>
              </thead>
              <tbody>
                {savedClassTerms.map((item) => (
                  <tr key={item.classNum}>
                    <td className="tm-class-cell">{item.classNum}</td>
                    <td className="tm-terms-cell">
                      <div className="tm-terms-content">
                        <span className="tm-term-badge">
                          <svg className="tm-info-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                            <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          {item.terms}
                          <svg className="tm-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          <button 
                            type="button" 
                            className="tm-remove-term-btn" 
                            onClick={() => handleRemoveClassTerm(item.classNum)}
                            aria-label="Remove"
                          >
                            ×
                          </button>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div className="tm-validation-messages">
              <div className="tm-validation-item tm-validation-valid">
                <svg className="tm-validation-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2"/>
                  <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span><strong>Valid:</strong> "Term validated correctly"</span>
              </div>
              <div className="tm-validation-item tm-validation-error">
                <svg className="tm-validation-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2"/>
                  <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span><strong>Not validated:</strong> "A trade mark examiner will ask you to correct classification."</span>
              </div>
              <div className="tm-validation-item tm-validation-warning">
                <svg className="tm-validation-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="2"/>
                  <path d="M12 8v4M12 16h.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span><strong>Please check suggestions. Similar validated terms and alternative classifications are offered.:</strong> "An Examiner will check your classification manually. If reclassification is required, the examination process will be delayed."</span>
              </div>
              <div className="tm-validation-item tm-validation-info">
                <svg className="tm-validation-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#6b7280" strokeWidth="2"/>
                  <path d="M12 16v-4M12 8h.01" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span><strong>Validation not possible.:</strong> "An Examiner will check your classification manually. If reclassification is required, the examination process will be delayed."</span>
              </div>
            </div>
          </div>
        )}

        <div className="tm-modal-footer">
          <button className="tm-previous" type="button" onClick={handleGoodsServicesPrevious}>
            Previous
          </button>
          <button className="tm-next" type="button" onClick={handleGoodsServicesNext}>
            Next
          </button>
        </div>
      </div>
    );
  }

  // Render Step 3: Similarity Report
  if (step === "similarity-report") {
    return (
      <div className="tm-modal-body">
        <div className="tm-section">
          <h2 className="tm-section-title">Similarity report - trade marks that may affect your application.</h2>

          <div className="tm-important-notice">
            <strong>IMPORTANT:</strong> This similarity report is only a preliminary search report and is not legally binding on the
            IPOPHIL. The only purpose of the report is to provide you with a list of possible conflicting marks from the
            database of the IPOPHIL and is designed to assist you in deciding whether or not to proceed with your
            application. The preliminary search is limited to word search only. The{" "}
            <strong>trademark examiner will conduct a more thorough and exhaustive search as part of the examination process.</strong>
          </div>

          <div className="tm-search-result">
            <p>There were no similar marks found.</p>
          </div>
        </div>

        <div className="tm-section">
          <h2 className="tm-section-title">Priority Claim</h2>

          <p className="tm-question">
            Would you like to claim the priority of earlier (an) application/s filed in another office/country in the last
            six(6) months?
          </p>

          <div className="tm-priority-buttons">
            <button
              type="button"
              className={`tm-priority-btn ${priorityClaim === true ? "active" : ""}`}
              onClick={handlePriorityClaimYes}
            >
              Yes
            </button>
            <button
              type="button"
              className={`tm-priority-btn ${priorityClaim === false ? "active" : ""}`}
              onClick={handlePriorityClaimNo}
            >
              No
            </button>
          </div>
          
          {showPriorityForm && (
            <div className="tm-priority-claim-form">
              <div className="tm-priority-form-header">
                <h3 className="tm-priority-form-title">Priority claim</h3>
                <div className="tm-priority-form-actions">
                  <button type="button" className="tm-cancel-btn" onClick={handleCancelPriorityClaim}>Cancel</button>
                  <button type="button" className="tm-add-btn" onClick={handleAddPriorityClaim}>Add</button>
                </div>
              </div>
              
              <div className="tm-field">
                <label className="tm-label">
                  Country/Office of earliest filing <span className="tm-required">*</span>
                </label>
                <select 
                  className="tm-input" 
                  value={priorityCountry}
                  onChange={(e) => setPriorityCountry(e.target.value)}
                >
                  <option value="">Select country</option>
                  <option value="Comoros">Comoros</option>
                  <option value="United States">United States</option>
                  <option value="Japan">Japan</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="China">China</option>
                </select>
                <button type="button" className="tm-create-manually-btn">
                  <span className="tm-plus-icon">+</span>
                  Create manually
                </button>
              </div>
              
              <div className="tm-field">
                <label className="tm-label">
                  Filing date <span className="tm-required">*</span>
                </label>
                <input 
                  type="date" 
                  className="tm-input"
                  value={priorityFilingDate}
                  onChange={(e) => setPriorityFilingDate(e.target.value)}
                />
              </div>
              
              <div className="tm-field">
                <label className="tm-label">Filing number</label>
                <input 
                  type="text" 
                  className="tm-input"
                  value={priorityFilingNumber}
                  onChange={(e) => setPriorityFilingNumber(e.target.value)}
                />
              </div>
              
              <div className="tm-field">
                <label className="tm-label">Copy of first filing</label>
                <div className="tm-radio-group">
                  <label className="tm-radio-label">
                    <input 
                      type="radio" 
                      name="copyOfFiling" 
                      value="now" 
                      checked={copyOfFiling === "now"}
                      onChange={(e) => setCopyOfFiling(e.target.value)}
                    />
                    Attach file now
                  </label>
                  <label className="tm-radio-label">
                    <input 
                      type="radio" 
                      name="copyOfFiling" 
                      value="later" 
                      checked={copyOfFiling === "later"}
                      onChange={(e) => setCopyOfFiling(e.target.value)}
                    />
                    Send file later
                  </label>
                </div>
                {copyOfFiling === "now" && (
                  <button type="button" className="tm-attach-btn">Add file(s)</button>
                )}
              </div>
              
              <div className="tm-field">
                <label className="tm-label">Translation of first filing into the official language of the Office</label>
                <div className="tm-radio-group">
                  <label className="tm-radio-label">
                    <input 
                      type="radio" 
                      name="translationOfFiling" 
                      value="now" 
                      checked={translationOfFiling === "now"}
                      onChange={(e) => setTranslationOfFiling(e.target.value)}
                    />
                    Attach file now
                  </label>
                  <label className="tm-radio-label">
                    <input 
                      type="radio" 
                      name="translationOfFiling" 
                      value="later" 
                      checked={translationOfFiling === "later"}
                      onChange={(e) => setTranslationOfFiling(e.target.value)}
                    />
                    Send file later
                  </label>
                </div>
                {translationOfFiling === "now" && (
                  <button type="button" className="tm-attach-btn">Add file(s)</button>
                )}
              </div>
            </div>
          )}
          
          {priorityClaims.length > 0 && (
            <div className="tm-items-list">
              {priorityClaims.map((claim) => (
                <div key={claim.id} className="tm-item-card">
                  <div className="tm-item-header">
                    <span className="tm-item-label">Priority Claim - {claim.country}</span>
                    <button 
                      className="tm-remove-button" 
                      onClick={() => setPriorityClaims(priorityClaims.filter(c => c.id !== claim.id))}
                    >
                      ×
                    </button>
                  </div>
                  <p className="tm-item-placeholder">
                    Filing date: {claim.filingDate}, Number: {claim.filingNumber}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tm-modal-footer">
          <button className="tm-previous" type="button" onClick={handleSimilarityReportPrevious}>
            Previous
          </button>
          <button
            className="tm-next"
            type="button"
            onClick={handleSimilarityReportNext}
            disabled={priorityClaim === null}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // Render Step 4: Applicant and Representative
  if (step === "applicant-representative") {
    return (
      <div className="tm-modal-body">
        <div className="tm-section">
          <h2 className="tm-section-title">Applicant/s</h2>

          <div className="tm-add-container">
            <button type="button" className="tm-add-button" onClick={() => setShowApplicantForm(true)}>
              <span className="tm-add-icon">+</span> Applicant
            </button>
          </div>

          {showApplicantForm && (
            <div className="tm-applicant-form">
              <div className="tm-applicant-form-header">
                <h3 className="tm-applicant-form-title">
                  <span className="tm-form-step-number">1</span>
                  Applicant details
                </h3>
                <div className="tm-applicant-form-actions">
                  <button type="button" className="tm-cancel-btn" onClick={handleCancelApplicant}>Cancel</button>
                  <button type="button" className="tm-add-btn" onClick={handleAddApplicant}>Add</button>
                </div>
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Applicant Type <span className="tm-required">*</span>
                </label>
                <select 
                  className="tm-input"
                  value={applicantFormData.applicantType}
                  onChange={(e) => handleApplicantTypeChange(e.target.value)}
                >
                  <option value="Business/Company">Business/Company</option>
                  <option value="Individual/Sole Proprietor">Individual/Sole Proprietor</option>
                </select>
              </div>

              {applicantFormData.applicantType === "Business/Company" ? (
                <>
                  <div className="tm-field">
                    <label className="tm-label">
                      Legal name <span className="tm-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="tm-input"
                      value={applicantFormData.legalName}
                      onChange={(e) => handleApplicantFormChange("legalName", e.target.value)}
                    />
                  </div>

                  <div className="tm-field">
                    <label className="tm-label">
                      Country of registration <span className="tm-required">*</span>
                    </label>
                    <select 
                      className="tm-input"
                      value={applicantFormData.countryOfRegistration}
                      onChange={(e) => handleApplicantFormChange("countryOfRegistration", e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Philippines">Philippines</option>
                      <option value="United States">United States</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="tm-field">
                    <label className="tm-label">
                      First name <span className="tm-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="tm-input"
                      value={applicantFormData.firstName}
                      onChange={(e) => handleApplicantFormChange("firstName", e.target.value)}
                    />
                  </div>

                  <div className="tm-field">
                    <label className="tm-label">
                      Surname <span className="tm-required">*</span>
                    </label>
                    <input 
                      type="text" 
                      className="tm-input"
                      value={applicantFormData.surname}
                      onChange={(e) => handleApplicantFormChange("surname", e.target.value)}
                    />
                  </div>

                  <div className="tm-field">
                    <label className="tm-label">
                      Country of Citizenship <span className="tm-required">*</span>
                    </label>
                    <select 
                      className="tm-input"
                      value={applicantFormData.countryOfCitizenship}
                      onChange={(e) => handleApplicantFormChange("countryOfCitizenship", e.target.value)}
                    >
                      <option value="">--SELECT--</option>
                      <option value="Philippines">Philippines</option>
                      <option value="United States">United States</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                    </select>
                  </div>
                </>
              )}

              <div className="tm-field tm-field-row">
                <div className="tm-field-group">
                  <label className="tm-label">Street / Bldg / Brgy / Subd</label>
                  <input 
                    type="text" 
                    className="tm-input"
                    value={applicantFormData.street}
                    onChange={(e) => handleApplicantFormChange("street", e.target.value)}
                  />
                </div>
                <div className="tm-field-group">
                  <label className="tm-label">Number</label>
                  <input 
                    type="text" 
                    className="tm-input"
                    value={applicantFormData.number}
                    onChange={(e) => handleApplicantFormChange("number", e.target.value)}
                  />
                </div>
              </div>

              <div className="tm-field tm-field-row">
                <div className="tm-field-group">
                  <label className="tm-label">Post code</label>
                  <input 
                    type="text" 
                    className="tm-input"
                    value={applicantFormData.postCode}
                    onChange={(e) => handleApplicantFormChange("postCode", e.target.value)}
                  />
                </div>
                <div className="tm-field-group">
                  <label className="tm-label">Town/City</label>
                  <input 
                    type="text" 
                    className="tm-input"
                    value={applicantFormData.city}
                    onChange={(e) => handleApplicantFormChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Country <span className="tm-required">*</span>
                </label>
                <select 
                  className="tm-input"
                  value={applicantFormData.country}
                  onChange={(e) => handleApplicantFormChange("country", e.target.value)}
                >
                  <option value="">--SELECT--</option>
                  <option value="Philippines">Philippines</option>
                  <option value="United States">United States</option>
                  <option value="Japan">Japan</option>
                  <option value="China">China</option>
                </select>
              </div>

              <div className="tm-field">
                <label className="tm-label">Telephone</label>
                <input 
                  type="tel" 
                  className="tm-input"
                  value={applicantFormData.telephone}
                  onChange={(e) => handleApplicantFormChange("telephone", e.target.value)}
                />
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  email <span className="tm-required">*</span>
                </label>
                <input 
                  type="email" 
                  className="tm-input"
                  value={applicantFormData.email}
                  onChange={(e) => handleApplicantFormChange("email", e.target.value)}
                />
              </div>
            </div>
          )}

          {applicants.length > 0 && (
            <div className="tm-items-list">
              {applicants.map((applicant, idx) => (
                <div key={applicant.id} className="tm-item-card">
                  <div className="tm-item-header">
                    <span className="tm-item-label">Applicant #{idx + 1}</span>
                    <button
                      type="button"
                      className="tm-remove-button"
                      onClick={() => setApplicants(applicants.filter(a => a.id !== applicant.id))}
                    >
                      ×
                    </button>
                  </div>
                  <p className="tm-item-placeholder">
                    {applicant.applicantType === "Business/Company" 
                      ? applicant.legalName 
                      : `${applicant.firstName} ${applicant.surname}`}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tm-section">
          <h2 className="tm-section-title">Representative</h2>

          <div className="tm-add-container">
            <button type="button" className="tm-add-button" onClick={handleAddRepresentative}>
              <span className="tm-add-icon">+</span> Representative
            </button>
          </div>

          {showRepresentativeForm && (
            <div className="tm-representative-form">
              <div className="tm-representative-form-header">
                <div className="tm-representative-form-title">
                  <span className="tm-form-step-number">1</span>
                  <h3>Add Representative</h3>
                </div>
                <div className="tm-representative-form-actions">
                  <button type="button" className="tm-form-button tm-cancel-button" onClick={handleCancelRepresentative}>Cancel</button>
                  <button type="button" className="tm-form-button tm-add-form-button" onClick={handleAddRepresentative2}>Add</button>
                </div>
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Type of representative <span className="tm-required">*</span>
                </label>
                <select
                  className="tm-input"
                  value={representativeFormData.representativeType}
                  onChange={(e) => handleRepresentativeTypeChange(e.target.value)}
                >
                  <option value="Employee/Other Representative of Application">Employee/Other Representative of Application</option>
                  <option value="IP Attorney/Agent">IP Attorney/Agent</option>
                </select>
              </div>

              {representativeFormData.representativeType === "IP Attorney/Agent" && (
                <div className="tm-field">
                  <label className="tm-label">
                    Type of Legal Practitioner <span className="tm-required">*</span>
                  </label>
                  <select
                    className="tm-input"
                    value={representativeFormData.typeOfLegalPractitioner}
                    onChange={(e) => handleRepresentativeFormChange("typeOfLegalPractitioner", e.target.value)}
                  >
                    <option value="Professional Practitioner">Professional Practitioner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              )}

              <div className="tm-field">
                <label className="tm-label">
                  First name <span className="tm-required">*</span>
                </label>
                <input
                  type="text"
                  className="tm-input"
                  value={representativeFormData.firstName}
                  onChange={(e) => handleRepresentativeFormChange("firstName", e.target.value)}
                />
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Surname <span className="tm-required">*</span>
                </label>
                <input
                  type="text"
                  className="tm-input"
                  value={representativeFormData.surname}
                  onChange={(e) => handleRepresentativeFormChange("surname", e.target.value)}
                />
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Country of Citizenship <span className="tm-required">*</span>
                </label>
                <select
                  className="tm-input"
                  value={representativeFormData.countryOfCitizenship}
                  onChange={(e) => handleRepresentativeFormChange("countryOfCitizenship", e.target.value)}
                >
                  <option value="">--SELECT--</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>

              {representativeFormData.representativeType === "Employee/Other Representative of Application" && (
                <div className="tm-field">
                  <label className="tm-label">
                    Name of Employer <span className="tm-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.nameOfEmployer}
                    onChange={(e) => handleRepresentativeFormChange("nameOfEmployer", e.target.value)}
                  />
                </div>
              )}

              {representativeFormData.representativeType === "IP Attorney/Agent" && (
                <div className="tm-field">
                  <label className="tm-label">
                    Name of Law/Professional Firm <span className="tm-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.nameOfLawFirm}
                    onChange={(e) => handleRepresentativeFormChange("nameOfLawFirm", e.target.value)}
                  />
                </div>
              )}

              <div className="tm-field tm-field-row">
                <div className="tm-field-group">
                  <label className="tm-label">Street / Bldg / Brgy / Subd</label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.street}
                    onChange={(e) => handleRepresentativeFormChange("street", e.target.value)}
                  />
                </div>
                <div className="tm-field-group">
                  <label className="tm-label">Number</label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.number}
                    onChange={(e) => handleRepresentativeFormChange("number", e.target.value)}
                  />
                </div>
              </div>

              <div className="tm-field tm-field-row">
                <div className="tm-field-group">
                  <label className="tm-label">Post code</label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.postCode}
                    onChange={(e) => handleRepresentativeFormChange("postCode", e.target.value)}
                  />
                </div>
                <div className="tm-field-group">
                  <label className="tm-label">Town/City</label>
                  <input
                    type="text"
                    className="tm-input"
                    value={representativeFormData.city}
                    onChange={(e) => handleRepresentativeFormChange("city", e.target.value)}
                  />
                </div>
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  Country <span className="tm-required">*</span>
                </label>
                <select
                  className="tm-input"
                  value={representativeFormData.country}
                  onChange={(e) => handleRepresentativeFormChange("country", e.target.value)}
                >
                  <option value="">--SELECT--</option>
                  <option value="Philippines">Philippines</option>
                </select>
              </div>

              <div className="tm-field">
                <label className="tm-label">State/Province</label>
                <select
                  className="tm-input"
                  value={representativeFormData.stateProvince}
                  onChange={(e) => handleRepresentativeFormChange("stateProvince", e.target.value)}
                >
                  <option value="">--SELECT--</option>
                </select>
              </div>

              <div className="tm-field">
                <label className="tm-label">Telephone</label>
                <input
                  type="tel"
                  className="tm-input"
                  value={representativeFormData.telephone}
                  onChange={(e) => handleRepresentativeFormChange("telephone", e.target.value)}
                />
              </div>

              <div className="tm-field">
                <label className="tm-label">
                  email <span className="tm-required">*</span>
                </label>
                <input
                  type="email"
                  className="tm-input"
                  value={representativeFormData.email}
                  onChange={(e) => handleRepresentativeFormChange("email", e.target.value)}
                />
              </div>
            </div>
          )}

          {representatives.length > 0 && (
            <div className="tm-items-list">
              {representatives.map((representative, idx) => (
                <div key={representative.id} className="tm-item-card">
                  <div className="tm-item-header">
                    <span className="tm-item-label">Representative #{idx + 1}</span>
                    <button
                      type="button"
                      className="tm-remove-button"
                      onClick={() => handleRemoveRepresentative(representative.id)}
                    >
                      ×
                    </button>
                  </div>
                  <p className="tm-item-placeholder">{representative.firstName} {representative.surname}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="tm-modal-footer">
          <button className="tm-previous" type="button" onClick={handleApplicantRepresentativePrevious}>
            Previous
          </button>
          <button className="tm-next" type="button" onClick={handleApplicantRepresentativeNext}>
            Next
          </button>
        </div>
      </div>
    );
  }

  // Render Step 5: Confirmation
  if (step === "confirmation") {
    return (
      <div className="tm-modal-body">
        <div className="tm-confirmation-header">
          <h2 className="tm-confirmation-title">Confirmation</h2>
          <p className="tm-confirmation-text">Before you submit your trade mark application, please confirm that the details are correct.</p>
        </div>

        {/* Trademark details */}
        <div className="tm-confirmation-section">
          <div className="tm-confirmation-section-header">
            <h3 className="tm-confirmation-section-title">Trademark details</h3>
            <button type="button" className="tm-modify-link">modify</button>
          </div>
          <div className="tm-confirmation-card">
            <div className="tm-confirmation-figurative-item">
              {filePreview && (
                <div className="tm-confirmation-image-container">
                  <img src={filePreview} alt="Figurative mark" className="tm-confirmation-image" />
                </div>
              )}
              <div className="tm-confirmation-content">
                <p className="tm-confirmation-label">Type</p>
                <p className="tm-confirmation-value">Figurative mark</p>
                <p className="tm-confirmation-label">Language</p>
                <p className="tm-confirmation-data">English</p>
              </div>
            </div>
          </div>
        </div>

        {/* Goods and services */}
        <div className="tm-confirmation-section">
          <div className="tm-confirmation-section-header">
            <h3 className="tm-confirmation-section-title">Goods and services</h3>
            <button type="button" className="tm-modify-link">modify</button>
          </div>
          <div className="tm-confirmation-card">
            <p className="tm-confirmation-goods">{goodsServices ? goodsServices.substring(0, 50) + "..." : "No goods/services specified"}</p>
          </div>
        </div>

        {/* Your details */}
        <div className="tm-confirmation-section">
          <div className="tm-confirmation-section-header">
            <h3 className="tm-confirmation-section-title">Your details</h3>
            <button type="button" className="tm-modify-link">modify</button>
          </div>
          <div className="tm-confirmation-card">
            <div className="tm-confirmation-table-wrapper">
              <p className="tm-confirmation-table-label">Representative information</p>
              <table className="tm-confirmation-table">
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
                  {representatives.length > 0 ? (
                    representatives.map((rep, idx) => (
                      <tr key={rep.id}>
                        <td>{idx + 1}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="tm-confirmation-empty">No representatives added</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="tm-confirmation-table-wrapper">
              <p className="tm-confirmation-table-label">Applicant information</p>
              <table className="tm-confirmation-table">
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
                  {applicants.length > 0 ? (
                    applicants.map((app, idx) => (
                      <tr key={app.id}>
                        <td>{idx + 1}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="tm-confirmation-empty">No applicants added</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Claims */}
        <div className="tm-confirmation-section">
          <div className="tm-confirmation-section-header">
            <h3 className="tm-confirmation-section-title">Claims</h3>
            <button type="button" className="tm-modify-link">modify</button>
          </div>
        </div>

        {/* Declarations */}
        <div className="tm-confirmation-declarations">
          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Declaration of Small Entity</h4>
            <p className="tm-declaration-text">
              By ticking off the box, the applicant is making a declaration that their assets are Php 100 million or below. In case the applicant is determined to have assets higher than Php 100 million, the full fee shall be collected.
            </p>
            <label className="tm-checkbox-label">
              <input
                type="checkbox"
                checked={smallEntityDeclaration}
                onChange={(e) => setSmallEntityDeclaration(e.target.checked)}
              />
              <span>Declaration of Small Entity</span>
            </label>
          </div>

          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Priority Examination</h4>
            <p className="tm-declaration-text">
              This is a request for priority examination under Rule 60(4) of the Trademark Regulations. Priority of examination may be granted upon submission of a petition under Rule 60(1) and an examination fee under the requirements under Rule 60(5). The request for priority examination is subject to the payment of an additional fee.
            </p>
            <label className="tm-checkbox-label">
              <input
                type="checkbox"
                checked={priorityExamination}
                onChange={(e) => setPriorityExamination(e.target.checked)}
              />
              <span>Priority Examination</span>
            </label>
          </div>

          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Declaration of Actual Use</h4>
            <p className="tm-declaration-text">
              If the applicant wishes to submit the Declaration of Actual Use (DAU) together with this application, the DAU must be attached and additional filed paid.
            </p>
            <label className="tm-checkbox-label">
              <input
                type="checkbox"
                checked={actualUseDeclaration}
                onChange={(e) => setActualUseDeclaration(e.target.checked)}
              />
              <span>Declaration of Actual Use</span>
            </label>
          </div>

          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Special Power of Attorney</h4>
            <p className="tm-declaration-text">
              If the applicant wishes to submit the Power of Attorney together with this application, the SPA must be attached.
            </p>
            <label className="tm-checkbox-label">
              <input
                type="checkbox"
                checked={specialPowerOfAttorney}
                onChange={(e) => setSpecialPowerOfAttorney(e.target.checked)}
              />
              <span>Special Power of Attorney</span>
            </label>
          </div>

          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Youth Filer</h4>
            <p className="tm-declaration-text">To Avail of the YPL certificate must be attached</p>
            <label className="tm-checkbox-label">
              <input
                type="checkbox"
                checked={youthFiler}
                onChange={(e) => setYouthFiler(e.target.checked)}
              />
              <span>Youth Filer</span>
            </label>
          </div>

          <div className="tm-declaration-item">
            <h4 className="tm-declaration-title">Payor / Payment Details</h4>
            <p className="tm-declaration-text">Enter the payor's name and details. This information will be added in the Official Receipt (O.R.)</p>
            <div className="tm-form-group">
              <label className="tm-label">
                Full name <span className="tm-required">*</span>
              </label>
              <input
                type="text"
                className="tm-input"
                value={payorFullName}
                onChange={(e) => setPayorFullName(e.target.value)}
                placeholder=""
              />
            </div>
            <div className="tm-form-group">
              <label className="tm-label">Additional Payor's detail</label>
              <input
                type="text"
                className="tm-input"
                value={additionalPayor}
                onChange={(e) => setAdditionalPayor(e.target.value)}
                placeholder=""
              />
            </div>
          </div>

          <div className="tm-notice-box">
            <p className="tm-notice-title">NOTICE</p>
            <p className="tm-notice-text">
              Notice: When you click on the Proceed to Payment button, you will be redirected to the payment gateway. Please ensure that you have selected the correct mark type before the selection of the payment method. If you select online payment, you will then be transferred to the bank's payment site. If your application will not appear in the official receipt as requested, you can still use it for reference purpose only. Please remember that the filing date will be used only after your payment has been received by the IPOPHIL.
            </p>
          </div>
        </div>

        <div className="tm-modal-footer">
          <button className="tm-previous" type="button" onClick={handleConfirmationPrevious}>
            Previous
          </button>
          <button className="tm-submit" type="button" onClick={handleConfirmationSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
    }
  };

  const handleClassSelect = (classNum) => {
    if (selectedClass !== null && currentTerms.trim()) {
      setClassTerms({ ...classTerms, [selectedClass]: currentTerms });
    }
    setSelectedClass(classNum);
    setCurrentTerms(classTerms[classNum] || "");
  };

  const handleSaveAndMore = () => {
    if (selectedClass !== null && currentTerms.trim()) {
      const updatedTerms = { ...classTerms, [selectedClass]: currentTerms };
      setClassTerms(updatedTerms);
      setCurrentTerms("");
      setSelectedClass(null);
    }
  };

  const handleProvideListDone = () => {
    let finalTerms = { ...classTerms };
    if (selectedClass !== null && currentTerms.trim()) {
      finalTerms = { ...finalTerms, [selectedClass]: currentTerms };
    }
    
    const formattedList = Object.entries(finalTerms)
      .map(([classNum, terms]) => `Class ${classNum}: ${terms}`)
      .join("\n\n");
    
    const structuredData = Object.entries(finalTerms).map(([classNum, terms]) => ({
      classNum: parseInt(classNum),
      terms: terms
    }));
    
    setGoodsServices(formattedList);
    setSavedClassTerms(structuredData);
    setProvideListModalOpen(false);
    setClassTerms({});
    setCurrentTerms("");
    setSelectedClass(null);
  };
  
  const handleRemoveClassTerm = (classNum) => {
    const updatedTerms = savedClassTerms.filter(item => item.classNum !== classNum);
    setSavedClassTerms(updatedTerms);
    
    const formattedList = updatedTerms
      .map(item => `Class ${item.classNum}: ${item.terms}`)
      .join("\n\n");
    setGoodsServices(formattedList);
  };

  const classes = Array.from({ length: 45 }, (_, i) => i + 1);

  return (
    <>
      {renderStep()}
      
      {provideListModalOpen && (
        <div className="provide-list-overlay" role="dialog" aria-modal="true" aria-label="Provide my list">
          <div className="provide-list-backdrop" onClick={() => setProvideListModalOpen(false)} />
          <div className="provide-list-modal">
            <div className="provide-list-header">
              <h2 className="provide-list-title">Provide my list</h2>
              <button type="button" className="provide-list-close" onClick={() => setProvideListModalOpen(false)} aria-label="Close">
                ×
              </button>
            </div>

            <div className="provide-list-content">
              <div className="provide-list-warning">
                <p>
                  Please be aware that if you provide your own list of goods and services the trade mark{" "}
                  <strong>application process may take longer</strong>.
                </p>
                <p>
                  <strong>NOTE:</strong> It is recommended that filers use the pre-accepted list of goods and services. However, should you prefer to type the goods and services, please remember the following: Do not use <strong>&</strong> instead of <strong>and</strong> or any similar symbols in specifying goods and services. Please use a semicolon (;) to distinguish goods and/or services on your list. Following is an example of how goods and services should be specified:
                </p>
                <p className="provide-list-example">
                  <em>Class 2: Colorants; Mordants; Raw natural resins; Metals in foil and powder form for painters, decorators, printers and artists.</em>
                </p>
              </div>

              <div className="provide-list-section">
                <h3 className="provide-list-section-title">Choose class:</h3>
                <div className="provide-list-classes">
                  {classes.map((num) => (
                    <button
                      key={num}
                      type="button"
                      className={`provide-list-class-btn ${selectedClass === num ? "active" : ""}`}
                      onClick={() => handleClassSelect(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {selectedClass !== null && (
                <div className="provide-list-section">
                  <h3 className="provide-list-section-title">Add your terms within class {selectedClass}</h3>
                  <textarea
                    className="provide-list-textarea"
                    value={currentTerms}
                    onChange={(e) => setCurrentTerms(e.target.value)}
                    placeholder="Enter goods and services for this class..."
                    rows="8"
                  />
                </div>
              )}

              <div className="provide-list-footer">
                <button
                  type="button"
                  className="provide-list-save-more"
                  onClick={handleSaveAndMore}
                  disabled={!selectedClass || !currentTerms.trim()}
                >
                  Save and provide more terms
                </button>
                <button
                  type="button"
                  className="provide-list-done"
                  onClick={handleProvideListDone}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}