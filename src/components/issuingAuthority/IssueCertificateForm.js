import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Web3Storage} from "web3.storage"


import '../../styles/issuingAuthorityDashboard/IssueCertificateForm.css';

function IssueCertificateForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    fullName: '',
    issuingAuthority: 'Sample Authority',
    certificateType: '',
    certificateTitle: '',
    certificationTimeFrom: '',
    certificationTimeTo: '',
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
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGRDOGI5MDZiNUIyMjJFM2Y4MTUzRTI1OEE3OEFGNzZCQkU2NDdGYzgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzg4NjMwMDQ2MzcsIm5hbWUiOiJkZW1vYWJjIn0.2L8rKiCD-eVUwuxz1AFXy6fy5Foh71QZQLZXe5QedcU",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      uploadCertificate: file,
    }));
  };
  const certiUpload = async () => {
   
    console.log('uploading...')
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
  const handleIssueCertificate = async(e) => {
    e.preventDefault();
    certiUpload();
    await navigate('/Issue-Certificate');
  };

  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-12 offset-md-.5">
        <div className="form-container p-4 card">
            <h2 className="form-heading">Issue Certificate</h2>
          <form onSubmit={handleIssueCertificate}>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>User's Full Name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Issuing Authority Name</label>
              <input
                type="text"
                className="form-control"
                name="issuingAuthority"
                value={formData.issuingAuthority}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="form-group">
              <label>Certificate Type</label>
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
            <div className="form-group">
              <label>Certificate Title</label>
              <input
                type="text"
                className="form-control"
                name="certificateTitle"
                value={formData.certificateTitle}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Certification Time (From)</label>
              <input
              type="number"
              id="certificateTimeTo"
              name="certificateTimeTo"
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
              id="certificateTimeTo"
              name="certificateTimeTo"
              onChange={handleInputChange}
              min="1900"
              max="2099"
              placeholder="To Year"
              required
            />
            </div>
            <div className="form-group">
              <label>Upload Certificate</label>
              <input
                type="file"
                className="form-control-file"
                name="uploadCertificate"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
                Issue Certificate
              </button>
          </form>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default IssueCertificateForm;
