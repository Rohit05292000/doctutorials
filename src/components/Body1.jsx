import React, { useState } from "react";
import "./Body.css";
import Header from "./Header";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaPhoneAlt, FaUniversity, FaPen, FaMapMarkerAlt } from "react-icons/fa";


const specializationOptions = {
  "ANAESTHESIOLOGY GROUP": [
    "D.M. Cardiac Anaesthesia",
    "D.M. Neuro Anesthesia",
    "D.M. Organ Transplant Anesthesia and Critical Care",
    "D.M. Paediatric and Neonatal Anaesthesia",
    "DNBSS Cardiac Anaesthesia",
    "DNBSS Neuro Anaesthesia and Critical Care",
  ],
  "ENT GROUP": ["M.CH. Head and Neck Surgery"],
  "MEDICAL GROUP": [
    "D. M. Cardiology",
    "D.M. Clinical Haematology",
    "D.M. Clinical Immunology and Rheumatology",
    "D.M. Critical Care Medicine",
    "D.M. Endocrinology",
    "D.M. Hepatology",
    "D.M. Infectious Disease",
    "D.M. Medical Gastroenterology",
    "D.M. Medical Genetics",
    "D.M. Medical Oncology",
    "D.M. NEPHROLOGY",
    "D.M. Neurology",
    "DNBSS Cardiology",
    "DNBSS Critical Care Medicine",
    "DNBSS Endocrinology",
    "DNBSS Gastroenterology",
  ],
  "MICROBIOLOGY GROUP": ["D.M. Virology"],
  "OBSTETRICS AND GYNAECOLOGY GROUP": [
    "DNBSS Gynaecologic Oncology",
    "M.Ch Reproductive Medicine and Surgery",
    "M.CH. Gynecological Oncology",
  ],
  "ORTHOPAEDICS GROUP": [
    "M.Ch Paediatric Orthopaedics",
    "M.Ch. Hand Surgery",
  ],
  "PAEDIATRIC GROUP": [
    "D.M. Neonatology",
    "D.M. Paediatric Nephrology",
    "D.M. Paediatric Neurology",
    "D.M. Paediatric Oncology",
    "D.M. Paediatrics Cardiology",
    "D.M. Paediatrics Gastroenterology",
    "D.M. Pediatric Hepatology",
    "DNBSS Neonatology",
    "DNBSS Paediatric Neurology",
    "DNBSS Pediatric Cardiology",
    "DNBSS Pediatric Intensive Care",
  ],
  "PATHOLOGY GROUP": ["DM Onco-Pathology"],
  "PHARMACOLOGY GROUP": ["DM Clinical Pharmacology"],
  "PSYCHIATRY GROUP": ["D.M. Geriatric Mental Health"],
  "RADIODIAGNOSIS GROUP": [
    "D.M. Interventional Radiology",
    "D.M. Neuro-Radiology",
    "DNBSS Endovascular and Interventional Radiology",
  ],
  "RESPIRATORY MEDICINE GROUP": ["DM Pulmonology Medicine"],
  "SURGICAL GROUP": [
    "DNBSS Genito Urinary Surgery (Urology)",
    "DNBSS Neuro Surgery",
    "DNBSS Paediatric Surgery",
    "DNBSS Peripheral Vascular Surgery",
    "DNBSS Plastic Surgery",
    "DNBSS Surgical Gastroenterology",
    "DNBSS Surgical Oncology",
    "DNBSS Thoracic Surgery",
    "M.CH. Cardio Vascular and Thoracic Surgery",
    "M.CH. Endocrine Surgery",
    "M.CH. HepatoPancreatto Billary Surgery",
    "M.CH. Neuro Surgery",
    "M.CH. Paediatrics Surgery",
    "M.CH. Plastic and Reconstructuctive Surgery",
    "M.CH. Surgical Gastroenterology",
    "M.CH. Surgical Oncology",
  ],
};

