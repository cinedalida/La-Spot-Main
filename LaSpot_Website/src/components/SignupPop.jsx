import "../css/SignupPop.css";
import React, { useState, useRef } from "react";
// IMPORT CSS OF 3 FUNCTIONS

const SignupPop = ({ setIsSignupOpen }) => {
  const [accountType, SetAccountType] = useState(""); // to track selected type

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
                defaultValue=""
              >
                <option value="" disabled>
                  Account Type
                </option>
                <option value="Student">Student</option>
                <option value="Worker">Worker</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </form>
          {accountType === "" ? null : accountType === "Student" ? (
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

const SignupStudent = () => {
  //  useRef validation
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const studentNumRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const vehicleRef = useRef(null);
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents form submission
    const newErrors = {}; // Stores errors

    if (!firstNameRef.current.value) newErrors.firstName = true;
    if (!lastNameRef.current.value) newErrors.lastName = true;
    if (!emailRef.current.value) newErrors.email = true;
    if (!studentNumRef.current.value) newErrors.studentNum = true;
    if (!passwordRef.current.value) newErrors.password = true;
    if (!confirmPasswordRef.current.value) newErrors.confirmPassword = true;
    if (passwordRef.current.value !== confirmPasswordRef.current.value)
      newErrors.passwordMismatch = true;
    if (!vehicleRef.current.value) newErrors.vehicle = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form Submitted Successfully!");
    }
  };

  // student return
  return (
    <form className="SelectAccount" onSubmit={handleSubmit}>
      <h2 className="SelectedTitle">Student Signup</h2>
      <input
        type="text"
        placeholder="First Name"
        ref={firstNameRef}
        className={`inputField-signup ${errors.firstName ? "error" : ""}`}
      />
      <input
        type="text"
        placeholder="Last Name"
        ref={lastNameRef}
        className={`inputField-signup ${errors.lastName ? "error" : ""}`}
      />
      <input
        type="email"
        placeholder="Student Email"
        ref={emailRef}
        className={`inputField-signup ${errors.email ? "error" : ""}`}
      />
      <input
        type="text"
        placeholder="Student Number"
        ref={studentNumRef}
        className={`inputField-signup ${errors.studentNum ? "error" : ""}`}
      />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        className={`inputField-signup ${errors.password ? "error" : ""}`}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        ref={confirmPasswordRef}
        className={`inputField-signup ${
          errors.confirmPassword || errors.passwordMismatch ? "error" : ""
        }`}
      />
      <select ref={vehicleRef} className={errors.vehicle ? "error" : ""}>
        <option value="" disabled selected>
          Vehicle
        </option>
        <option value="car">Car</option>
        <option value="motor">Motorcycle</option>
      </select>
      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

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
