import React from "react";
import { useState } from "react";
import UserCertificates from "../components/userDashboard/UserCertificates";
import UserRequests from "../components/userDashboard/UserRequests";
import "../styles/userDashboard/UserDashboard.css";
import logo from "../assets/dummy-user.png";

function UserDashboard(props) {
  console.log("Usr Dashboard------", props.userData);
  // const user = {
  //   id: 'abhishek000097',
  //   name: 'Abhishek',
  //   email: 'abhishek@gmail.com',
  //   walletaddress: '0x4655B0c408Ee7481597Afc26B6730e30593c368E',
  //   profilePhoto: logo,
  // };

  const [displaySection, setDisplaySection] = useState("certificates");

  const handleSectionToggle = (section) => {
    setDisplaySection(section);
  };

  const renderContent = () => {
    if (displaySection === "certificates") {
      return <UserCertificates />;
    } else if (displaySection === "requests") {
      return <UserRequests />;
    }
  };

  return (
    <>
      <div className="container-fluid  user-details-container">
        <div className=" user-details">
          <div className="col-4 col-md-5 d-flex flex-column align-items-center user-details-image">
            <div className="rounded-circle overflow-hidden mb-2 border border-secondary">
              <img
                src={logo}
                alt="User Profile"
                className=" object-fit-cover"
              />
            </div>

            <div>
              <button className="edit-profile-button">Edit Profile</button>
            </div>
          </div>

          <div className="col-8 col-md-5 user-details-info">
            <h1>User Name</h1>
            <h5>login to get email address</h5>
            {/* <h6>{user.id}</h6> */}
            <p>login to get wallet address</p>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{ marginLeft: "-452px", marginTop: "0px" }}
      >
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${
                displaySection === "certificates" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("certificates")}
            >
              My Certificates
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${
                displaySection === "requests" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("requests")}
            >
              Requests
            </button>
          </li>
        </ul>
      </div>

      {renderContent()}
    </>
  );
}

export default UserDashboard;
