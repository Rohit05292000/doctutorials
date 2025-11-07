import React, { useState } from 'react';
import './Login.css';

const Header = () => (
  <header className="page-header">
    <div className="logo">
      <span className="logo-doc">DOC</span>
      <span className="logo-tutorials">TUTORIALS</span>
    </div>
    <nav className="nav-links">
      <a href="#about">About Us</a>
      <a href="#faculty">Faculty</a>
      <a href="#plans">Plans</a>
      <a href="#contact">Contact Us</a>
    </nav>
  </header>
);

const LoginCard = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+91');

  const handleVerify = () => {
    // Handle the verification logic here
    console.log(`Verifying mobile: ${countryCode} ${mobileNumber}`);
  };

  return (
    <div className="card">
      <h2>Let's Get Started</h2>
      <div className="input-box">
        <select 
          value={countryCode} 
          onChange={(e) => setCountryCode(e.target.value)}
        >
          <option value="+91">🇮🇳 +91</option>
          <option value="+1">🇺🇸 +1</option>
        </select>
        <input
          type="tel"
          placeholder="Enter mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
      <button 
        className="verify-btn" 
        onClick={handleVerify}
      >
        Verify
      </button>
      <p className="policy-text">
        <a href="#privacy">Privacy Policy</a> | <a href="#terms">T&C</a>
      </p>
    </div>
  );
};

const Login = () => {
  return (
    <div className="login-page-container">
      <Header />
      <main className="login-wrapper">
        <div className="left-section">
          <p className="tagline">
            Learn, revise and excel - the ultimate learning platform for your medical journey
          </p>
          {/* Placeholder for the complex illustration image */}
          <div className="illustration-placeholder">
         </div>
        </div>
        <div className="right-section">
          <LoginCard />
        </div>
      </main>
    </div>
  );
};

export default Login;