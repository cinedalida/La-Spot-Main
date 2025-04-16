import React, { useState } from "react";
import "../css/ForgotPassword.css";
import BackArrowIcon from "./BackArrowIcon";

const ForgotPassword = ({ goBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCodeChange = (value, index) => {
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
  };

  return (
    <div className="forgot-password-flow">
      {step === 1 && (
        <div className="step-box">
          <button onClick={goBackToLogin}>
            <BackArrowIcon />
          </button>
          <h2>Forgot Password</h2>
          <p>Please enter your email to reset</p>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={() => setStep(2)}>Reset Password</button>
        </div>
      )}
      {step === 2 && (
        <div className="step-box">
          <button onClick={() => setStep(1)}>
            <BackArrowIcon />
          </button>
          <h2>Check your email</h2>
          <p>
            We sent a reset link to (email) <strong>{email}</strong>
            enter 5 digit code that mentioned in the email
          </p>
          <div className="code-inputs">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(e.target.value, i)}
              />
            ))}
          </div>
          <button onClick={() => setStep(3)}>Verify Code</button>
        </div>
      )}
      {step === 3 && (
        <div className="step-box">
          <button onClick={() => setStep(2)}>
            <BackArrowIcon />
          </button>
          <h2>Password reset</h2>
          <p>Your password has been successfully reset.</p>
          <button onClick={() => setStep(4)}>Confirm</button>
        </div>
      )}
      {step === 4 && (
        <div className="step-box">
          <button onClick={() => setStep(3)}>
            <BackArrowIcon />
          </button>
          <h2>Set a new password</h2>
          <p>Create a new password different from previous ones</p>
          <input
            type="password"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={goBackToLogin}>Update Password</button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
