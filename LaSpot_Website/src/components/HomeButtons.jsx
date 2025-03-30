import "../css/HomeButtons.css";

export function HomeButtons({ onLoginClick, onSignupClick }) {
  return (
    <>
      <div className="home__buttons">
        <button className="btn btn-primary" onClick={onLoginClick}>
          <div class="button-text">Login</div>
        </button>
      </div>
    </>
  );
}
