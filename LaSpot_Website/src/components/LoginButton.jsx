import "../css/LoginButton.css";

export function LoginButton({ onLoginClick }) {
  return (
    <>
      <div className="login__buttons">
        <button className="btn btn-primary" onClick={onLoginClick}>
          <div className="button-text">Login</div>
        </button>
      </div>
    </>
  );
}
