import React, { useEffect, useRef, useState } from "react";
import "./NeetOtp.css";

const NeetOtp = ({ mobile, onVerified, onCancel }) => {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;

    const temp = [...digits];
    temp[index] = val;
    setDigits(temp);

    if (val && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // ------------------------------
  // 🔵 VERIFY → Send OTP to parent
  // ------------------------------
  const submitOtp = () => {
    const otp = digits.join("");

    if (otp.length !== 4) {
      setError("Please enter 4-digit OTP");
      return;
    }

    setError("");

    // Parent will call the API
    onVerified(otp);
  };

  const handleResend = () => {
    setDigits(["", "", "", ""]);
    inputsRef.current[0]?.focus();
    alert(`OTP resent to ${mobile}`);
  };

  return (
    <div className="otp-backdrop">
      <div className="otp-wrapper">
        <h3 className="otp-title">Verify Mobile Number</h3>

        <div className="otp-inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              className="otp-box"
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        {error && <div className="otp-error">{error}</div>}

        <button className="otp-submit" onClick={submitOtp}>
          Verify OTP
        </button>

        <div className="otp-links">
          <button className="otp-link" onClick={handleResend}>Resend OTP</button>
          {" • "}
          <button className="otp-link" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NeetOtp;
