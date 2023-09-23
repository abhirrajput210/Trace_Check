import React from "react";
import "../../styles/issuingAuthority/IACertificateModal.css";
import { ethers } from "ethers";

function IACertificateModal({ certificate, onClose }) {
  const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

  // Gets a default provider (in production use something else like infura/alchemy)
  const provider = ethers.providers.getDefaultProvider("sepolia");

  // Connects an ethers style provider/signingProvider to perform read/write functions.
  // MUST be a signer to do write operations!

  return (
    <div className="modal-backdrop">
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="iacm-close-btn" onClick={onClose}>
            &times;
          </span>
          <img
            src={certificate.image}
            alt="Certificate"
            className="certificate-image"
          />
          <div className="iacm-certificate-details">
            <h3>{certificate.title}</h3>
            <p>
              <strong>User Name:</strong>{" "}
              <span className="iacm-field-value">{certificate.userName}</span>
            </p>
            <p>
              <strong>User ID:</strong>{" "}
              <span className="iacm-field-value">{certificate.userId}</span>
            </p>
            <p>
              <strong>Certificate Type:</strong>{" "}
              <span className="iacm-field-value">{certificate.type}</span>
            </p>
            <p>
              <strong>Certificate Time:</strong>{" "}
              <span className="iacm-field-value">
                {certificate.certificateTime}
              </span>
            </p>
            <p>
              <strong>Issue Date:</strong>{" "}
              <span className="iacm-field-value">{certificate.issueDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IACertificateModal;