const Body1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    rank: "",
    group: "",
    specialization: "",
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  // Handle Inputs & Reset specialization when group changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "group") {
      setFormData({
        ...formData,
        group: value,
        specialization: "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  // Validations
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter name";
    if (!formData.rank.trim()) newErrors.rank = "Enter valid rank";

    if (!formData.email.trim()) {
      newErrors.email = "Please enter valid email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter valid email";
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    if (!formData.group) newErrors.group = "Select a group";
    if (!formData.specialization)
      newErrors.specialization = "Select specialization";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // API Call
  const callSeatPredictAPI = async () => {
    try {
      const response = await fetch("https://svcp.doctutorials.com/dataInfov2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          serreqid: "/predictSeatSS",
          appversion: "1.0.0.0",
          channelid: "Web",
        },
        body: JSON.stringify({
          gatewayRequest: {
            request: {
              name: formData.name,
              email: formData.email,
              rank: formData.rank,
              qualifyingGroup: formData.group,
              specialization: formData.specialization,
              mobileNo: formData.mobile,
            },
          },
        }),
      });

      const data = await response.json();

      // API main data path
      return data?.gatewayResponse?.response?.seatPredictor || [];
    } catch (err) {
      console.error("API error:", err);
      return [];
    }
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setLoading(true);

    if (validate()) {
      const apiRows = await callSeatPredictAPI();
      setLoading(false);

      if (apiRows.length === 0) {
        setTableData([]);
        setApiError(
          "No seats were allotted for the selected Qualifying Group and Rank."
        );
        return;
      }

      // Convert API data into your table format
      const formatted = apiRows.map((item, index) => ({
        Srno: index + 1,
        rank: item.rank,
        group: item.qualifyingGroup,
        specialization: item.speciality,
        institute: item.allotedInstitute,
      }));

      setTableData(formatted);
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="form-wrapper">
      <Header />

      {/* Info Section */}
      <div className="info-wrapper">
        <p className="info-text">
          <strong>Dear aspirant,</strong>
          <br />
          <br />
          As the NEET PG 2025 results are announced, you must be anxious to
          determine which college you could pursue your Post Graduation at. Kill
          the anxiety in just 2 steps!
          <br />
          <br />
          Select the relevant filters in the form below and enter your Rank and
          Email ID to see which college is waiting for you.
          <br />
          <br />
          <strong>
            We recommend viewing this on a desktop or a tablet for best
            experience.
          </strong>
        </p>
      </div>

      {/* Form Container */}
      <div className="form-container">
        <h2 className="form-title">Check Your Seat Allotment</h2>

        <form className="form-grid" onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="form-field">
            <label>Name *</label>
            <div className="input-box">
              <FaUser className="input-icon" />
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Full Name"
                onChange={handleChange}
              />
            </div>
            {errors.name && <p className="error-msg">{errors.name}</p>}
          </div>

          {/* Mobile */}
          <div className="form-field">
            <label>Mobile *</label>
            <div className="input-box">
              <FaPhoneAlt className="input-icon" />
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                placeholder="Mobile Number"
                onChange={handleChange}
              />
            </div>
            {errors.mobile && <p className="error-msg">{errors.mobile}</p>}
          </div>

          {/* Email */}
          <div className="form-field">
            <label>Email *</label>
            <div className="input-box">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="error-msg">{errors.email}</p>}
          </div>

          {/* Rank */}
          <div className="form-field">
            <label>NEET SS 2024 Rank *</label>
            <div className="input-box">
              <FaPen className="input-icon" />
              <input
                type="text"
                name="rank"
                value={formData.rank}
                placeholder="Rank"
                onChange={handleChange}
              />
            </div>
            {errors.rank && <p className="error-msg">{errors.rank}</p>}
          </div>

          {/* Group */}
          <div className="form-field">
            <label>Qualifying Group *</label>
            <div className="input-box">
              <FaUniversity className="input-icon" />
              <select name="group" value={formData.group} onChange={handleChange}>
                <option value="">-- Select --</option>
                {Object.keys(specializationOptions).map((grp) => (
                  <option key={grp} value={grp}>
                    {grp}
                  </option>
                ))}
              </select>
            </div>
            {errors.group && <p className="error-msg">{errors.group}</p>}
          </div>

          {/* Specialization */}
          <div className="form-field">
            <label>Specialization *</label>
            <div className="input-box">
              <FaUniversity className="input-icon" />
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                disabled={!formData.group}
              >
                <option value="">-- Select --</option>
                {formData.group &&
                  (specializationOptions[formData.group] || []).map((spec, idx) => (
                    <option key={idx} value={spec}>
                      {spec}
                    </option>
                  ))}
              </select>
            </div>
            {errors.specialization && (
              <p className="error-msg">{errors.specialization}</p>
            )}
          </div>

          {/* Submit */}
          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        {/* API error */}
        {apiError && <p className="error-msg">{apiError}</p>}

        {/* Disclaimer */}
        <div className="disclaimer">
          <strong>Disclaimer: Based on</strong>
          <ul>
            <li>NEET PG 2024 allotment list</li>
            <li>All India Quota</li>
            <li>Phase 1 allotment</li>
          </ul>
        </div>

        {/* Results Table */}
        {tableData.length > 0 && (
          <div className="results-table">
            <h2 className="form-title">Your Seat Prediction</h2>

            <table className="styled-table">
              <thead>
                <tr>
                  <th>Srno</th>
                  <th>Rank</th>
                  <th>Group</th>
                  <th>Specialization</th>
                  <th>Institute</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((row) => (
                  <tr key={row.Srno}>
                    <td>{row.Srno}</td>
                    <td>{row.rank}</td>
                    <td>{row.group}</td>
                    <td>{row.specialization}</td>
                    <td>{row.institute}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Body1;