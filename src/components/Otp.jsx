import React, { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import "./Otp.css";
import logo from "../assets/header-logo.svg";
import { useNavigate } from "react-router-dom";

const Otp = ({ mobile, otpToken, doctorId }) => {
  /* ====== OTP STATE (4 BOXES) ====== */
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /* ====== SLIDER ====== */
  const images = [
    "/slide1-28ef5fa6.png",
    "/slide2-07af1764.png",
    "/slide3-41cdd860.png",
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  /* ====== AUTO FOCUS FIRST OTP BOX ====== */
  useEffect(() => {
    otpRefs.current[0]?.focus();
  }, []);

  /* ====== RESEND TIMER ====== */
  const [timer, setTimer] = useState(25);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = (type) => {
    alert(`OTP resent via ${type.toUpperCase()}`);
    setTimer(25);
    setCanResend(false);
  };

  /* ====== HANDLE OTP DIGIT CHANGE ====== */
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits allowed

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto move forward
    if (value && index < 3) otpRefs.current[index + 1].focus();

    // Auto move backward when cleared
    if (!value && index > 0) otpRefs.current[index - 1].focus();
  };

  /* ====== VERIFY OTP ====== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError1("");
    setError2("");

    const cleanedOtp = otp.join(""); // merge 4 digits

    if (!cleanedOtp) {
      setError1("Enter OTP");
      return;
    }

    if (!/^\d{4,6}$/.test(cleanedOtp)) {
      setError1("OTP should be 4–6 digits");
      return;
    }

    if (!mobile || !otpToken || !doctorId) {
      setError2("Missing data. Cannot verify OTP.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://svcdev.whitecoats.com/WhiteCoatsCore/doctor/verifyOTP",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId,
            countryCode: 91,
            mobileNo: Number(mobile),
            otp: Number(cleanedOtp),
            otpToken,
          }),
        }
      );

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const status = data?.serviceResponse?.status;
      const message = data?.serviceResponse?.message;
      const doctorInfo = data?.doctor?.[0];

      if (status === "Y" && doctorInfo) {
        const {
          sessionToken,
          doctorId,
          firstName,
          lastName,
          emailStr,
          mobileNo,
        } = doctorInfo;

        if (sessionToken) localStorage.setItem("sessionToken", sessionToken);
        if (doctorId) localStorage.setItem("doctorId", doctorId);
        if (firstName) localStorage.setItem("firstName", firstName);
        if (lastName) localStorage.setItem("lastName", lastName);
        if (emailStr) localStorage.setItem("emailStr", emailStr);
        if (mobileNo) localStorage.setItem("mobileNo", mobileNo);

        navigate("/dashboard", { replace: true });
      } else {
        setError2(message || "Invalid OTP");
      }
    } catch (err) {
      setError2("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-main-container">
      {/* NAVBAR */}
      <header className="otp-navbar">
        <div className="nav-left">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
      </header>

      <div className="otp-wrapper">
        {/* LEFT SIDE SLIDER */}
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
            Learn, revise and excel – the ultimate learning platform for your
            medical journey
          </h2>

          <img src={images[current]} className="otp-hero-img" alt="slide" />
        </div>

        {/* RIGHT SIDE OTP CARD */}
        <div className="otp-card">
          <h2>Verify Mobile Number</h2>

          <p className="otp-subtitle">A 4-digit OTP has been sent to</p>

          <div className="mobile-box">
            <span>+91 - {mobile}</span>
            <FaEdit className="edit-icon" onClick={() => window.history.back()} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-box"
                  value={digit}
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e, index)}
                />
              ))}
            </div>

            {error1 && <p className="error-msg">{error1}</p>}
            {error2 && <p className="error-msg2">{error2}</p>}

            <p className="resend-text">
              {canResend ? (
                <>
                  Didn’t receive OTP?{" "}
                  <span className="resend-link" onClick={() => handleResend("SMS")}>
                    Resend SMS
                  </span>{" "}
                  |{" "}
                  <span className="resend-link" onClick={() => handleResend("WhatsApp")}>
                    WhatsApp
                  </span>
                </>
              ) : (
                <>Resend in <span className="timer">{timer}s</span></>
              )}
            </p>

            <button className="submit-otp" disabled={loading}>
              {loading ? "Verifying..." : "Submit OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
