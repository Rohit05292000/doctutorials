import React from "react";
import "./Contact.css";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTelegramPlane,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

import devicesImg from "../assets/g1.webp"; 
import qrImg from "../assets/QRCode-2.webp";
import appStore from "../assets/appstore-apple.png";
import playStore from "../assets/g-play.png";

const Contact = () => {
  return (
    <>
      {/* ✅ CONTACT US SECTION */}
      <div className="contact-page-title">
        <h2>Contact Us</h2>
      </div>

      <div className="contact-wrapper">

        {/* LEFT SECTION */}
        <div className="contact-left">
          <h3>Reach us</h3>
          <p>
            Reach out to us to discover how we can help you prepare better for your MBBS Curriculum,
            NEET PG, FMGE, PG Residency, INI SS, and NEET SS.
          </p>

          <p className="highlight-text">
            Let us make your <strong>MEDICAL DREAMS a REALITY!</strong>
          </p>

          <div className="contact-details">
            <p><FaPhoneAlt /> 7995117755, 7097634567</p>
            <p><FaEnvelope /> help@doctutorials.com</p>
            <p>
              <FaMapMarkerAlt />  
              JIIVI Towers, H.No: 8-2-502/1/A, Rd Number 7, Zahana Nagar,  
              Banjara Hills, Hyderabad, Telangana 500034
            </p>
          </div>

          <div className="social-icons">
            <FaTelegramPlane />
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>

        {/* RIGHT SECTION FORM */}
        <div className="contact-right">

          <div className="course-select">
            <label>Select Course ?</label>

            <div className="radio-group">
              <label><input type="radio" name="course" /> NEET SS</label>
              <label><input type="radio" name="course" /> NEET PG</label>
              <label><input type="radio" name="course" /> FMGE</label>
              <label><input type="radio" name="course" /> MBBS CURRICULUM</label>
              <label><input type="radio" name="course" /> PG RESIDENCY</label>
            </div>
          </div>

          <div className="form-grid">
            <input type="text" placeholder="Name *" />
            <input type="email" placeholder="Email *" />

            <div className="phone-group">
              <select>
                <option>IN +91</option>
                <option>US +1</option>
              </select>
              <input type="text" placeholder="Phone Number *" />
            </div>

            <select className="state-select">
              <option>India</option>
              <option>Andhra Pradesh</option>
              <option>Telangana</option>
              <option>Karnataka</option>
              <option>Tamil Nadu</option>
              <option>Maharastra</option>
              <option>Delhi</option>
              <option>Gujarat</option>
              <option>US</option>
              <option>Australia</option>
              <option>England</option>
            </select>

            <input
              type="text"
              placeholder="Favourite Book / Faculty *"
              className="full-width"
            />

            <textarea placeholder="Leave a message" className="full-width"></textarea>
          </div>

          <button className="send-btn">Send</button>
        </div>
      </div>


      {/* ✅ DOWNLOAD APP SECTION ADDED BELOW */}
      <section className="download-app-section">
        
        {/* LEFT BLOCK */}
        <div className="left-block">
          <h2>Our Courses</h2>
          <ul>
            <li>MBBS Curriculum</li>
            <li>NEET PG</li>
            <li>FMGE</li>
            <li>PG Residency</li>
            <li>NEET SS</li>
            <li>Fellowship</li>
          </ul>

          <h2 className="offline-title">Our Offline Centers</h2>
          <p className="offline-locations">
            Hyderabad | Calicut | Trivandrum
          </p>
        </div>

        {/* MIDDLE (devices image) */}
        <div className="middle-block">
          <img src={devicesImg} alt="Devices Preview" className="devices-img" />
        </div>

        {/* RIGHT BLOCK */}
        <div className="right-block">
          <h2>Scan and download the app</h2>

          <img src={qrImg} alt="QR Code" className="qr-img" />

          <div className="or-text">OR</div>

          <div className="store-buttons">
            <img src={appStore} alt="App Store" />
            <img src={playStore} alt="Google Play" />
          </div>
        </div>

      </section>
    </>
  );
};

export default Contact;
