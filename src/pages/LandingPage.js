import React from "react";
import "./LandingPage"; // Import your CSS file
import Image from "../assets/landing.png";
import Image2 from "../assets/educator.png";
import Image3 from "../assets/landingimg2.png";
import "../styles/landingPage/LandingPage.css"; // Import the CSS file for this component
import ContentInfo from "../components/issuingAuthority/ContentInfo";
import GetStarted from "../components/landingPage/GetStarted";
import Imagelanding from "../assets/landingZig.png";
function App() {
  return (
    <>
      <section className="home-banner">
        <div className="container">
          <div className="row pt-5">
            {/* Left Banner Content */}
            <div className="  leftsec col-md-6 banner-left  h-100">
              <div className="image-overlay pattern-overlay">
                <figure className="image2-opacity">
                  <img src={Image2} alt="circle round" />
                  <img
                    className="image3"
                    src={Imagelanding}
                    alt="zig zag lines"
                  />
                </figure>
              </div>
              <div className="banner-content">
                <div className="banner-title">
                  Revolutionizing Background Verification
                  <span className="tick-icon"> ✔</span>{" "}
                  {/* Add the tick icon here */}
                </div>
                <div className="banner-text">
                  <h6>
                    TraceCheck is on a mission to revolutionize the background
                    verification process, providing a secure and decentralized
                    platform for issuing certificates, ensuring trust and
                    empowerment for job seekers and recruiters alike.
                  </h6>
                </div>
                <br></br>
                <div className="banner-button">
                  <a href="#getstarted" className="button-round-secondary">
                    GET STARTED
                  </a>
                </div>
              </div>
            </div>

            {/* Right Banner Content */}
            <div className="col-md-6 banner-right">
              <div className="image-container">
                <img src={Image} alt="" className="banner-img" />
                <img src={Image3} alt="" className="background-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContentInfo />
      <GetStarted />
    </>
  );
}

export default App;
