import "../css/LoginPop.css";
import React from "react";

const LoginPop = ({ setIsLoginOpen }) => {
  return (
    <div className="login-overlay">
      <div className="login-container">
        {/* Left side: Image */}
        <div className="login-image">
          <img src="/images/LoginImage.png" alt="Parking" />
        </div>

        {/* Right side: Login Form */}
        <div className="login-form">
          {/* Close button */}
          <button className="close-btn" onClick={() => setIsLoginOpen(false)}>
            ✖
          </button>

          {/* Logo and Title */}
          <div className="logo-container">
            <img
              src="/images/LaspotLogo.png"
              alt="logo"
              className="login-logo"
            />
            <h1 className="logo-title">La Spot</h1>
          </div>

          <h2 className="login-title">Login</h2>
          <p className="login-description">
            Enter your email and password to login
          </p>

          {/* Login Form */}
          <form>
            <input type="email" placeholder="Email" className="input-field" />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          {/* Pagination dots */}
          <div className="dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPop;
