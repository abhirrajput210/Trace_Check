import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faBuilding,
  faUpload,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { Web3Storage } from "web3.storage";
import { useNavigate } from "react-router-dom";
import "../../styles/userDashboard/AddCertificate.css";
// import {
//   EAS,
//   SchemaEncoder,
//   SchemaRegistry,
// } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
export const EASContractAddress = 0xc2679fbd37d54388ce493f1db75320d236e1815e;
const SchemaUid =
  "0x5bf4cc0ab2c047682631a29b76a91d043c9e68bf22df35de92b38fdac270001b";

const AddCertificate = () => {
  const navigate = useNavigate();
  const [certificateData, setCertificateData] = useState({
    title: "",
    issuingAuthority: "",
    type: "",
    description: "",
    fromDate: "",
    toDate: "",
    certificateFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCertificateData((prevData) => ({ ...prevData, certificateFile: file }));
  };

  return (
    <div className="center-form">
      <div className="add-certificate-main-container">
        <div className="add-certificate-registration-container">
          <form className="add-certificate-form">
            <div className="add-certificate-registration-header">
              <div className="add-certificate-registration-title">
                Add Certificate
              </div>
            </div>
            <div className="add-certificate-form-group">
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
            <div className="add-certificate-form-group">
              <label htmlFor="issuingAuthority">Issuing Authority Name</label>
              <input
                className="w-100"
                type="text"
                id="issuingAuthority"
                name="issuingAuthority"
                value={certificateData.issuingAuthority}
                onChange={handleInputChange}
                required
                placeholder="Issuing Authority Name"
              />
            </div>
            <div className="add-certificate-form-group">
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
            <div className="add-certificate-form-group">
              <label>Certification Description</label>
              <textarea
                className="w-100"
                type="text"
                id="description"
                rows="4"
                cols="50"
                name="description"
                value={certificateData.description}
                onChange={handleInputChange}
                placeholder="Enter information about your certificate"
              />
            </div>
            <div className="add-certificate-form-group">
              {" "}
              <label>Certification Time (From)</label>
              <input
                className="w-100"
                type="month"
                id="fromDate"
                name="fromDate"
                value={certificateData.fromDate}
                onChange={handleInputChange}
                min="1900"
                max="2099"
                placeholder="From Year"
                required
              />
            </div>
            <div className="add-certificate-form-group">
              <label>Certification Time (To)</label>
              <input
                className="w-100"
                type="month"
                id="toDate"
                name="toDate"
                value={certificateData.toDate}
                onChange={handleInputChange}
                min="1900"
                max="2099"
                placeholder="To Year"
                required
              />
            </div>
            <div className="add-certificate-form-group">
              <label htmlFor="profilePhoto">Certificate File - </label>
              <input
                className="w-100"
                type="file"
                id="certificateFile"
                name="certificateFile"
                onChange={handleFileChange}
                accept="application/pdf,image/*"
                required
              />
            </div>
            <button className="add-certificate-button" type="submit">
              Add Certificate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
