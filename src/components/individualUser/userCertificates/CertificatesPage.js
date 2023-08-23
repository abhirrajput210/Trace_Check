import React from "react";
import "../../../styles/individualUser/userCertificates/CertificatesPage.css";
import logo from "../../../assets/UserCertificateBg.jpg";
import userImage from "../../../assets/logo.svg";

function CertificatesPage() {
  const certificatesData = [
    {
      id: 1,
      title: "SSC Certificates",
      user: "John Doe",
      verified: true,
      image: userImage,
    },
    {
      id: 2,
      title: "SSC Certificates",
      user: "John Doe",
    //   verified: true,
      image: userImage,
    },
    {
      id: 3,
      title: "SSC Certificates",
      user: "John Doe",
      verified: false,
      image: userImage,
    },
  ];

  return (
    <>
      <div className="user-certificate-container">
        <div className="user-certificate-overlay"></div>
        <div className="user-certificate-content">
          <h1>My Certificates</h1>
        </div>
      </div>

      <div className="certificate-container-row">
        {certificatesData.map((certificate) => (
          <div key={certificate.id} className="certificate-card">
            <figure className="certificate-figure">
              <img src={logo} alt="Certificate" />
              <div className="cat-meta">{certificate.verified ? "Verified" : certificate.verified === false ? "Not Verified" : "Pending"}</div>
            </figure>
            <div className="certificate-content">
              <h4>{certificate.title}</h4>
              <div className="user-info">
                <div className="user-photo">
                  <img src={certificate.image} alt="User" />
                </div>
                <div className="user-name">{certificate.user}</div>
              </div>
              <hr />
              <div className="view-more">
                VIEW MORE <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CertificatesPage;
