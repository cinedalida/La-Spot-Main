import "../css/Footer.css";

export function Footer() {
  return (
    <>
      {/* FOOTER SECTION */}
      <section className="contact section" id="contact-us">
        <div className="contact__container">
          <div className="contact__contents">
            <p className="contact__title">Contact us.</p>
            <p className="contact__description">
              Our vision is to provide convenience
              <br />
              and seamless parking experience.
            </p>
            <div className="contact__socials">
              <a href="#">
                <i className="ri-facebook-fill"></i>
              </a>
              <a href="#">
                <i className="ri-twitter-fill"></i>
              </a>
              <a href="#">
                <i className="ri-instagram-fill"></i>
              </a>
            </div>
          </div>

          {/* CONTACT LINKS */}
          <div className="contact__links">
            <div className="contact__column">
              <h3>About</h3>
              <a href="#">How it works</a>
              <a href="#">Featured</a>
              <a href="#">Partnership</a>
            </div>
            <div className="contact__column">
              <h3>Community</h3>
              <a href="#">Events</a>
              <a href="#">Blog</a>
              <a href="#">Podcast</a>
            </div>
            <div className="contact__column">
              <h3>Socials</h3>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="contact__bottom">
          <p>©2025 La Spot: DLSU-D Parking System</p>
          <div className="contact__legal">
            <a href="#">Privacy & Policy</a>
            <a href="#">Terms & Condition</a>
          </div>
        </div>
      </section>
    </>
  );
}
