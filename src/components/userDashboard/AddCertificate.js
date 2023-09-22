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
      <div className="add-certificate-form">
        <h3>Add Certificate</h3>
        <form>
          <div className="form-group">
            <label htmlFor="title">
              <FontAwesomeIcon icon={faCertificate} /> Certificate Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={certificateData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuingAuthority">
              <FontAwesomeIcon icon={faBuilding} /> Issuing Authority Name
            </label>
            <input
              type="text"
              id="issuingAuthority"
              name="issuingAuthority"
              value={certificateData.issuingAuthority}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">
              <FontAwesomeIcon icon={faList} /> Certificate Type
            </label>
            <select
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
          <div className="form-group">
            <label>Certification Time (From)</label>
            <input
              type="number"
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
          <div className="form-group">
            <label>Certification Time (To)</label>
            <input
              type="number"
              id="toDate"
              name="toDate"
              onChange={handleInputChange}
              min="1900"
              max="2099"
              placeholder="To Year"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="certificateFile">
              <FontAwesomeIcon icon={faUpload} /> Upload Certificate
            </label>
            <input
              type="file"
              id="certificateFile"
              name="certificateFile"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleAddCertificate}
            >
              Add Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificate;
