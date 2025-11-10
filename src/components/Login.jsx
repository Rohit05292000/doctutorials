import React, { useState, useEffect } from "react";
import "./Login.css";

import logo from "../assets/header-logo.svg";
import img1 from "../assets/slide1-28ef5fa6.png";
import img2 from "../assets/slide2-07af1764.png";
import img3 from "../assets/slide3-41cdd860.png";

import Otp from "./Otp";   

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [showOtp, setShowOtp] = useState(false); 

  const images = [img1, img2, img3];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    setShowOtp(true);
  };

 
  if (showOtp) {
    return <Otp mobile={mobile} goBack={() => setShowOtp(false)} />;
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
