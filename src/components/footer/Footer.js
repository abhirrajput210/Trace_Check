import React from "react";
import "../../styles/footer/Footer.css";

function Footer() {
  return (
    <footer>
      <div className="row">
        <div className="col">
          {/* <img src={logo} alt="logo" className="logo" /> */}
          <p>
            The word Lorem Ipsum is derived from the Latin word which means
            “pain itself”. It is a kind of a text filler tool that is used by
            the webmaster on the website.
          </p>
        </div>
        <div className="col">
          <h3>
            Office{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p style={{ marginBottom: "0" }}>Rajpath Road</p>
          <p style={{ marginBottom: "0" }}>Isckon Cross Road, Ahmedabad</p>
          <p style={{ marginBottom: "0" }}>Gujarat, India PIN 000001</p>
          <p className="email-id">abc@gmail.com</p>
          <h5>+91 - 0123456789</h5>
        </div>
        <div className="col">
          <h3>
            Links
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <ul className="footer-ul">
            <li className="footer-li">
              <a href="/">Home</a>
            </li>
            <li className="footer-li">
              <a href="/">About Us</a>
            </li>
            <li className="footer-li">
              <a href="/">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="col">
          <h3>
            Contact Now{" "}
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <form className="footer-form">
            <i class="fa-regular fa-envelope"></i>
            <input
              className="footer-email"
              type="email"
              placeholder="Enter your email id"
              required
            />
            <button type="submit">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </form>
          <div className="social-icons">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-whatsapp"></i>
            <i class="fa-brands fa-pinterest"></i>
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">TraceCheck @2023 - All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
