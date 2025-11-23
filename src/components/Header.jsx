import React, { useState, useRef, useEffect, useContext } from "react";
import headerLogo from "../assets/header-logo.svg";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import "./Header.css";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false); // Profile menu
  const [open, setOpen] = useState(""); // Seat dropdown menu
  const headerRef = useRef(null); // covers entire header for outside clicks

  // safe toggle (avoids stale state)
  const toggleMenu = (menuName) => {
    setOpen((prev) => (prev === menuName ? "" : menuName));
  };

  // navigation functions
  const goToNeetPG = (e) => {
    e.stopPropagation();
    console.log("goToNeetPG clicked");
    setOpen(""); // close seat dropdown
    navigate("/Body");
  };

  const goToNeetSS = (e) => {
    e.stopPropagation();
    console.log("goToNeetSS clicked");
    setOpen("");
    navigate("/Body1");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
        setOpen("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="logo">
        <img className="img" src={headerLogo} alt="DocTutorials" />
        <h2 className="h2">NEET PG 2025 Seat Predictor</h2>
      </div>

      <ul className="nav-links">
        {/* SEAT PREDICTOR dropdown */}
        <li
          className="dropdown"
          onClick={() => toggleMenu("seat")}
          style={{ position: "relative" }}
        >
          Seat Predictor <FaChevronDown className="down-icon" />

          {open === "seat" && (
            <div
              className="dropdown-box small"
              onClick={(e) => e.stopPropagation()} // prevent parent li click
            >
              {/* use buttons for reliable onClick behavior */}
              <button
                type="button"
                className="dropdown-item"
                onClick={goToNeetPG}
              >
                NEET PG
              </button>

              <button
                type="button"
                className="dropdown-item"
                onClick={goToNeetSS}
              >
                NEET SS
              </button>
            </div>
          )}
        </li>
      </ul>

      {/* PROFILE SECTION */}
      <div className="header-right">
        <div
          className="profile"
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">{user?.name || "Profile"}</span>
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            <button type="button">My Profile</button>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
