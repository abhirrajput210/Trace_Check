// Import necessary libraries and CSS
import React, { useState } from "react";
import "../../styles/individualUser/Singlecertificate.css"; // Import your existing CSS file
import Certiimg from "../../assets/certificate.jpg";

// Import the new CSS class
import "../../styles/landingPage/Singlecertificate.css"; // Update the path as needed

const SingleCertificate = () => {
  const [certificateData] = useState({
    userId: "12345",
    certificateType: "Completion Certificate",
    certificateTitle: "React Development Course",
    issuerName: "Acme University",
  });

  const imageUrl = "/path/to/certificate-image.png";

  const [walletAddress, setWalletAddress] = useState("");
  const [accessList, setAccessList] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const grantAccess = () => {
    if (walletAddress.trim() === "") return;
    setAccessList([...accessList, walletAddress]);
    setWalletAddress("");
    setIsDropdownVisible(true);
  };

  const removeAccess = (address) => {
    const updatedAccessList = accessList.filter((item) => item !== address);
    setAccessList(updatedAccessList);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleInputChange = (e) => {
    setWalletAddress(e.target.value);
    setIsDropdownVisible(e.target.value !== ""); // Show dropdown when input has text
  };

  return (
    <div className="mainDiv">
      <div className="certificate_App appmain">
        <div className="certificate-container">
          <div className="certificate-details">
            <div className="image-containerAdd">
              <img src={Certiimg} alt="Certificate" />
            </div>
          </div>
        </div>

        <div className="access-control-container">
          <div className="left-side">
            {/* Certificate Details */}
            <h3>User ID: {certificateData.userId}</h3>
            <p>Certificate Type: {certificateData.certificateType}</p>
            <p>Certificate Title: {certificateData.certificateTitle}</p>
            <p>Issuer Name: {certificateData.issuerName}</p>
          </div>
        </div>
      </div>

      {/* Add the new div below the existing content */}
      <div className="newdiv">
        {/* Access Control */}
        <div className="acchead">Access Control</div>
        <div className="access-form">
          <div className="input-dropdown-container">
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter Wallet Address"
                value={walletAddress}
                onChange={handleInputChange}
              />
              <button onClick={grantAccess} className="grant-button">
                Grant Access
              </button>
              <button
                className={`toggle-button ${isDropdownVisible ? "open" : ""}`}
                onClick={toggleDropdown}
              >
                &#9660; {/* Downward arrow character */}
              </button>
            </div>
            <ul className={`dropdown-list ${isDropdownVisible ? "open" : ""}`}>
              {accessList.map((address, index) => (
                <li key={index}>
                  <span>{address}</span>
                  <button
                    className="remove-button"
                    onClick={() => removeAccess(address)}
                  >
                    &#10006;
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCertificate;
