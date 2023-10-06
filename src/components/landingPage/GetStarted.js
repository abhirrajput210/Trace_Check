import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Imageget from "../../assets/getstarted1.png"; //
import "../../styles/landingPage/GetStarted.css"; // Import your CSS file
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";

function App(props) {
  return (
    <div className="container2" id="getstarted">
      <div className="row">
        <div className="col-md-6 mb-4 maindiv">
          <div className="img_parent">
            <img className="img2" src={img1} alt="Random" />
          </div>
          <h1 className="h1">Individual User </h1>
          <div className="userinfo">
            <ul>
              <div className="h4">As an individual user:</div>
              <li>You can upload verified educational records.</li>
              <li>Request missing certificates.</li>
              <li>Securely share verified credentials with employers.</li>
              <li> Enjoy streamlined job applications and background checks</li>
            </ul>
          </div>{" "}
          <h3 className="h4">
            Click here to register yourself as an Individual User
          </h3>
          <br></br>
          <div className="banner-button">
            <div
              // href="/registration/user"
              className="button-round-secondary get-started"
              onClick={() => props.fetchProfile("user")}
            >
              {props.loading.one ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Get Started"
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4 maindiv2">
          <div className="img_parent">
            <img className="img1" src={img2} alt="Random" />
          </div>
          <h1 className="h1">Issuing Authority</h1>
          <div className="userinfo">
            <ul>
              <h5>As an Issuing Authority :</h5>
              <li>You can validate and issue certificates.</li>
              <li>Maintain employee records and history.</li>
              <li>Assess job candidates through certificate verification.</li>
              <li>
                Track alumni's career successes for stronger connections with
                businesses.
              </li>
            </ul>
          </div>

          <h3 className="h4">
            Click here to register yourself as an Issuing Authority
          </h3>
          <br></br>

          <div className="banner-button">
            <div
              // href="/registration/user"
              className="button-round-secondary get-started"
              onClick={() => props.fetchProfile("authority")}
            >
              {props.loading.two ? (
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Get Started"
              )}
            </div>
          </div>
          <br></br>

          <i aria-hidden="true" className="icon icon-medal1"></i>
        </div>
      </div>
    </div>
  );
}

export default App;
