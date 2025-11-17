import React, { useState, useRef, useEffect, useContext } from "react";
import headerLogo from "../assets/header-logo.svg";
import { FaUserCircle } from "react-icons/fa";
import "./Header.css";
import { AuthContext } from "./AuthProvider"; 
const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img className="img" src={headerLogo} alt="DocTutorials" />
        <h2 className="h2">NEET PG 2025 Seat Predictor</h2>
      </div>

      <div className="header-right" ref={menuRef}>
        <div className="profile" onClick={() => setMenuOpen(!menuOpen)}>
          <FaUserCircle className="profile-icon" />
          <span className="profile-name">{user?.name || "Profile"}</span>
        </div>

        {menuOpen && (
          <div className="dropdown-menu">
            <button>My Profile</button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;