import React, { useState } from "react";
import "../../styles/userDashboard/RequestCertificate.css";

function RequestCertificate() {
  const [certificateData, setCertificateData] = useState({
    title: "",
    issuingAuthority: "",
    type: "",
  });

  // Define an array of issuing authorities (replace with dynamic data if needed)
  const issuingAuthorities = [
    "Authority 1",
    "Authority 2",
    "Authority 3",
    // Add more authorities as needed
  ];

  // Handle input change for the dropdown
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCertificateData({
      ...certificateData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="center-form">
      <div className="request-certificate-main-container">
        <div className="request-certificate-registration-container">
          <form className="request-certificate-form" onSubmit={handleSubmit}>
            <div className="request-certificate-registration-header">
              <div className="request-certificate-registration-title">
                Request Certificate
              </div>
            </div>
            <div className="request-certificate-form-group">
              <label htmlFor="title">Certificate Title</label>
              <input
                className="w-100"
                type="text"
                id="title"
                name="title"
                value={certificateData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter Certificate Title*"
              />
            </div>
            <div className="request-certificate-form-group">
              <label htmlFor="issuingAuthority">Issuing Authority</label>
              <select
                className="w-100"
                id="issuingAuthority"
                name="issuingAuthority"
                value={certificateData.issuingAuthority}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Issuing Authority</option>
                {issuingAuthorities.map((authority, index) => (
                  <option key={index} value={authority}>
                    {authority}
                  </option>
                ))}
              </select>
            </div>
            <div className="request-certificate-form-group">
              <label htmlFor="type">Certificate Type</label>
              <select
                className="w-100"
                id="type"
                name="type"
                value={certificateData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Type</option>
                <option value="academic">Academic</option>
                <option value="work_experience">Work Experience</option>
              </select>
            </div>

            <button className="request-certificate-button" type="submit">
              Send request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RequestCertificate;
