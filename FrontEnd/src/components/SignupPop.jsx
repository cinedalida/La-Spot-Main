import React, { useState, useRef, useEffect } from "react";
import "../css/SignupPop.css";
import { usePostFetch } from "../customHooks/usePostFetch";

const SignupPop = ({ setIsSignupOpen, setIsLoginOpen }) => {
  const [accountType, setAccountType] = useState(""); // to track selected type
  const [formData, setFormData] = useState({});
  const refs = useRef({});
  const [errors, setErrors] = useState({});

  //Field Configurations

  const fieldConfigs = {
    Student: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "email", placeholder: "Student Email", name: "email" },
      { type: "text", placeholder: "Student Number", name: "studentNum" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      },
      {
        type: "select",
        placeholder: "Vehicle",
        name: "vehicle",
        options: ["Car", "Motorcycle"],
      },
      {
        type: "text",
        placeholder: "License Plate",
        name: "licensePlate"
      }
    ],
    Worker: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "email", placeholder: "Work Email", name: "email" },
      { type: "text", placeholder: "Work ID", name: "workId" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      },
      {
        type: "select",
        placeholder: "Vehicle",
        name: "vehicle",
        options: ["Car", "Motorcycle"],
      },
      {
        type: "text",
        placeholder: "License Plate",
        name: "licensePlate"
      }
    ],
    Admin: [
      { type: "text", placeholder: "First Name", name: "firstName" },
      { type: "text", placeholder: "Last Name", name: "lastName" },
      { type: "text", placeholder: "Admin Code", name: "adminCode" },
      { type: "password", placeholder: "Password", name: "password" },
      {
        type: "password",
        placeholder: "Confirm Password",
        name: "confirmPassword",
      }
    ],
  };

  // Calling Custom Hook for POST Fetch
  const { data: postData, isPending, error, triggerPost } = usePostFetch();


  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      triggerPost("http://localhost:8080/signup", formData);  
    }
  }, [formData]);

  // Commands based on PostData from the Server 
  useEffect(() => {
    if (Object.keys(postData).length > 0) {
      console.log(postData);
      if (postData?.success === true) {
        console.log("Data has been posted successfully")
        setIsSignupOpen(false);
        setIsLoginOpen(true);
      } else {
        console.log("Data has not been posted") 
        const newErrors = {};
        let userId;

        postData.accountType === "Student" ? userId = "studentNum" : userId = "workId";

        if (postData.email ? true : false) {
          console.log("Email already exists in the database");
          newErrors["email"] = true;
          refs.current["email"].value = "";
          refs.current["email"].placeholder = "Email already exists"
        }
        if (postData.userId ? true : false) {
          console.log("User ID already exists in the database")
          newErrors[userId] = true;
          refs.current[userId].value = "";
          refs.current[userId].placeholder = "User ID already exists"
        }
        if (postData.vehicle ? true : false) {
          console.log("Vehicle already exists in the database");
          newErrors["licensePlate"] = true;
          refs.current["licensePlate"].value = "";
          refs.current["licensePlate"].placeholder = "Vehicle already exists"
        }
        setErrors(newErrors);
      } 
    }
  }, [postData])

  // Will Reset the form fields when the account type changes
  useEffect(() => {
    fieldConfigs[accountType]?.forEach((field) => {
      refs.current[field.name].value = "";
      refs.current[field.name].placeholder = field.placeholder;
      setErrors({});
    });
  }, [accountType]);


  

  const handleSubmit = (event) => {
    event.preventDefault();
    

    const namePattern = /^[a-zA-Z]{2,}(?: [a-zA-Z]+)*$/;
    const schoolEmailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@dlsud\.edu\.ph$/;
    const emailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const studIdPattern = /^\d{9}$/;
    const idPattern = /^[a-zA-Z0-9]+(?:[ -]?[a-zA-Z0-9]+)*$/;
    const platePattern = /^(?=(?:.*\d){3,4})(?=(?:.*[A-Z]){3})[A-Z0-9]{6,7}$/;

    const newErrors = {};

    // Field Validation
    fieldConfigs[accountType]?.forEach((field) => {
      if (!refs.current[field.name]?.value) {
        newErrors[field.name] = true;
      }
    });

    //  First Name Validation
    if (namePattern.test(refs.current["firstName"]?.value) === false) {
      newErrors["firstName"] = true;
      refs.current["firstName"].value = "";
      refs.current["firstName"].placeholder = "Invalid Name";
    }

    //  Last Name Validation
    if (namePattern.test(refs.current["lastName"]?.value) === false) {
      newErrors["lastName"] = true;
      refs.current["lastName"].value = "";
      refs.current["lastName"].placeholder = "Invalid Name";
    }

    // Password Validation (Password and Confirm Password must match)
    if ( refs.current["password"]?.value !== refs.current["confirmPassword"]?.value) {
      newErrors["confirmPassword"] = true;
      refs.current["confirmPassword"].value = "";
      refs.current["confirmPassword"].placeholder = "Passwords do not match";
    }

    // Email Validation (Student & Worker)
    if (accountType === "Student" || accountType === "Worker") {
      if (accountType === "Student" && schoolEmailPattern.test(refs.current["email"]?.value) === false) {
        newErrors["email"] = true;
        refs.current["email"].value = "";
        refs.current["email"].placeholder = "Invalid School Email";
      } else if (accountType === "Worker" && emailPattern.test(refs.current["email"]?.value) === false) {
        newErrors["email"] = true;
        refs.current["email"].value = "";
        refs.current["email"].placeholder = "Invalid Email";
      }
    }
    
    // ID Validation (Student & Worker)
    if (accountType === "Student" || accountType === "Worker") {
      if (refs.current["studentNum"]?.value && studIdPattern.test(refs.current["studentNum"]?.value) === false) {
        newErrors["studentNum"] = true;
        refs.current["studentNum"].value = "";
        refs.current["studentNum"].placeholder = "Invalid Student ID";
      } else if (refs.current["workId"]?.value && idPattern.test(refs.current["workId"]?.value) === false) {
        newErrors["workId"] = true;
        refs.current["workId"].value = "";
        refs.current["workId"].placeholder = "Invalid Work ID"
      }
    }
    
    // License Plate Validation
    if (accountType === "Student" || accountType === "Worker") {
      if (refs.current["licensePlate"]?.value && platePattern.test(refs.current["licensePlate"]?.value) === false) {
        newErrors["licensePlate"] = true;
        refs.current["licensePlate"].value = "";
        refs.current["licensePlate"].placeholder = "Invalid License Plate";
      }
    }
    
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {

      if (accountType === "Student" || accountType === "Worker"){
        let userId;
        accountType === "Student" ? userId = "studentNum" : userId = "workId";

        setFormData({
          accountType: accountType,
          firstName: refs.current["firstName"].value,
          lastName: refs.current["lastName"].value,
          email: refs.current["email"].value.toLowerCase(),
          userId: refs.current[userId].value,
          password: refs.current["password"].value,
          vehicle: refs.current["vehicle"].value,
          licensePlate: refs.current["licensePlate"].value
        })
      } else if (accountType === "Admin") {
        setFormData({
          accountType: accountType,
          firstName: refs.current["firstName"].value,
          lastName: refs.current["lastName"].value,
          adminCode: refs.current["adminCode"].value,
          password: refs.current["password"].value
        })
      }

              
    }
  };

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

          <form onSubmit={handleSubmit}>
            <div className="container">
              <select
                name="AccountType"
                id="AccountTypes"
                onChange={(e) => setAccountType(e.target.value)}
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

            {/* Render Inputs Dynamically */}
            {fieldConfigs[accountType]?.map((field, index) =>
              field.type === "select" ? (
                <select
                  key={index}
                  ref={(el) => (refs.current[field.name] = el)}
                  className={`inputField-signup ${
                    errors[field.name] ? "error" : ""
                  }`}
                >
                  <option value="" disabled>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  ref={(el) => (refs.current[field.name] = el)}
                  className={`inputField-signup ${
                    errors[field.name] ? "error" : ""
                  }`}
                />
              )
            )}

            {/* Submit Button */}
            {accountType && (
              <button type="submit" className="submit-button">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPop;
