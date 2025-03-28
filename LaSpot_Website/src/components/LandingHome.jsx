import "../css/LandingHome.css";
import React, { useState } from "react";
import { HomeButtons } from "./HomeButtons";
import LoginPop from "./LoginPop";

export function LandingHome() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      {/* =========== HOME SECTION =========== */}
      <section className="home section" id="home">
        <div className="home__container">
          <div className="home__content">
            <h1 className="home__title">LA SPOT</h1>
            <p className="subheading">DLSU-D PARKING SYSTEM</p>
            <p className="description">
              Welcome to La Spot, Lasallians! A parking system catered to
              students and faculty of De La Salle University - Dasmariñas.{" "}
              <br />
              SPOT you’re parking now!
            </p>
            <HomeButtons onLoginClick={() => setIsLoginOpen(true)} />
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
    </>
  );
}
