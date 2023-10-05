import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Imageget from "../../assets/getstarted1.png"; //
import "../../styles/landingPage/GetStarted.css"; // Import your CSS file

function App() {
  return (
    <div className="container2" id="#getstarted">
      <div className="row">
        <div className="col-md-6 mb-4 maindiv">
          <div className="img_parent">
            <img
              className="img2"
              src="https://demo.bosathemes.com/html/educator/assets/img/educator-img12-500px.jpg"
              alt="Random"
            />
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
            <a href="/registration/user" className="button-round-secondary">
              GET STARTED
            </a>
          </div>
        </div>

        <div className="col-md-6 mb-4 maindiv2">
          <div className="img_parent">
            <img
              className="img1"
              src="https://demo.bosathemes.com/html/educator/assets/img/educator-img13.jpg"
              alt="Random"
            />
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
            <a
              href="/registration/issuing-authority"
              className="button-round-secondary"
            >
              GET STARTED
            </a>
          </div>
          <br></br>

          <i aria-hidden="true" className="icon icon-medal1"></i>
        </div>
      </div>
    </div>
  );
}

export default App;
