import React from "react";
import "./LandingPage"; // Import your CSS file
import Image from "../assets/landing.png";
import Image2 from "../assets/educator.png";
import Image3 from "../assets/landingimg2.png";
import "../styles/landingPage/LandingPage.css"; // Import the CSS file for this component
import ContentInfo from "../components/issuingAuthority/ContentInfo";
import GetStarted from "../components/landingPage/GetStarted";

function App() {
  return (
    <>
      <section className="home-banner">
        <div className="container">
          <div className="row pt-5 justify-content-center align-items-center">
            {/* Left Banner Content */}
            <div className=" col-md-6 banner-left  h-100">
              <div className="image-overlay pattern-overlay"></div>
              <figure className="image2-opacity">
                <img src={Image2} alt="circle round" />
              </figure>
              <div className="banner-content">
                <div className="banner-title">
                  <h1>Providing Best Education For a Brighter Future</h1>
                </div>
                <div className="banner-text">
                  <h6>
                    Per sed, mattis. Integer viverra euismod maecenas incidunt,
                    phasellus consequatur aliquam nihil temporibus in assumens
                    deserunt convallis. Inceptos per consectetur consequatur
                    proin.
                  </h6>
                </div>
                <div className="banner-button">
                  <a href="/" className="button-round-secondary">
                    LEARN MORE
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
