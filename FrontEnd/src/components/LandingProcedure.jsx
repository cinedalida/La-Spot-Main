import "../css/LandingProcedure.css";

export function LandingProcedure() {
  return (
    <>
      {/* =========== PROCEDURE SECTION =========== */}
      <section className="procedure section" id="procedure">
        <div className="procedure__container">
          <div className="procedure__content">
            <p className="mini__section__title">Procedure</p>
            <p className="mini_section_subheading">
              Can’t find parking spaces? <b>La Spot</b> got you! <br />
              Just follow these steps and you are good to go!
            </p>

            <div className="procedure__card__container">
              <div className="procedure__card1">
                <img
                  src="images/createAcc.png"
                  alt="step1"
                  className="procedure__card__image"
                />
                <p className="procedure__card__title">Create an Account.</p>
                <p className="procedure__card__description">
                  Sign up or log in to your La Spot
                  <br />
                  account to get started.
                </p>
              </div>
              <div className="procedure__card2">
                <img
                  src="images/verify.png"
                  alt="step2"
                  className="procedure__card__image"
                />
                <p className="procedure__card__title">Verify.</p>
                <p className="procedure__card__description">
                  Secure your account by verifying
                  <br />
                  your student number and email.
                </p>
              </div>
              <div className="procedure__card3">
                <img
                  src="images/UseLS.png"
                  alt="step3"
                  className="procedure__card__image"
                />
                <p className="procedure__card__title">Use La Spot!</p>
                <p className="procedure__card__description">
                  Enjoy seamless parking management with La Spot—
                  <br />
                  convenient, fast, and easy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </>
  );
}
