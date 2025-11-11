import React from "react";
import {
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane,
  FaLinkedin,
  FaFacebook,
  FaPhone
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-left">
          <FaEnvelope className="footer-icon" />
          <span>help@doctutorials.com</span>
        </div>

        {/* CENTER SECTION → MENU + SOCIAL ICONS */}
        <div className="footer-center">
          <div className="footer-menu">
            <a href="#">Blogs</a>
            <a href="#">FAQs</a>
            <a href="#">Terms and conditions</a>
            <a href="#">Contact Us</a>
            <a href="#">Privacy Policy</a>
          </div>

          <div className="footer-social">
            <div className="social-box"><FaInstagram /></div>
            <div className="social-box"><FaYoutube /></div>
            <div className="social-box"><FaTelegramPlane /></div>
            <div className="social-box"><FaLinkedin /></div>
            <div className="social-box"><FaFacebook /></div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-right">
          <FaPhone className="phone-icon" />
          <div>
            <p>H - 8341041247, C - 6282795047</p>
            <p>T - 8848757625 (10 AM TO 7 PM)</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
