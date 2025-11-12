import React, { useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaUniversity, 
  FaPen,
  FaMapMarkerAlt,
  FaUser
} from "react-icons/fa";
import "./Body.css";
import Header from "./header";
import Footer from "./Footer";

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
  const [results, setResults] = useState([]);

  const cleanInstitute = (text) => {
    if (!text) return "";
    const parts = text.split(",");
    const unique = [...new Set(parts.map(p => p.trim()))];
    return unique.join(", ");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResults([]);

    const reqId =
      crypto?.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString();

    const payload = {
      candidateRank: formData.rank,
      candidateCategory: formData.category,
      course: formData.course,
      state: formData.state,
      specialization: formData.specialization,
      channelId: "Web",
      serReqId: reqId
    };

    console.log("Final payload being sent:", payload);

    try {
      const response = await fetch("https://svcp.doctutorials.com/studentv2", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "channelId": "Web"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      console.log("API response:", data);

      const list = data?.gatewayResponse?.response?.seatPredictor ?? [];

      if (list.length === 0) {
        setError("No results found for the entered details.");
      }

      const cleaned = list.map(item => ({
        ...item,
        allotedInstitute: cleanInstitute(item.allotedInstitute)
      }));

      setResults(cleaned);

    } catch (err) {
      console.error("Submission error:", err);
      setError("Error fetching results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
    <div className="form-wrapper">

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
                required
              />
            </div>
          </div>

          {/* ✅ Mobile */}
          <div className="form-group">
            <label>Mobile Number*</label>
            <div className="input-box">
              <FaPhone className="icon" />
              <input 
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                pattern="[0-9]{10}"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                required
              />
            </div>
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
                required 
              />
            </div>
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
                required 
              />
            </div>
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
                required
              >
                <option value="">-- Select --</option>
                <option value="DNB">DNB</option>
                <option value="MD/MS">MD/MS</option>
              </select>
            </div>
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
                required
              >
                <option value="">Select Your State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
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
                required
              >
                <option value="">-- Select --</option>
                <option value="M.D. (BIOCHEMISTRY)">M.D. (BIOCHEMISTRY)</option>
                <option value="M.D. (PAEDIATRICS)">M.D. (PAEDIATRICS)</option>
              </select>
            </div>
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
                required
              >
                <option value="">-- Select --</option>
                <option value="OBC">OBC</option>
                <option value="UR">UR</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
              </select>
            </div>
          </div>

          {/* ✅ Submit button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Loading…" : "Submit"}
          </button>
        </form>

        {/* ✅ Error */}
        {error && <div className="error-msg">{error}</div>}

        {/* ✅ Results Table */}
        {results.length > 0 && (
          <div className="results-table">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Sno</th>
                  <th>Rank</th>
                  <th>Alloted Quota</th>
                  <th>Alloted Institute</th>
                  <th>State</th>
                  <th>Course</th>
                  <th>Alloted Category</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.rank}</td>
                    <td>{row.allotedQuota}</td>
                    <td>{row.allotedInstitute}</td>
                    <td>{row.state}</td>
                    <td>{row.course}</td>
                    <td>{row.allotedCategory}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Disclaimer */}
        <div className="disclaimer">
          <strong>Disclaimer: Based on</strong>
          <ul>
            <li>NEET PG 2024 allotment list</li>
            <li>All India Quota</li>
            <li>Phase 1 allotment</li>
          </ul>
        </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Body;
