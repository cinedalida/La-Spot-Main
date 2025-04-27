import "../css/LandingHome.css";
import React, { useState } from "react";
import { LoginButton } from "./LoginButton";
import LoginPop from "./LoginPop";
import { SignupButton } from "./Signupbutton";
import SignupPop from "./SignupPop";

export function LandingHome() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  return (
    <>
      {/* =========== HOME SECTION =========== */}
      <section className="home section" id="home">
        <div className="home__container">
          <div className="home__content">
            <h1 className="home__title">LA SPOT</h1>
            <p className="subheading">DLSU-D PARKING SYSTEM</p>
            <p className="description">
              Welcome to La Spot, Lasallians!
              <br /> You're seamless parking experience begins here.
            </p>
            <div className="button-container">
              <LoginButton onLoginClick={() => setIsLoginOpen(true)} />
              <SignupButton onSignupClick={() => setIsSignupOpen(true)} />
            </div>
          </div>

          <div className="home__image">
            <img
              src="images/mainLogo.png"
              alt="mainLogo"
              className="home__mainLogo"
            />
          </div>
        </div>
      </section>

      {/* Show the popup when isLoginOpen is true */}
      {isLoginOpen && <LoginPop setIsLoginOpen={setIsLoginOpen} />}
      {isSignupOpen && <SignupPop setIsSignupOpen={setIsSignupOpen} />}
    </>
  );
}
