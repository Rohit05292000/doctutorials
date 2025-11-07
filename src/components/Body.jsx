import React, { useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaUniversity, 
  FaPen,
  FaMapMarkerAlt 
} from "react-icons/fa";
import "./Body.css";

const Body = () => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("https://svcp.doctutorials.com/studentv2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Server responded with ${response.status}: ${text}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      
      if (data.success) {
        setSuccess("Form submitted successfully!");
      
        setFormData({
          name: "",
          mobile: "",
          email: "",
          rank: "",
          course: "",
          specialization: "",
          state: "",
          category: ""
        });
      } else {
        setError(data.message || "Submission failed");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("There was an error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Check Your Seat Allotment</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
          <label>Name*</label>
          <div className="input-box">
            <FaUniversity className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="form-group">
          <label>Mobile Number*</label>
          <div className="input-box">
            <FaPhone className="icon" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Email Id */}
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
        </div>

        {/* Rank */}
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
        </div>

        {/* Course */}
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
        </div>

        {/* State */}
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
        </div>

        {/* Specialization */}
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
              <option value="(NBEMS) ANAESTHESIOLOGY">(NBEMS) ANAESTHESIOLOGY</option>
              <option value="(NBEMS) PAEDIATRICS">(NBEMS) PAEDIATRICS</option>
            </select>
          </div>
        </div>

        {/* Category */}
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
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting…" : "Submit"}
        </button>
      </form>

      {/* Success / Error messages */}
      {error && <div style={{ color: "red", marginTop: "12px" }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: "12px" }}>{success}</div>}

      <div className="disclaimer">
        <strong>Disclaimer: Based on</strong>
        <ul>
          <li>NEET PG 2024 allotment list</li>
          <li>All India Quota</li>
          <li>Phase 1 allotment</li>
        </ul>
      </div>
    </div>
  );
};

export default Body;
