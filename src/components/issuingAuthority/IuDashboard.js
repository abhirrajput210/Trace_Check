import React, { useState } from "react";
import Dashboardimg from "../../assets/userimage.jpg";
import css from "../../styles/landingPage/IuDashboard.css";
import icon from "../../assets/quote.png";

const CertificateGrid = () => (
  <div className="certificate-grid">
    <div className="certificate-row">
      <div className="certificate-card">
        {/* Certificate card content for the first card */}
        <p>This is the first certificate card.</p>
        <img src="" alt="Certificate 1" />
      </div>
      <div className="certificate-card">
        {/* Certificate card content for the second card */}
        <p>This is the second certificate card.</p>
        <img src="" alt="Certificate 2" />
      </div>
    </div>
    <div className="certificate-row">
      <div className="certificate-card">
        {/* Certificate card content for the third card */}
        <p>This is the third certificate card.</p>
        <img src="" alt="Certificate 3" />
      </div>
      <div className="certificate-card">
        {/* Certificate card content for the fourth card */}
        <p>This is the fourth certificate card.</p>
        <img src="" alt="Certificate 4" />c
      </div>
    </div>
  </div>
);

const IuDashboard = () => {
  const dropdownContents = {
    About: (
      <div className="authorbio">
        {/* Existing content for About goes here */}
        <h3 className="about">
          Lampros Tech: A Leading Blockchain Development Company
        </h3>
        <p>
          Passionate professionals who strive to make technology accessible to
          everyone. We have worked for years to make businesses more successful
          using technology and now we want to do the same for blockchain
          technology. We are guided by our strong values of innovation,
          commitment, and trust in the way we partner with our clients. Over the
          years, we have grown into a team of expert web and blockchain
          developers, who transform your ideas into reality. We boast of a
          diverse client portfolio spread across the globe and are the right
          choice of technology partner for you.
        </p>
      </div>
    ),
    "My Certificate": (
      <div className="certificate-content ">
        {/* Content for Issue Certificate dropdown */}
        <CertificateGrid /> {/* Include the CertificateGrid here */}
      </div>
    ),
    Requests: (
      <div className="user-request-content">
        {/* Content for User Request dropdown */}
        <p>This is the Requests content.</p>
      </div>
    ),
  };

  const [selectedDropdown, setSelectedDropdown] = useState("About");

  const handleDropdownChange = (dropdown) => {
    setSelectedDropdown(dropdown);
  };

  return (
    <div className="container3">
      <div className="row">
        <div className="col-lg-5 col-md-12">
          {" "}
          {/* Update column size */}
          <figure style={{ margin: 0, border: "none" }}>
            <img
              className="userimage"
              src={Dashboardimg}
              alt="Icon"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </figure>
          <div className="Issuingname">
            <img
              src={icon}
              alt="Icon"
              className="icon-image"
              style={{ position: "absolute", top: 0, left: 0 }}
            />{" "}
            {/* Icon in the top-left corner */}
            <h3 className="smaller-name">Abhishek Rajput</h3>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="col-lg-7">
          <div className="authorbio">
            <div className="pattern-overlay c-pattern"></div>
            <div className="title-divider"></div>
            <h1 className="author-name">Individual User</h1>
            <div className="social-site-link">
              {/* Add your social media links here */}
            </div>
            <div className="dropdown-section">
              <div className="dropdowns">
                {Object.keys(dropdownContents).map((dropdown) => (
                  <button
                    key={dropdown}
                    className={`dropdown-button ${
                      selectedDropdown === dropdown ? "active" : ""
                    }`}
                    onClick={() => handleDropdownChange(dropdown)}
                  >
                    {dropdown}
                  </button>
                ))}
              </div>
              <div className="dropdown-content">
                {dropdownContents[selectedDropdown]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IuDashboard;
