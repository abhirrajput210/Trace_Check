import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/issuingAuthority/IssueCertificate.css";
import certificateImage from "../../assets/certificate.jpg";
import certificateImage2 from "../../assets/certificate2.jpg";
import certificateImage3 from "../../assets/certificate3.jpg";
import IACertificateModal from "./IACertificateModal";

function IssueCertificate() {
  const navigate = useNavigate();
  const certificates = [
    {
      id: 1,
      title: "HSC Certificate",
      image: certificateImage,
      issueDate: "2023-08-15",
      userId: "Bob0768",
      userName: "Bob",
      type: "Academic",
      certificateTime: "2022-2023",
    },
    {
      id: 2,
      title: "Graduation Certificate",
      image: certificateImage3,
      issueDate: "2023-08-15",
      userId: "Alice165",
      userName: "Alice",
      type: "Academic",
      certificateTime: "2022-2023",
    },
    {
      id: 3,
      title: "Graduation Certificate",
      image: certificateImage2,
      issueDate: "2023-08-15",
      userId: "Alice165",
      userName: "Alice",
      type: "Academic",
      certificateTime: "2022-2023",
    },
  ];

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

  const handleIssueCertificateClick = () => {
    navigate("/Issue-Certificate-Form");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 d-flex justify-content-end mb-4">
          <button
            className="btn btn-primary"
            onClick={handleIssueCertificateClick}
          >
            + Issue Certificate
          </button>
        </div>

        {certificates.map((certificate) => (
          <div key={certificate.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card ic-card-container">
              <img
                src={certificate.image}
                className="card-img-top ic-card-image"
                alt="Certificate"
              />
              <div className="card-body">
                <h5 className="card-title">{certificate.title}</h5>
                <p className="card-text">User: {certificate.userName}</p>
                <p className="card-text">
                  Issuing Date: {certificate.issueDate}
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
        <IACertificateModal
          certificate={selectedCertificate}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default IssueCertificate;
