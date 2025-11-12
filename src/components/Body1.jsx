import React, { useState } from "react";
import "./Body.css";
import Header from "./Header";
import Footer from "./Footer";
import { FaUser, FaEnvelope, FaPhoneAlt, FaUniversity, FaPen, FaMapMarkerAlt } from "react-icons/fa";

const Body1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    rank: "",
    course: "",
    specialization: "",
    state: "",
    category: ""
  });

  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);

  // ✅ Form field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // ✅ Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Please enter name";
    if (!formData.rank.trim()) newErrors.rank = "Enter valid rank";

    if (!formData.email.trim()) {
      newErrors.email = "Please enter valid email";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter valid email";
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter valid mobile number";
    }

    if (!formData.course) newErrors.course = "Select a course";
    if (!formData.specialization) newErrors.specialization = "Select specialization";
    if (!formData.state) newErrors.state = "Select state";
    if (!formData.category) newErrors.category = "Select category";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setTableData((prev) => [
        ...prev,
        {
          Srno: prev.length + 1,
          rank: formData.rank,
          course: formData.course,
          specialization: formData.specialization,
          state: formData.state,
          category: formData.category,
          institute: "Will be Updated After API"
        },
      ]);
    }
  };

  return (
   <div className="form-wrapper">
  <Header />

  {/* ✅ Left Info Section */}
   <div className="info-wrapper">
        <p className="info-text">
          <strong>Dear aspirant,</strong><br/><br/>
          As the NEET PG 2025 results are announced, you must be anxious to determine 
          which college you could pursue your Post Graduation at. Kill the anxiety in just 
          2 steps!<br/><br/>
          Select the relevant filters in the form below and enter your Rank and Email ID 
          to see which college is waiting for you. We have collated this according to the 
          seat allotment data post-NEET PG 2024.<br/><br/>
          <strong>We recommend viewing this on a desktop or a tablet for a better experience.</strong>
        </p>
      </div>

  {/* ✅ Right Form */}
  <div className="form-container">
    <h2 className="form-title">Check Your Seat Allotment</h2>

    <form className="form-grid" onSubmit={handleSubmit}>
      {/* ✅ Name */}
      <div className="form-group">
        <label>Name*</label>
        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {errors.name && <p className="error-msg">{errors.name}</p>}
      </div>

      {/* ✅ Mobile */}
      <div className="form-group">
        <label>Mobile Number*</label>
        <div className="input-box">
          <FaPhoneAlt className="icon" />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        {errors.mobile && <p className="error-msg">{errors.mobile}</p>}
      </div>

      {/* ✅ Email */}
      <div className="form-group">
        <label>Email Id*</label>
        <div className="input-box">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {errors.email && <p className="error-msg">{errors.email}</p>}
      </div>

      {/* ✅ Rank */}
      <div className="form-group">
        <label>NEET PG 2025 Rank*</label>
        <div className="input-box">
          <FaPen className="icon" />
          <input
            type="number"
            name="rank"
            placeholder="Rank"
            value={formData.rank}
            onChange={handleChange}
          />
        </div>
        {errors.rank && <p className="error-msg">{errors.rank}</p>}
      </div>

      {/* ✅ Course */}
      <div className="form-group">
        <label>Course*</label>
        <div className="input-box">
          <FaUniversity className="icon" />
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="DNB">DNB</option>
            <option value="MD/MS">MD/MS</option>
          </select>
        </div>
        {errors.course && <p className="error-msg">{errors.course}</p>}
      </div>

      {/* ✅ State */}
      <div className="form-group">
        <label>Select State*</label>
        <div className="input-box">
          <FaMapMarkerAlt className="icon" />
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select Your State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Telangana">Telangana</option>
          </select>
        </div>
        {errors.state && <p className="error-msg">{errors.state}</p>}
      </div>

      {/* ✅ Specialization */}
      <div className="form-group">
        <label>Specialization*</label>
        <div className="input-box">
          <FaUniversity className="icon" />
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="M.D. (BIOCHEMISTRY)">M.D. (BIOCHEMISTRY)</option>
            <option value="M.D. (PAEDIATRICS)">M.D. (PAEDIATRICS)</option>
          </select>
        </div>
        {errors.specialization && <p className="error-msg">{errors.specialization}</p>}
      </div>

      {/* ✅ Category */}
      <div className="form-group">
        <label>Category*</label>
        <div className="input-box">
          <FaUniversity className="icon" />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="OBC">OBC</option>
            <option value="UR">UR</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        {errors.category && <p className="error-msg">{errors.category}</p>}
      </div>

      {/* ✅ Submit Button */}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>

    {/* ✅ Disclaimer */}
    <div className="disclaimer">
      <strong>Disclaimer: Based on</strong>
      <ul>
        <li>NEET PG 2024 allotment list</li>
        <li>All India Quota</li>
        <li>Phase 1 allotment</li>
      </ul>
    </div>

    {/* ✅ Table Display */}
    {tableData.length > 0 && (
      <div className="results-table">
        <h2 className="form-title">Your Seat Prediction</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Srno</th>
              <th>Rank</th>
              <th>Course</th>
              <th>Specialization</th>
              <th>State</th>
              <th>Category</th>
              <th>Institute</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.Srno}</td>
                <td>{row.rank}</td>
                <td>{row.course}</td>
                <td>{row.specialization}</td>
                <td>{row.state}</td>
                <td>{row.category}</td>
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
