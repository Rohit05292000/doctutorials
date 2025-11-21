import React, { useState, useEffect, useRef } from "react";
import "./Login.css";

import logo from "../assets/header-logo.svg";
import img1 from "../assets/slide1-28ef5fa6.png";
import img2 from "../assets/slide2-07af1764.png";
import img3 from "../assets/slide3-41cdd860.png";

import Otp from "./Otp";
import { useAuth } from "./AuthProvider";   // ✅ FIXED

const Login = () => {
  const { setIsLoggedIn } = useAuth();      // ✅ FIXED

  const [mobile, setMobile] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [interestedId, setInterestedId] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [error, setError] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const mobileRef = useRef();

  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  // SLIDER
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Auto focus
  useEffect(() => {
    mobileRef.current?.focus();
  }, []);

  // Mark login when OTP opens
  useEffect(() => {
    if (showOtp) {
      setIsLoggedIn(true);
    }
  }, [showOtp, setIsLoggedIn]);

  // Mobile validation
  const validateMobile = (n) => /^[6-9]\d{9}$/.test(n);

  // SUBMIT: Send mobile to API
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setServerMessage("");

    const trimmed = mobile.trim();

    if (!validateMobile(trimmed)) {
      setError("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://svcdev.whitecoats.com/WhiteCoatsCore/doctor/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ countryCode: 91, mobileNo: Number(trimmed) }),
        }
      );

      const text = await response.text();
      const parsed = text ? JSON.parse(text) : null;

      const serviceResp = parsed?.serviceResponse;
      const doctorInfo = Array.isArray(parsed?.doctor)
        ? parsed.doctor[0]
        : null;

      const status = serviceResp?.status?.toUpperCase();
      const message = serviceResp?.message;
      const token = doctorInfo?.otpToken;
      const dId = doctorInfo?.doctorId;

      if (status === "Y") {
        const now = Date.now();
        const sessionValidityMs = 120000;

        localStorage.setItem("sessionToken", token);
        localStorage.setItem("sessionStart", now);
        localStorage.setItem("sessionExpiry", now + sessionValidityMs);
        document.cookie = `session_start=${now}; path=/;`;

        setOtpToken(token);
        setDoctorId(dId);
        setInterestedId("");
        setMobile(trimmed);
        setShowOtp(true);

        setServerMessage(message || "OTP sent successfully");
      } else {
        setServerMessage(message || "No account found with this number");
      }
    } catch (error) {
      setServerMessage("Something went wrong. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show OTP Page
  if (showOtp) {
    return (
      <Otp
        mobile={mobile}
        otpToken={otpToken}
        doctorId={doctorId}
        interestedId={interestedId}
        goBack={() => setShowOtp(false)}
      />
    );
  }

  return (
   <div className="login-container">
  <header className="navbar">
    <div className="nav-left">
      <img src={logo} alt="logo" className="logo-img" />
    </div>

    <nav className="nav-right">
      <a href="#about">About Us</a>
      <a href="#faculty">Faculty</a>
      <a href="#plans">Plans</a>
      <a href="#contact">Contact Us</a>
    </nav>
  </header>

  <div className="main-wrapper">

    <div className="left-content">
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
          ></span>
        ))}
      </div>

      <h2>
        Learn, revise and excel - the ultimate learning platform for your
        medical journey
      </h2>

      <img src={images[current]} className="hero-img" alt="illustration" />
    </div>

    <div className="login-card">
      <h3>Let's Get Started</h3>

      <form onSubmit={handleVerify}>
        <div className="input-row">
          <select className="country-code">
            <option value="+91">IN +91</option>
            <option value="+1">US +1</option>
          </select>

          <input
            type="text"
            maxLength="10"
            placeholder="Enter mobile number"
            ref={mobileRef}    
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <button type="submit" className="verify-btn">
          Verify
        </button>
      </form>

      <p className="policy">Privacy Policy | T&C</p>
    </div>
  </div>
</div>

  );
};

export default Login;