import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Web3Storage } from "web3.storage";

import "../../styles/issuingAuthority/IssueCertificateForm.css";

function IssueCertificateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    fullName: "",
    issuingAuthority: "Sample Authority",
    certificateType: "",
    certificateTitle: "",
    certificationTimeFrom: "",
    certificationTimeTo: "",
    uploadCertificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const client = new Web3Storage({
    token: "your_web3_storage_token_here",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      uploadCertificate: file,
    }));
  };

  const certiUpload = async () => {
    console.log("uploading...");
    const fileInput = document.querySelector('input[type="file"]');
    const rootCid = await client.put(fileInput.files, {
      name: "logo_image",
      maxRetries: 3,
    });

    const res = await client.get(rootCid);
    const files = await res.files(formData.uploadCertificate);
    for (const file of files) {
      console.log(`${file.cid}`);
    }
  };

  const handleIssueCertificate = async (e) => {
    e.preventDefault();
    certiUpload();
    await navigate("/Issue-Certificate");
  };

  return (
    <div className="issue-certificate-main-container">
      <div className="issue-certificate-registration-container">
        <div className="issue-certificate-registration-header">
          <h2 className="issue-certificate-registration-title">
            Issue Certificate
          </h2>
        </div>
        <form
          className="issue-certificate-form"
          onSubmit={handleIssueCertificate}
        >
          <div className="issue-certificate-form-group">
            <label>User ID:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User ID"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="issue-certificate-form-group">
            <label>User's Full Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="issue-certificate-form-group">
            <label>Issuing Authority Name:</label>
            <input
              type="text"
              className="form-control"
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="issue-certificate-form-group">
            <label>Certificate Type:</label>
            <select
              className="form-control"
              name="certificateType"
              value={formData.certificateType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Certificate Type</option>
              <option value="Academic">Academic</option>
              <option value="Professional">Professional</option>
            </select>
          </div>
          <div className="issue-certificate-form-group">
            <label>Certificate Title:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Certificate Title"
              name="certificateTitle"
              value={formData.certificateTitle}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="issue-certificate-form-group">
            {" "}
            <label>Certification Time (From):</label>
            <input
              className="w-100"
              type="date"
              id="fromDate"
              name="fromDate"
              onChange={handleInputChange}
              min="1900"
              max="2099"
              placeholder="To Year"
              required
            />
          </div>
          <div className="issue-certificate-form-group">
            <label>Certification Time (To):</label>
            <input
              className="w-100"
              type="date"
              id="toDate"
              name="toDate"
              onChange={handleInputChange}
              min="1900"
              max="2099"
              placeholder="To Year"
              required
            />
          </div>
          <div className="issue-certificate-form-group">
            <input
              type="file"
              className="form-control-file"
              name="uploadCertificate"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" className="issue-certificate-button">
            Issue Certificate
          </button>
        </form>
      </div>
    </div>
  );
}

export default IssueCertificateForm;
