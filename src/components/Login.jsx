import React, { useState, useEffect } from "react";
import "./Login.css";

import logo from "../assets/header-logo.svg";
import img1 from "../assets/slide1-28ef5fa6.png";
import img2 from "../assets/slide2-07af1764.png";
import img3 from "../assets/slide3-41cdd860.png";

const Login = () => {
  const [mobile, setMobile] = useState("");

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

    if (!mobile.trim()) {
      alert("Please enter mobile number");
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    alert("Mobile Verified Successfully: " + mobile);
    console.log("Submitted Mobile Number:", mobile);
  };

  return (
    <div className="login-container">

      {/* ✅ Navbar */}
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

      {/* ✅ MAIN SECTION */}
      <div className="main-wrapper">

        {/* ✅ LEFT Section */}
        <div className="left-content">

          {/* ✅ 3 Animated Dots */}
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

          {/* ✅ Auto-changing image */}
          <img src={images[current]} className="hero-img" alt="illustration" />
        </div>

        {/* ✅ LOGIN CARD */}
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
                placeholder="Enter mobile number"
                maxLength="10"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, ""))
                }
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
