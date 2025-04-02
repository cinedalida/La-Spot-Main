import "../css/SignupPop.css";
import React, { useState } from "react";
// IMPORT CSS OF 3 FUNCTIONS

const SignupPop = ({ setIsSignupOpen }) => {
  const [accountType, SetAccountType] = useState(" "); // to track selected type

  return (
    <div className="signup-overlay">
      <div className="signup-container">
        {/* Left side: Image */}
        <div className="signup-image">
          <img src="/images/LoginImage.png" alt="Parking" />
        </div>

        {/* Right side: Signup Form */}
        <div className="signup-form">
          {/* Close button */}
          <button className="close-btn" onClick={() => setIsSignupOpen(false)}>
            ✖
          </button>

          {/* Logo and Title */}
          <div className="logo-container">
            <img
              src="/images/LaspotLogo.png"
              alt="logo"
              className="signup-logo"
            />
            <h1 className="logo-title">La Spot</h1>
          </div>

          <h2 className="signup-title">Signup</h2>

          {/* Show account selection OR the selected form */}
          <p className="signup-description">
            Select account type and fill in your information.
          </p>

          {/* Signup Form overlay*/}
          <form>
            <div className="container">
              <select
                name="AccountType"
                id="AccountTypes"
                onChange={(e) => SetAccountType(e.target.value)}
              >
                <option value=" " disabled selected>
                  Account Type
                </option>
                <option value="Student">Student</option>
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
              </select>

              {/* <button type="button" className="submit-button">
                Next
              </button> */}
            </div>
          </form>
          {accountType === "" ? (
            <></>
          ) : accountType === "Student" ? (
            <SignupStudent />
          ) : accountType === "Worker" ? (
            <SignupWorker />
          ) : accountType === "Admin" ? (
            <SignupAdmin />
          ) : null}
        </div>
      </div>
    </div>
  );
};

const SignupStudent = () => (
  <div className="SelectAccount">
    <h2 className="SelectedTitle">Student Signup</h2>
    <input type="text" placeholder="First Name" className="inputField-signup" />
    <input type="text" placeholder="Last Name" className="inputField-signup" />
    <input
      type="email"
      placeholder="Student Email"
      className="inputField-signup"
    />
    <input
      type="text"
      placeholder="Student Number"
      className="inputField-signup"
    />
    <input
      type="password"
      placeholder="Password"
      className="inputField-signup"
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="inputField-signup"
    />
    <select name="VehicleType">
      <option value=" " disabled selected>
        Vehicle
      </option>
      <option value="car">Car</option>
      <option value="motor">Motorcycle</option>
    </select>
    <button className="submit-button">Submit</button>
  </div>
);

// Worker Signup Form
const SignupWorker = () => (
  <div className="SelectAccount">
    <h2 className="SelectedTitle">Worker Signup</h2>
    <input type="text" placeholder="First Name" className="inputField-signup" />
    <input type="text" placeholder="Last Name" className="inputField-signup" />
    <input
      type="email"
      placeholder="Work Email"
      className="inputField-signup"
    />
    <input type="text" placeholder="Work ID" className="inputField-signup" />
    <input
      type="password"
      placeholder="Password"
      className="inputField-signup"
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="inputField-signup"
    />
    <select name="VehicleType">
      <option value=" " disabled selected>
        Vehicle Type
      </option>
      <option value="car">Car</option>
      <option value="motor">Motorcycle</option>
    </select>
    <button className="submit-button">Submit</button>
  </div>
);

// Admin Signup Form
const SignupAdmin = () => (
  <div className="SelectAccount">
    <h2 className="SelectedTitle"> Admin Signup</h2>
    <input type="text" placeholder="First Name" className="inputField-signup" />
    <input type="text" placeholder="Last Name" className="inputField-signup" />
    <input type="text" placeholder="Admin Code" className="inputField-signup" />
    <input
      type="password"
      placeholder="Password"
      className="inputField-signup"
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="inputField-signup"
    />
    <select name="VehicleType">
      <option value=" " disabled selected>
        Vehicle Type
      </option>
      <option value="car">Car</option>
      <option value="motor">Motorcycle</option>
    </select>
    <button className="submit-button">Submit</button>
  </div>
);

export default SignupPop;
