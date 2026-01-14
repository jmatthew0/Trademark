import React, { useState } from "react";
import "../../Css/TypeOfMarks.css";

export default function ApplicantsAndRepresentative({ onNext, onPrevious }) {
  const [applicants, setApplicants] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [showApplicantForm, setShowApplicantForm] = useState(false);
  const [showRepresentativeForm, setShowRepresentativeForm] = useState(false);

  // Applicant form state
  const [applicantForm, setApplicantForm] = useState({
    applicantType: "Individual/Sole Proprietor",
    firstName: "",
    surname: "",
    countryOfCitizenship: "",
    street: "",
    number: "",
    postCode: "",
    townCity: "",
    country: "",
    telephone: "",
    email: "",
  });

  // Representative form state
  const [representativeForm, setRepresentativeForm] = useState({
    typeOfRepresentative: "Employee/Other Representative",
    firstName: "",
    surname: "",
    countryOfCitizenship: "",
    nameOfEmployer: "",
    street: "",
    number: "",
    postCode: "",
    townCity: "",
    country: "Philippines",
    stateProvince: "",
    telephone: "",
    email: "",
  });

  const handleApplicantInputChange = (e) => {
    const { name, value } = e.target;
    setApplicantForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRepresentativeInputChange = (e) => {
    const { name, value } = e.target;
    setRepresentativeForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddApplicant = () => {
    if (applicantForm.firstName && applicantForm.surname && applicantForm.email) {
      setApplicants((prev) => [...prev, { ...applicantForm, id: Date.now() }]);
      setApplicantForm({
        applicantType: "Individual/Sole Proprietor",
        firstName: "",
        surname: "",
        countryOfCitizenship: "",
        street: "",
        number: "",
        postCode: "",
        townCity: "",
        country: "",
        telephone: "",
        email: "",
      });
      setShowApplicantForm(false);
    } else {
      alert("Please fill in required fields: First name, Surname, and Email");
    }
  };

  const handleCancelApplicant = () => {
    setApplicantForm({
      applicantType: "Individual/Sole Proprietor",
      firstName: "",
      surname: "",
      countryOfCitizenship: "",
      street: "",
      number: "",
      postCode: "",
      townCity: "",
      country: "",
      telephone: "",
      email: "",
    });
    setShowApplicantForm(false);
  };

  const handleAddRepresentative = () => {
    if (representativeForm.firstName && representativeForm.surname && representativeForm.email) {
      setRepresentatives((prev) => [...prev, { ...representativeForm, id: Date.now() }]);
      setRepresentativeForm({
        typeOfRepresentative: "Employee/Other Representative",
        firstName: "",
        surname: "",
        countryOfCitizenship: "",
        nameOfEmployer: "",
        street: "",
        number: "",
        postCode: "",
        townCity: "",
        country: "Philippines",
        stateProvince: "",
        telephone: "",
        email: "",
      });
      setShowRepresentativeForm(false);
    } else {
      alert("Please fill in required fields: First name, Surname, and Email");
    }
  };

  const handleCancelRepresentative = () => {
    setRepresentativeForm({
      typeOfRepresentative: "Employee/Other Representative",
      firstName: "",
      surname: "",
      countryOfCitizenship: "",
      nameOfEmployer: "",
      street: "",
      number: "",
      postCode: "",
      townCity: "",
      country: "Philippines",
      stateProvince: "",
      telephone: "",
      email: "",
    });
    setShowRepresentativeForm(false);
  };

  const handleNext = () => {
    if (applicants.length === 0) {
      alert("Please add at least one applicant");
      return;
    }
    onNext({ applicants, representatives });
  };

  return (
    <div className="applicants-representative-container">
      {/* Applicants Section */}
      <div className="section-wrapper">
        <div className="section-header-tab">
          <h2>Applicant/s</h2>
        </div>

        <div className="collapsible-section">
          <div className="collapsible-header">
            <span className="plus-icon">+</span>
            <span>Applicant</span>
          </div>

          {/* List of added applicants */}
          {applicants.map((applicant, index) => (
            <div key={applicant.id} className="added-item">
              <strong>{index + 1}. {applicant.firstName} {applicant.surname}</strong>
              <p>{applicant.email}</p>
            </div>
          ))}

          {/* Applicant Form */}
          {showApplicantForm ? (
            <div className="form-container">
              <div className="form-number">1</div>
              <h3 className="form-title">Applicant details</h3>

              <div className="form-row">
                <label>
                  Applicant Type <span className="required">*</span>
                </label>
                <select
                  name="applicantType"
                  value={applicantForm.applicantType}
                  onChange={handleApplicantInputChange}
                  className="form-select"
                >
                  <option value="Individual/Sole Proprietor">Individual/Sole Proprietor</option>
                  <option value="Business/Company">Business/Company</option>
                </select>
              </div>

              <div className="form-row">
                <label>
                  First name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={applicantForm.firstName}
                  onChange={handleApplicantInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  Surname <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  value={applicantForm.surname}
                  onChange={handleApplicantInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  Country of Citizenship <span className="required">*</span>
                </label>
                <select
                  name="countryOfCitizenship"
                  value={applicantForm.countryOfCitizenship}
                  onChange={handleApplicantInputChange}
                  className="form-select"
                >
                  <option value="">--SELECT--</option>
                  <option value="PH">Philippines</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="form-row-group">
                <div className="form-row">
                  <label>
                    Street / Bldg / Brgy / Subd <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={applicantForm.street}
                    onChange={handleApplicantInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label>Number</label>
                  <input
                    type="text"
                    name="number"
                    value={applicantForm.number}
                    onChange={handleApplicantInputChange}
                    className="form-input-small"
                  />
                </div>
              </div>

              <div className="form-row-group">
                <div className="form-row">
                  <label>Post code</label>
                  <input
                    type="text"
                    name="postCode"
                    value={applicantForm.postCode}
                    onChange={handleApplicantInputChange}
                    className="form-input-small"
                  />
                </div>
                <div className="form-row">
                  <label>
                    Town/City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="townCity"
                    value={applicantForm.townCity}
                    onChange={handleApplicantInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  Country <span className="required">*</span>
                </label>
                <select
                  name="country"
                  value={applicantForm.country}
                  onChange={handleApplicantInputChange}
                  className="form-select"
                >
                  <option value="">--SELECT--</option>
                  <option value="PH">Philippines</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="form-row">
                <label>Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={applicantForm.telephone}
                  onChange={handleApplicantInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={applicantForm.email}
                  onChange={handleApplicantInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button onClick={handleCancelApplicant} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleAddApplicant} className="add-btn">
                  <span className="plus-icon">+</span> Add
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowApplicantForm(true)} className="add-new-btn">
              <span className="plus-icon">+</span> Add Applicant
            </button>
          )}
        </div>
      </div>

      {/* Representatives Section */}
      <div className="section-wrapper">
        <div className="section-header-tab">
          <h2>Representative</h2>
        </div>

        <div className="collapsible-section">
          <div className="collapsible-header">
            <span className="plus-icon">+</span>
            <span>Representative</span>
          </div>

          <p className="representative-note">
            Add Representative (If a representative is provided, all communication concerning this
            application will be sent to such representative.)
          </p>

          {/* List of added representatives */}
          {representatives.map((rep, index) => (
            <div key={rep.id} className="added-item">
              <strong>{index + 1}. {rep.firstName} {rep.surname}</strong>
              <p>{rep.nameOfEmployer}</p>
              <p>{rep.email}</p>
            </div>
          ))}

          {/* Representative Form */}
          {showRepresentativeForm ? (
            <div className="form-container">
              <div className="form-number">1</div>

              <div className="form-row">
                <label>
                  Type of representative <span className="required">*</span>
                </label>
                <select
                  name="typeOfRepresentative"
                  value={representativeForm.typeOfRepresentative}
                  onChange={handleRepresentativeInputChange}
                  className="form-select"
                >
                  <option value="Employee/Other Representative">Employee/Other Representative</option>
                  <option value="Legal Representative">Legal Representative</option>
                </select>
              </div>

              <div className="form-row">
                <label>
                  First name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={representativeForm.firstName}
                  onChange={handleRepresentativeInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  Surname <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="surname"
                  value={representativeForm.surname}
                  onChange={handleRepresentativeInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  Country of Citizenship <span className="required">*</span>
                </label>
                <select
                  name="countryOfCitizenship"
                  value={representativeForm.countryOfCitizenship}
                  onChange={handleRepresentativeInputChange}
                  className="form-select"
                >
                  <option value="">--SELECT--</option>
                  <option value="PH">Philippines</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="form-row">
                <label>
                  Name of Employer <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nameOfEmployer"
                  value={representativeForm.nameOfEmployer}
                  onChange={handleRepresentativeInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row-group">
                <div className="form-row">
                  <label>
                    Street / Bldg / Brgy / Subd <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={representativeForm.street}
                    onChange={handleRepresentativeInputChange}
                    className="form-input"
                  />
                </div>
                <div className="form-row">
                  <label>Number</label>
                  <input
                    type="text"
                    name="number"
                    value={representativeForm.number}
                    onChange={handleRepresentativeInputChange}
                    className="form-input-small"
                  />
                </div>
              </div>

              <div className="form-row-group">
                <div className="form-row">
                  <label>Post code</label>
                  <input
                    type="text"
                    name="postCode"
                    value={representativeForm.postCode}
                    onChange={handleRepresentativeInputChange}
                    className="form-input-small"
                  />
                </div>
                <div className="form-row">
                  <label>
                    Town/City <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="townCity"
                    value={representativeForm.townCity}
                    onChange={handleRepresentativeInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <label>
                  Country <span className="required">*</span>
                </label>
                <select
                  name="country"
                  value={representativeForm.country}
                  onChange={handleRepresentativeInputChange}
                  className="form-select"
                >
                  <option value="Philippines">Philippines</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>

              <div className="form-row">
                <label>State/Province</label>
                <select
                  name="stateProvince"
                  value={representativeForm.stateProvince}
                  onChange={handleRepresentativeInputChange}
                  className="form-select"
                >
                  <option value="">--SELECT--</option>
                  <option value="Metro Manila">Metro Manila</option>
                  <option value="Cebu">Cebu</option>
                  <option value="Davao">Davao</option>
                </select>
              </div>

              <div className="form-row">
                <label>Telephone</label>
                <input
                  type="text"
                  name="telephone"
                  value={representativeForm.telephone}
                  onChange={handleRepresentativeInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <label>
                  email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={representativeForm.email}
                  onChange={handleRepresentativeInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-actions">
                <button onClick={handleCancelRepresentative} className="cancel-btn">
                  Cancel
                </button>
                <button onClick={handleAddRepresentative} className="add-btn">
                  <span className="plus-icon">+</span> Add
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowRepresentativeForm(true)} className="add-new-btn">
              <span className="plus-icon">+</span> Add Representative
            </button>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="modal-actions">
        <button onClick={onPrevious} className="modal-btn-secondary">
          Previous
        </button>
        <button onClick={handleNext} className="modal-btn-primary">
          Next →
        </button>
      </div>
    </div>
  );
}