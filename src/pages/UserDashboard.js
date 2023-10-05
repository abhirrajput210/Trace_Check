import React, { useEffect } from "react";
import { useState } from "react";
import UserCertificates from "../components/userDashboard/UserCertificates";
import UserRequests from "../components/userDashboard/UserRequests";
import "../styles/userDashboard/UserDashboard.css";
import logo from "../assets/dummy-user.png";
import { contractInstance } from "../components/ContractInstance";
import { useAccount } from "wagmi";

function UserDashboard(props) {
  const { address } = useAccount();
  const [userData, setUserData] = useState("");

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const contract = await contractInstance();

        const data = await contract.getUser(address);
        console.log(data);
        if (data) {
          const url = "https://ipfs.io/ipfs/" + data.profileImage;
          console.log(url);
          setUserData({
            email: data.email,
            profileCID: url,
            name: data.name,
            country: data.country,
          });
        }
        const certificates = await contract.getAuthorityCertificate(address);
        console.log(certificates);
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
      <div className="container  user-details-container">
        <div className=" user-details">
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
            <h1>{userData && userData.name}</h1>
            <h5>{userData && userData.email}</h5>
            {/* <h6>{user.id}</h6> */}
            <p>{address ? address : ""}</p>
          </div>
          <div className="edit-profile-button-div">
            <button>Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="dashboard-navbar">
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
                displaySection === "certificates" ? "active" : ""
              }`}
              onClick={() => handleSectionToggle("certificates")}
            >
              My Certificates
            </button>
          </li>
          <li className="dashboard-navbar-item">
            <button
              className={`dashboard-navbar-link ${
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
