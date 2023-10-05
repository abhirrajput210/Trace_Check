import React, { useEffect, useState } from "react";
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
import { contractInstance } from "../ContractInstance";
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZiNzE4QzgwYmJlYUQwNTAzYThFMjgzMmI2MDU0RkVmOUU4MzA2NzQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjE0MTEzNjczNTAsIm5hbWUiOiJUcnkifQ.srPPE7JD3gn8xEBCgQQs_8wyo6rDrXaDWC0QM8FtChA";

const client = new Web3Storage({ token: API_TOKEN });

const AddCertificate = () => {
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [authorities, setAuthorities] = useState([]);
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

  const convertToEpoch = (dateString) => {
    const date = new Date(dateString);
    return date.getTime();
  };

  useEffect(() => {
    const fetchAuthorities = async () => {
      try {
        const contract = await contractInstance();

        const data = await contract.getAllRegisteredAuthorities();
        console.log(data);
        if (data) {
          setAuthorities(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAuthorities();
  }, []);

  async function uploadImage(e) {
    // console.log(e.target.value);
    console.log(document.getElementById("certificateFile").files[0].name);
    setFileName(document.getElementById("certificateFile").files[0].name);
    console.log(URL.createObjectURL(e.target.files[0]));
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function handleUpload() {
    var fileInput = document.getElementById("certificateFile");

    let cid;

    cid = await client.put(fileInput.files);

    console.log(cid);

    let image_cid;

    image_cid = cid + "/" + fileName;

    console.log(image_cid);
    setCertificateData({ ...certificateData, certificateFile: image_cid });
    handleSubmit(image_cid);
    // setFile(url);
  }
  const handleSubmit = async (img_cid) => {
    try {
      const contract = await contractInstance();
      let fromDate = convertToEpoch(certificateData.fromDate);
      let toDate = convertToEpoch(certificateData.toDate);
      console.log(
        certificateData.title,
        certificateData.type,
        fromDate,
        toDate,
        certificateData.description,
        img_cid,
        certificateData.issuingAuthority
      );

      const tx = await contract.setUser(
        certificateData.title,
        certificateData.type,
        fromDate,
        toDate,
        certificateData.description,
        img_cid,
        certificateData.issuingAuthority
      );

      let receipt = await tx.wait();
      console.log(receipt);
      if (receipt) {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="center-form">
      <div className="add-certificate-main-container">
        <div className="add-certificate-registration-container">
          <div className="add-certificate-form">
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
              <select
                className="w-100"
                type="text"
                id="issuingAuthority"
                name="issuingAuthority"
                value={certificateData.issuingAuthority}
                onChange={handleInputChange}
                required
                placeholder="Issuing Authority Name"
              >
                <option value="">Select Authority / Institute</option>
                {authorities.length > 0 &&
                  authorities.map(() => (
                    <option value="academic">Academic</option>
                  ))}
              </select>
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
              <label htmlFor="profilePhoto">Certificate Image - </label>
              <input
                className="w-100"
                type="file"
                id="certificateFile"
                name="certificateFile"
                onChange={uploadImage}
                accept="image/png, image/gif, image/jpeg"
                required
              />
            </div>
            <button className="add-certificate-button" onClick={handleUpload}>
              Add Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
