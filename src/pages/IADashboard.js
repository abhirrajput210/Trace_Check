import React, { useEffect } from "react";
import { useState } from "react";
import IssueCertificate from "../components/issuingAuthority/IssueCertificate";
import TrackAlumni from "../components/issuingAuthority/TrackAlumni";
import IAUserRequest from "../components/issuingAuthority/IAUserRequest";
import VerifyUser from "../components/issuingAuthority/VerifyUser";
import "../styles/issuingAuthority/IADashboard.css";
import logo from "../assets/dummy-user.png";
import { contractInstance } from "../components/ContractInstance";
import { useAccount } from "wagmi";

function IADashboard() {
  const { address } = useAccount();
  const [userData, setUserData] = useState("");
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
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const contract = await contractInstance();

        const data = await contract.getAuthority(address);
        console.log(data);
        if (data) {
          const url = "https://ipfs.io/ipfs/" + data.profileImage;
          setUserData({
            email: data.email,
            profileCID: url,
            orgName: data.orgName,
            type:
              data.orgType === 0 ? "Educational Institute" : "Corporate Office",
            country: data.country,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (address) {
      fetchProfile();
    }
    return () => {
      setUserData("");
    };
  }, [address]);
  return (
    <>
      <div className="container IA-details-container">
        <div className="IA-details">
          <div className="col-4 col-md-5 d-flex flex-column align-items-center user-details-image">
            <div className="rounded-circle overflow-hidden mb-2 border border-secondary">
              <img
                src={userData.profileCID ? userData.profileCID : logo}
                alt="User Profile"
                className=" object-fit-cover"
              />
            </div>
          </div>

          <div className="col-8 col-md-5 user-details-info">
            <h1>{userData && userData.orgName}</h1>
            <h5>{userData && userData.email}</h5>
            {/* <h6>{user.id}</h6> */}
            <p>{address ? address : ""}</p>
          </div>
          <div className="edit-profile-button-div">
            <button>Edit Profile</button>
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
