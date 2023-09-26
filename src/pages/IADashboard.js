import React from "react";
import { useState } from "react";
import IssueCertificate from "../components/issuingAuthority/IssueCertificate";
import TrackAlumni from "../components/issuingAuthority/TrackAlumni";
import IAUserRequest from "../components/issuingAuthority/IAUserRequest";
import VerifyUser from "../components/issuingAuthority/VerifyUser";
import "../styles/issuingAuthority/IADashboard.css";
import logo from "../assets/dummy-user.png";

function IADashboard() {
  const [displaySection, setDisplaySection] = useState("certificates");

  const handleSectionToggle = (section) => {
    setDisplaySection(section);
  };

  const renderContent = () => {
    if (displaySection === "certificates") {
      return <IssueCertificate />;
    } else if (displaySection === "requests") {
      return <IAUserRequest />;
    } else if (displaySection === "trackalumni") {
      return <TrackAlumni />;
    } else if (displaySection === "verifyuser") {
      return <VerifyUser />;
    }
  };

  return (
    <>
      <div className="container-fluid  IA-details-container">
        <div className="IA-details">
          <div className="col-12 col-md-6 d-flex flex-column align-items-center user-details-image">
            <div
              className="rounded-circle overflow-hidden mb-2 border border-secondary"
              style={{ width: "140px", height: "140px" }}
            >
              <img
                src={logo}
                alt="User Profile"
                className="w-100 h-100 object-fit-cover"
              />
            </div>

            <div>
              <button className="IA-edit-profile-button">Edit Profile</button>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <h1>Issuing Authority Name</h1>
            <h5>login to get email address</h5>
            {/* <h6>{user.id}</h6> */}
            <p>login to get wallet address</p>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <ul className="dashboard-navbar">
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
                displaySection === "certificates" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("certificates")}
            >
              Issue Certificates
            </button>
          </li>
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
                displaySection === "requests" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("requests")}
            >
              User Requests
            </button>
          </li>
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
                displaySection === "trackalumni" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("trackalumni")}
            >
              Track Alumni
            </button>
          </li>
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
                displaySection === "verifyuser" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("verifyuser")}
            >
              Verify User
            </button>
          </li>
        </ul>
      </div>

      {renderContent()}
    </>
  );
}

export default IADashboard;
