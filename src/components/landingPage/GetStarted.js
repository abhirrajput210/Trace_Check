import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Imageget from "../../assets/getstarted1.png"; //
import "../../styles/landingPage/GetStarted.css"; // Import your CSS file

function App() {
  return (
    <div className="container2">
      <div className="row">
        <div className="col-md-6 mb-4 maindiv">
          <img
            className="img2"
            src="https://demo.bosathemes.com/html/educator/assets/img/educator-img12-500px.jpg"
            alt="Random"
          />
          <h3>Individual User </h3>
          <h6>Click here to register yourself as an Individual User</h6>
          <br></br>
          <div className="banner-button">
            <a href="/registration/user" className="button-round-secondary">
              GET STARTED
            </a>
          </div>
        </div>

        <div className="col-md-6 mb-4 maindiv2">
          <h3>Issuing Authority</h3>

          <h6>Click here to register yourself as an Issuing Authority</h6>
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

          <img
            className="img1"
            src="https://demo.bosathemes.com/html/educator/assets/img/educator-img13.jpg"
            alt="Random Image"
          />
          <i aria-hidden="true" className="icon icon-medal1"></i>
        </div>
      </div>
    </div>
  );
}

export default App;
