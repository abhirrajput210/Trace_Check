import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/userDashboard/UserCertificates.css";
import certificateImage from "../../assets/certificate.jpg";
import certificateImage2 from "../../assets/certificate2.jpg";
import certificateImage3 from "../../assets/certificate3.jpg";
import CertificateModal from "./CertificateModal";

function UserCertificates() {
  const navigate = useNavigate();
  const certificates = [
    {
      id: 1,
      title: "SSC Certificate",
      image: certificateImage,
      status: "verified",
      uploadDate: "2023-08-15",
      userId: "johndoe0097",
      issuingAuthority: "Tech Academy",
      type: "Academic",
      time: "2022-2023",
      accessLog: [
        {
          name: "SoloVenture",
          walletAddress: "0x0437F5D9b11acC5e4bEf626066694B6162bc0e76",
        },
      ],
    },
    {
      id: 2,
      title: "HSC Certificate",
      image: certificateImage2,
      status: "pending",
      uploadDate: "2023-08-15",
      userId: "johndoe0097",
      issuingAuthority: "Tech Academy",
      type: "Academic",
      time: "2022-2023",
      accessLog: [
        {
          name: "SoloVenture",
          walletAddress: "0x0437F5D9b11acC5e4bEf626066694B6162bc0e76",
        },
      ],
    },
    {
      id: 3,
      title: "Graduation Certificate",
      image: certificateImage3,
      status: "not verified",
      uploadDate: "2023-08-15",
      userId: "johndoe0097",
      issuingAuthority: "Tech Academy",
      type: "Academic",
      time: "2022-2023",
      accessLog: [
        {
          name: "SoloVenture",
          walletAddress: "0x0437F5D9b11acC5e4bEf626066694B6162bc0e76",
        },
      ],
    },
  ];

  const getBadgeColor = (status) => {
    switch (status) {
      case "verified":
        return "badge-success";
      case "pending":
        return "badge-warning";
      case "not verified":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleOpenModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCertificate(null);
    setModalOpen(false);
  };

  const handleAddCertificateClick = () => {
    navigate("/Add-Certificate");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-end mb-4">
          <button
            className="btn btn-primary"
            onClick={handleAddCertificateClick}
          >
            + Add Certificate
          </button>
        </div>

        {certificates.map((certificate) => (
          <div key={certificate.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card card-container">
              <img
                src={certificate.image}
                className="card-img-top user-certificate-card-image"
                alt="Certificate"
              />
              <div className="card-body">
                <h5 className="card-title">{certificate.title}</h5>
                <span className={`badge ${getBadgeColor(certificate.status)}`}>
                  {certificate.status}
                </span>
                <p className="card-text mt-2">
                  Upload Date: {certificate.uploadDate}
                </p>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => handleOpenModal(certificate)}
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedCertificate && (
        <CertificateModal
          certificate={selectedCertificate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default UserCertificates;
