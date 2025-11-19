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
import Header from "./Header";
import Footer from "./Footer";
import NeetOtp from "./NeetOtp";



const Body = () => {

  const [formData, setFormData] = useState({
    name: "",
    mobileNo: "",
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
  const [, setPendingResults] = useState(null);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [otpError, setOtpError] = useState("");

  const URL = "https://svcp.doctutorials.com/studentv2";

  const specializations = {
  DNB: [
   "(NBEMS) ANAESTHESIOLOGY",
  "(NBEMS) Anatomy",
  "(NBEMS) BIOCHEMISTRY",
  "(NBEMS) Cardio Vascular and Thoracic Surgery (Direct 6 Years Course)",
  "(NBEMS) COMMUNITY MEDICINE",
  "(NBEMS) DERMATOLOGY and VENEREOLOGY and LEPROSY",
  "(NBEMS) Emergency Medicine",
  "(NBEMS) FAMILY MEDICINE",
  "(NBEMS) FORENSIC MEDICINE",
  "(NBEMS) GENERAL MEDICINE",
  "(NBEMS) GENERAL SURGERY",
  "(NBEMS) Geriatric Medicine",
  "(NBEMS) Hospital Administration",
  "(NBEMS) IMMUNO-HAEMATOLOGY AND BLOOD TRANSFUSION",
  "(NBEMS) MICROBIOLOGY",
  "(NBEMS) Neuro Surgery (Direct 6 Years Course)",
  "(NBEMS) NUCLEAR MEDICINE",
  "(NBEMS) Obstetrics and Gynaecology",
  "(NBEMS) OPHTHALMOLOGY",
  "(NBEMS) ORTHOPAEDICS",
  "(NBEMS) Otorhinolaryngology (E.N.T.)",
  "(NBEMS) Paediatric Surgery (Direct 6 Years Course)",
  "(NBEMS) PAEDIATRICS",
  "(NBEMS) Palliative Medicine",
  "(NBEMS) PATHOLOGY",
  "(NBEMS) PHARMACOLOGY",
  "(NBEMS) PHYSICAL MED. And REHABILITATION",
  "(NBEMS) PHYSIOLOGY",
  "(NBEMS) Plastic and Reconstructive Surgery (Direct 6 Years Course)",
  "(NBEMS) PSYCHIATRY",
  "(NBEMS) RADIO-DIAGNOSIS",
  "(NBEMS) Respiratory Medicine",
  "(NBEMS-DIPLOMA) ANAESTHESIOLOGY",
  "(NBEMS-DIPLOMA) FAMILY MEDICINE",
  "(NBEMS-DIPLOMA) Obstetrics and Gynaecology",
  "(NBEMS-DIPLOMA) OPHTHALMOLOGY",
  "(NBEMS-DIPLOMA) Otorhinolaryngology (E.N.T.)",
  "(NBEMS-DIPLOMA) PAEDIATRICS",
  "(NBEMS-DIPLOMA) RADIO-DIAGNOSIS",
  "(NBEMS-DIPLOMA) Tuberculosis and CHEST DISEASES"
  ],

  "MD/MS": [
    "M.D. (ANAESTHESIOLOGY)",
    "M.D. (BIOCHEMISTRY)",
    "M.D. (COMMUNITY HEALTH and ADMN.)",
    "M.D. (DERM., VENE. and LEPROSY)/(DERMATOLOGY)/(SKIN and VENEREAL DISEASES)/(VENEREOLOGY)",
    "M.D. (Emergency and Critical Care)/M.D. (Emergency Medicine)",
    "M.D. (FAMILY MEDICINE)",
    "M.D. (FORENSIC MEDICINE)",
    "M.D. (GENERAL MEDICINE)",
    "M.D. (Hospital Administration)",
    "M.D. (MICROBIOLOGY)",
    "M.D. (Obst. and Gynae)/MS (Obstetrics and Gynaecology)",
    "M.D. (PAEDIATRICS)",
    "M.D. (PALLIATIVE MEDICINE)",
    "M.D. (PATHOLOGY)",
    "M.D. (PHARMACOLOGY)",
    "M.D. (PHYSICAL MED. and REHABILITATION)",
    "M.D. (PHYSIOLOGY)",
    "M.D. (PREVENTIVE and SOCIAL MEDICINE)/COMMUNITY MEDICINE",
    "M.D. (PSYCHIATRY)",
    "M.D. (RADIO-DIAGNOSIS)",
    "M.D. (Radiotherapy/Radiation Oncology)",
    "M.D. (TROPICAL MEDICINE)",
    "M.D. (Tuberculosis and Respiratory diseases)/Pulmonary Medicine /M.D. (Respiratory Medicine)",
    "M.D. GERIATRICS",
    "M.D. IN NUCLEAR MEDICINE",
    "M.D. IN TRANSFUSION MEDICINE/ IMMUNO-HAEMATOLOGY and BLOOD TRANSFUSION",
    "M.D. Laboratory Medicine Course",
    "M.D. Sports Medicine",
    "M.S. (E.N.T.)",
    "M.S. (GENERAL SURGERY)",
    "M.S. (OPHTHALMOLOGY)",
    "M.S. (ORTHOPAEDICS)",
    "M.S. (Traumatology and Surgery)",
    "M.D/MS (Anatomy)",
  ],
};
const statesList = [
  "All India",           "Andaman & Nicobar", "Andhra Pradesh",
  "Arunachal Pradesh",   "Assam",              "Bihar",
  "Chandigarh",          "Chhattisgarh",       "Dadra And Nagar Haveli",
  "Delhi",               "Goa",                "Gujarat",
  "Haryana",             "Himachal Pradesh",   "Jammu And Kashmir",
  "Jharkhand",           "Karnataka",          "Kerala",
  "Madhya Pradesh",      "Maharashtra",        "Manipur",
  "Meghalaya",           "Mizoram",            "Nagaland",
  "Nagar Haveli",        "Odisha",             "Puducherry",
  "Punjab",              "Rajasthan",          "Sikkim",
  "Tamil Nadu",          "Telangana",          "Tripura",
  "Uttar Pradesh",       "Uttarakhand",        "West Bengal"
];


 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  //  1) MAIN API: /predictSeatNEETPG
  // -------------------------------
  const fetchPredictData = async () => {
    const payload = {
      gatewayRequest: {
        request: {
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          rank: formData.rank,
          course: formData.course,
          specialization: formData.specialization,
          state: formData.state,
          category: formData.category
        }
      }
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Channelid: "Web",
        Serreqid: "/predictSeatNEETPG",
        Apiversion: "1.0.0.0",
        Appversion: "1.0.0.0"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  };

  // -------------------------------
  //  2) VERIFY OTP API
  // -------------------------------
  const verifyOtpApi = async (otp) => {
    const payload = {
      gatewayRequest: {
        request: {
          mobileNo: formData.mobileNo,
          otp: otp
        }
      }
    };

    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Channelid: "Web",
        Serreqid: "/predictSeatNEETPGVerifyOTP",
        Apiversion: "1.0.0.0",
        Appversion: "1.0.0.0"
      },
      body: JSON.stringify(payload)
    });

    return await response.json();
  };

  // -----------------------------
  //  FORM SUBMIT
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResults([]);
    setPendingResults(null);

    if (!formData.mobileNo || formData.mobileNo.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetchPredictData();
      const status = res?.gatewayResponse?.status;

      if (!status?.isSuccess) {
        setError(status.message);
        setLoading(false);
        return;
      }

      //  If message == "P" → OTP required
      if (status.message === "P") {
        setShowOtp(true);
        setPendingResults(res);
        setLoading(false);
        return;
      }

      //  Otherwise, show results directly
      const list = res?.gatewayResponse?.response?.seatPredictor || [];
      setResults(list);
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  //  AFTER OTP VERIFY
  // -----------------------------
  const handleOtpVerify = async (otp) => {
  setOtpSending(true);

  try {
    const res = await verifyOtpApi(otp);
    const status = res?.gatewayResponse?.status;

    if (!status?.isSuccess) {
      return status;   // IMPORTANT: return to NeetOtp
    }

    // OTP correct → Fetch results
    const finalRes = await fetchPredictData();
    setResults(finalRes?.gatewayResponse?.response?.seatPredictor || []);

    setShowOtp(false);
    
    return status;     // return success to NeetOtp
  } 
  catch (err) {
    return { isSuccess: false, message: "Something went wrong. Try again." };
  } 
  finally {
    setOtpSending(false);
  }
};

 return (
  <>
    <Header />

    <div className="form-wrapper">

      {/* LEFT INFO SECTION */}
      <div className="info-wrapper">
        <p className="info-text">
          <strong>Dear aspirant,</strong><br /><br />
          As the NEET PG 2025 results are announced, you must be anxious to determine
          which college you could pursue your Post Graduation at. Kill the anxiety in just 2 steps!<br /><br />
          Select the relevant filters in the form below and enter your Rank and Email ID to see which college is waiting for you. 
          We have collated this according to the seat allotment data post-NEET PG 2024.<br /><br />
          <strong>We recommend viewing this on a desktop or a tablet for a better experience.</strong>
        </p>
      </div>

      {/* FORM SECTION — visible when showOtp = false */}
      {!showOtp && (
        <div className="form-container">
          <h2 className="form-title">Check Your Seat Allotment</h2>

          <form className="form-grid" onSubmit={handleSubmit}>

            {/* NAME */}
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

            {/* MOBILE */}
            <div className="form-group">
              <label>Mobile Number*</label>
              <div className="input-box">
                <FaPhone className="icon" />
                <input
                  type="tel"
                  name="mobileNo"
                  placeholder="Mobile No"
                  value={formData.mobileNo}
                  onChange={(e) => {
                    const onlyNums = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, mobileNo: onlyNums });
                  }}
                  maxLength="10"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
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

            {/* RANK */}
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

            {/* COURSE */}
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

            {/* STATE */}
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
                  {statesList.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SPECIALIZATION */}
            <div className="form-group">
              <label>Specialization*</label>
              <div className="input-box">
                <FaUniversity className="icon" />
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  disabled={!formData.course}
                >
                  <option value="">-- Select --</option>
                  {formData.course &&
                    (specializations[formData.course] || []).map((sp, idx) => (
                      <option key={idx} value={sp}>{sp}</option>
                    ))}
                </select>
              </div>
            </div>

            {/* CATEGORY */}
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
                  <option value="EWS">EWS</option>
                  <option value="EWS PwD">EWS PwD</option>
                  <option value="OBC">OBC</option>
                  <option value="OBC PwD">OBC PwD</option>
                  <option value="Open">Open</option>
                  <option value="Open PwD">Open PwD</option>
                  <option value="SC">SC</option>
                  <option value="SC PwD">SC PwD</option>
                  <option value="ST">ST</option>
                  <option value="ST PwD">ST PwD</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Loading…" : "Submit"}
            </button>
          </form>

          {error && <div className="error-msg">{error}</div>}

          {/* RESULTS TABLE */}
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

          <div className="disclaimer">
            <strong>Disclaimer: Based on</strong>
            <ul>
              <li>NEET PG 2024 allotment list</li>
              <li>All India Quota</li>
              <li>Phase 1 allotment</li>
            </ul>
          </div>
        </div>
      )}

      {/* OTP COMPONENT — visible when showOtp = true */}
      {showOtp && (
        <NeetOtp
          mobile={formData.mobileNo}
          onVerified={handleOtpVerify}
          onCancel={()=>setShowOtp(false)}
          otpSending={otpSending}
          errorMessage={otpError}
          verifyOtpApiUrl="https://svcp.doctutorials.com/studentv2"
        />
      )}
    </div>

    <Footer />
  </>
);
}
export default Body;
