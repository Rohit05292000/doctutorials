import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import "./Otp.css";
import img1 from "../assets/slide1-28ef5fa6.png";
import img2 from "../assets/slide2-07af1764.png";
import img3 from "../assets/slide3-41cdd860.png";
import logo from "../assets/header-logo.svg";
import { useNavigate } from "react-router-dom";



const Otp = ({ mobile, goBack }) => {
  const navigate = useNavigate();
  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer((x) => x - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      alert("Please enter valid 4 digit OTP");
      return;
    }

    // alert("OTP Submitted: " + otp.join(""));
    console.log(`OTP submitted ${otp}`);
     navigate("/home");
  };

  return (
    <div className="otp-main-container">

      {/* ✅ NAVBAR */}
      <header className="otp-navbar">
        <div className="nav-left">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
      </header>

      <div className="otp-wrapper">

        {/* ✅ LEFT SIDE (Image + Text + Dots) */}
        <div className="otp-left">
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={current === index ? "dot active" : "dot"}
              ></span>
            ))}
          </div>

          <h2 className="otp-left-title">
            Learn, revise and excel - the ultimate learning platform for your
            medical journey
          </h2>

          <img src={images[current]} className="otp-hero-img" alt="slide" />
        </div>

        {/* ✅ RIGHT SIDE OTP BOX */}
        <div className="otp-card">
          <h2>Verify Mobile Number</h2>

          <p className="otp-subtitle">A 4-digit OTP has been sent to</p>

          <div className="mobile-box">
            <span>+91 - {mobile}</span>
            <FaEdit className="edit-icon" onClick={goBack} />
          </div>

          <p className="enter-otp">Enter OTP</p>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="otp-box"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                />
              ))}
            </div>

            <p className="resend-text">
              Didn’t receive OTP? Resend in{" "}
              <span className="timer">{timer}s</span>
            </p>

            <div className="resend-buttons">
              <button type="button" className="sms-btn">📩 SMS</button>
              <button type="button" className="wa-btn">🟢 WhatsApp</button>
            </div>

            <button className="submit-otp">Submit OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
