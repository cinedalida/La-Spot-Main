import { useState, useRef } from "react";
import "../css/ForgotPassword.css";
import BackArrowIcon from "./BackArrowIcon";

const ForgotPassword = ({ goBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inputRefs = useRef({});
  const errorMessage = useRef({});
  const [ errorMsgRefs, setErrorMsgRefs ] = useState("Initial Error Message")
  const [errors, setErrors] = useState({})
  const [isPending, setIsPending] = useState(false);

  const handleCodeChange = (value, index) => {
    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);
  };


  const handleEmailSubmit = async () => {
    const emailPattern = /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    let newErrors = {};
    if (emailPattern.test(email) === false ) {
      newErrors["email"] = true;
      inputRefs.current["email"].placeholder = "Invalid email format"
      setEmail("");
      return;
    } 

    setIsPending(true);

    if (Object.keys(newErrors).length !== 0 ) {
      setErrors(newErrors)
      console.log("Error state", newErrors)
    } else {
      console.log("triggering email validation");

      const response = await fetch("http://localhost:8080/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        newErrors["email"] = false;
        setErrors(newErrors);
        inputRefs.current["email"].placeholder = "Your Email"
        setStep(2);
        setIsPending(false);
      } else {
        newErrors["email"] = true;
        inputRefs.current["email"].placeholder = data.message;
        setEmail("");
        setIsPending(false);
      }
    }
  }


  const handleVerifyCode = async () => {
    const enteredCode = code.join("");

    let newErrors = {};

    if (enteredCode.length !== 5) {
      newErrors["codeErrorMessage"] = true;
      newErrors["code"] = true;
      setErrorMsgRefs("Please enter the full 5-digit code.")
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: enteredCode }),
      });

      const data = await response.json();

      if (response.ok) {
        newErrors["codeErrorMessage"] = false;
        newErrors["code"] = false;
        setErrors(newErrors);
        setStep(3);
      } else {
        newErrors["codeErrorMessage"] = true;
        newErrors["code"] = true;
        setErrorMsgRefs(data.message || "Invalid or expired code.")
        setErrors(newErrors); 
      }
      } catch (err) {
        console.error(err);
        alert("Error verifying code.");
      }
  }

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
            ref={(el) => (inputRefs.current)["email"] = el}
            className={errors["email"] ? "invalid-input" : ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEmailSubmit}>Reset Code</button>
          {isPending && <div className="isPending">Sending email...</div>}
          
        </div>
      )}
      {step === 2 && (
        <div className="step-box">
          <button onClick={() => setStep(1)}>
            <BackArrowIcon />
          </button>
          <h2>Check your email</h2>
          <p>
            We sent a reset link to (email) <strong>{email}</strong> 5 digit code that mentioned in the email
              
          </p>
          <div className="code-inputs">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength="1"
                value={digit}
                // ref={(el) => (inputRefs.current)["code"] = el}
                className={errors["code"] ? "invalid-input" : ""}
                onChange={(e) => handleCodeChange(e.target.value, i)}
              />
            ))}
          </div>
          <div 
            id="verifyErrorMessage"
            className={`verifyErrorMessage ${errors["codeErrorMessage"] ? "show" : ""}`}
            ref={(el) => (errorMessage.current)["codeErrorMessage"] = el}
          >
            {errorMsgRefs}
          </div> 
          <button onClick={handleVerifyCode}>Verify Code</button>
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
