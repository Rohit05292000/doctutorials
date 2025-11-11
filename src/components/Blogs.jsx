import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import logo from "../assets/header-logo.svg";
import "./Blogs.css";

const Blogs = () => {
  const [open, setOpen] = useState(null);

  const toggleMenu = (menu) => {
    setOpen(open === menu ? null : menu);
  };

  return (
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
  );
};

export default Blogs;
