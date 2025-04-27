import "../css/SignupButton.css";

export function SignupButton({ onSignupClick }) {
  return (
    <>
      <div className="signup__buttons">
        <button className="btn btn-secondary" onClick={onSignupClick}>
          <div className="button-text">Signup</div>
        </button>
      </div>
    </>
  );
}
