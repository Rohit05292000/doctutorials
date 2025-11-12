import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/header-logo.svg";
import iconlogo from "../assets/icon.png";
import adwik from "../assets/adwik.png";
import adit from "../assets/adit.png";
import karteek from "../assets/karteek.png";

import "./Blogs.css";
import "./Aboutus.css";

import {
  FaVideo,
  FaChalkboardTeacher,
  FaQuestionCircle,
  FaClipboardList,
  FaFileAlt,
  FaUserFriends,
  FaChartBar,
  FaTools,
  FaMobileAlt
} from "react-icons/fa";

const Aboutus = () => {
  const [open, setOpen] = useState(null);

  const toggleMenu = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <>
      {/* ✅ NAVBAR MERGED HERE */}
      <nav className="navbar">
        {/* LEFT — LOGO */}
        <div className="nav-left">
          <img src={logo} alt="DocTutorials" className="nav-logo" />
        </div>

        {/* CENTER — MENU */}
        <ul className="nav-menu">

          <li>About us</li>
          <li>Faculty</li>

          {/* COURSES DROPDOWN */}
          <li className="dropdown" onClick={() => toggleMenu("courses")}>
            Courses <FaChevronDown className="down-icon" />

            {open === "courses" && (
              <div className="dropdown-box">
                <a>MBBS CURRICULUM</a>
                <a>NEET PG</a>
                <a>INI CET</a>
                <a>FMGE</a>
                <a>PG RESIDENCY</a>
                <a>NEET SS</a>
                <a>INI SS</a>
                <a>Fellowship</a>
              </div>
            )}
          </li>

          <li>Plans</li>
          <li>DTLC</li>

          {/* SEAT PREDICTOR DROPDOWN */}
          <li className="dropdown" onClick={() => toggleMenu("seat")}>
            Seat Predictor <FaChevronDown className="down-icon" />
            {open === "seat" && (
              <div className="dropdown-box small">
                <a>NEET PG</a>
                <a>NEET SS</a>
              </div>
            )}
          </li>

          <li>Contact Us</li>
        </ul>

        {/* RIGHT — LOGIN */}
        <div className="nav-right">
          <button className="login-btn">Login/Signup</button>
        </div>
      </nav>

      {/* ✅ ✅ ✅ ABOUT US CONTENT STARTS HERE ✅ ✅ ✅ */}

      {/* MISSION & VISION */}
      <div className="mv-container">
        <div className="mv-text">
          <h1>Our Mission & Vision</h1>

          <p>
            We at DocTutorials believe{" "}
            <em>
              “combining top-quality education materials with focused
              conceptual training by specialists can make any student achieve
              their dreams”.
            </em>
          </p>

          <p>
            <strong>Our mission </strong>&nbsp;is to revolutionize medical
            learning and empower aspiring doctors by helping them excel in
            medical exams like MBBS-NMC Curriculum, NEET PG, FMGE, PG Residency,
            INI SS, and NEET SS.
          </p>

          <p>
            <strong>Our vision </strong>&nbsp;is to be the foremost online
            medical education platform, recognized for providing unparalleled
            guidance and mentorship.
          </p>
        </div>

        <div className="mv-image-section">
          <img src={iconlogo} alt="Mission Vision Illustration" />
        </div>
      </div>

      {/* WHY CHOOSE */}
      <div className="extra-wrapper">
        <h2 className="extra-title">Why Choose DocTutorials?</h2>
        <p className="extra-subtitle">
          We empower medical aspirants with structured preparation, expert
          guidance, and highly effective study tools.
        </p>
      </div>

      {/* APPROACH */}
      <div className="approach-container">
        <h2 className="approach-title">
          Our Approach To Unlock Your Medical Exam Success
        </h2>

        <p className="approach-subtitle">
          We have designed a multi-faceted coaching approach to provide the best
          learning experience for aspiring medicos like you.
        </p>

        <div className="approach-grid">

          <div className="approach-card">
            <span className="icon orange"><FaVideo /></span>
            <h3>Top Quality Videos</h3>
            <p>Optimize study time with MBBS, NEET PG, FMGE, and INI SS lectures.</p>
          </div>

          <div className="approach-card">
            <span className="icon yellow"><FaChalkboardTeacher /></span>
            <h3>Engaging Live Sessions</h3>
            <p>Learn from case explanations, MCQ discussions, and expert mentorship.</p>
          </div>

          <div className="approach-card">
            <span className="icon purple"><FaQuestionCircle /></span>
            <h3>Dynamic Question Bank</h3>
            <p>Practice exam-style MCQs that match real exam patterns.</p>
          </div>

          <div className="approach-card">
            <span className="icon green"><FaClipboardList /></span>
            <h3>Wide Range of Tests</h3>
            <p>Grand Tests, Elite Tests, and Topic-wise Tests for PG, FMGE & SS exams.</p>
          </div>

          <div className="approach-card">
            <span className="icon pink"><FaFileAlt /></span>
            <h3>Simplified Conceptual Notes</h3>
            <p>Simplified notes available in both soft and hard copy formats.</p>
          </div>

          <div className="approach-card">
            <span className="icon blue"><FaUserFriends /></span>
            <h3>One-On-One Interaction</h3>
            <p>Direct interaction with expert faculty for doubt clearing.</p>
          </div>

          <div className="approach-card">
            <span className="icon sky"><FaChartBar /></span>
            <h3>Everyday Progress</h3>
            <p>Daily quizzes, IMDVs, and leaderboard tracking.</p>
          </div>

          <div className="approach-card">
            <span className="icon rose"><FaTools /></span>
            <h3>Training Tools</h3>
            <p>Enhance retention with modern learning tools.</p>
          </div>

          <div className="approach-card">
            <span className="icon violet"><FaMobileAlt /></span>
            <h3>iOS & Android App</h3>
            <p>Study anytime using the DocTutorials mobile app.</p>
          </div>

        </div>
      </div>

      {/* ✅ LEADERS SECTION */}
      <div className="leaders-section">

        <div className="leaders-title">
          <span className="line"></span>
          Our Leaders
        </div>

        <div className="leaders-grid">

          {/* Leader 1 */}
          <div className="leader-card">
            <div className="leader-img-wrapper">
              <img src={adwik} alt="Adwik" />
            </div>
            <h3 className="leader-name">Adwik Bollineni</h3>
            <p className="leader-role">(Co-Founder, Director – Finance)</p>
            <a href="#" className="linkedin-link">
              <span>&#128279;</span> &nbsp; Adwik Bollineni
            </a>
          </div>

          {/* Leader 2 */}
          <div className="leader-card">
            <div className="leader-img-wrapper">
              <img src={adit} alt="Adit" />
            </div>
            <h3 className="leader-name">Dr Adit Desai</h3>
            <p className="leader-role">(Co-Founder, Director – Business Development)</p>
            <a href="#" className="linkedin-link">
              <span>&#128279;</span> &nbsp; Dr Adit Desai
            </a>
          </div>

          {/* Leader 3 */}
          <div className="leader-card">
            <div className="leader-img-wrapper">
              <img src={karteek} alt="Karteek" />
            </div>
            <h3 className="leader-name">Karteek Routh</h3>
            <p className="leader-role">(Co-Founder, Director – Technology & Operations)</p>
            <a href="#" className="linkedin-link">
              <span>&#128279;</span> &nbsp; Karteek Routh
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Aboutus;
