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

  const certiUpload = async () => {
    console.log("uploading...");
    const rootCid = await client.put([certificateData.certificateFile], {
      name: "certificate",
      maxRetries: 3,
    });

    const res = await client.get(rootCid);
    const files = await res.files();
    for (const file of files) {
      console.log(`${file.cid}`);
    }
  };

  const handleAddCertificate = async (e) => {
    e.preventDefault();
    try {
      const rootCid = await certiUpload();
      const easSigner = new ethers.Wallet(
        "1910812769a4d5a6b96940b67a5a011a99de8d235b078cdfa7e030641d189eab"
      );
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-sepolia.g.alchemy.com/v2/hBuhXe_Xb4n9AIoSeZ8RCPHYQgQX4hF9"
      );
      // const schemaRegistry = new SchemaRegistry(provider);
      // const schema = await schemaRegistry.getByUid(SchemaUid);
      // const encoder = new SchemaEncoder(schema);

      const attestationData = {
        title: certificateData.title,
        issuingAuthority: certificateData.issuingAuthority,
        type: certificateData.type,
        fromDate: certificateData.fromDate,
        toDate: certificateData.toDate,
        certificateRootCID: rootCid,
      };

      // const attestationBytes = encoder.encode(attestationData);

      // const easContract = new ethers.Contract(
      //   EASContractAddress,
      //   EAS.abi,
      //   easSigner
      // );
      // const tx = await easContract.createAttestation(attestationBytes);

      // const receipt = await tx.wait();
      // console.log("Attestation created. Transaction receipt:", receipt);
    } catch (err) {
      console.error("Error creating attestation:", err);
    }
  };

  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRDOGI5MDZiNUIyMjJFM2Y4MTUzRTI1OEE3OEFGNzZCQkU2NDdGYzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg4NjMwMDQ2MzcsIm5hbWUiOiJkZW1vYWJjIn0.2L8rKiCD-eVUwuxz1AFXy6fy5Foh71QZQLZXe5QedcU",
  });

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
                id="fullName"
                name="fullName"
                value={certificateData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter Full Name*"
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
              {" "}
              <label>Certification Time (From)</label>
              <input
                className="w-100"
                type="date"
                id="fromDate"
                name="fromDate"
                value={certificateData.fromDate}
                onChange={handleInputChange}
                min="1900"
                max="2099"
                placeholder="To Year"
                required
              />
            </div>
            <div className="add-certificate-form-group">
              <label>Certification Time (To)</label>
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
            <div className="add-certificate-form-group">
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
