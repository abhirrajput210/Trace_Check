import React from 'react'
import '../../styles/userDashboard/CertificateModal.css'

function CertificateModal({ certificate, onClose }) {
    return (
      <div className="modal-backdrop">
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
            <img src={certificate.image} alt="Certificate" className="certificate-image" />
            <div className="certificate-details">
              <h3>{certificate.title}</h3>
              <p>
                <strong>User ID:</strong>{' '}
                <span className="field-value">{certificate.userId}</span>
              </p>
              <p>
                <strong>Issuing Authority:</strong>{' '}
                <span className="field-value">{certificate.issuingAuthority}</span>
              </p>
              <p>
                <strong>Certificate Type:</strong>{' '}
                <span className="field-value">{certificate.type}</span>
              </p>
              <p>
                <strong>Certificate Time:</strong>{' '}
                <span className="field-value">{certificate.time}</span>
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="field-value">
                  {certificate.status}
                </span>
              </p>
              <p>
                <strong>Certificate Access Log:</strong>
              </p>
              <select className="access-log-dropdown">
                {certificate.accessLog.map((access, index) => (
                  <option key={index} value={index}>
                    {access.name} - {access.walletAddress}
                  </option>
                ))}
              </select>
              <div className="modal-buttons">
                <button className="btn btn-primary">Request Verification</button>
                <button className="btn btn-primary">Share</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default CertificateModal