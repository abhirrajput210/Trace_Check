import React, { useState } from "react";
import '../../styles/issuingAuthority/RegistrationPage.css'

function RegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    type:"",
    country: "",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profilePhoto" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({
        fullName: "",
        email: "",
        type: "",
        country: "",
        profilePhoto: null,
      });
  };

  return(
    <div className="ia-register-main-container">
        <div className="ia-register-registration-container">
          <form className="ia-register-form" onSubmit={handleSubmit}>
            <div className="ia-register-registration-header">
              <div className="ia-register-registration-title">Authority Registration</div>
            </div>
            <div className="ia-register-form-group">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter Full Name*"
              />
            </div>
            <div className="ia-register-form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter Email*"
              />
            </div>
            <div className="ia-register-form-group">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Organization Type*
                </option>
                <option value="Institute">Institute</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>
            <div className="ia-register-form-group">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Country*
                </option>
                <option value="USA">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
            <div className="ia-register-form-group">
              <input
                type="file"
                id="profilePhoto"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                required
                placeholder="Profile Photo"
              />
            </div>
            <button className="ia-register-button" type="submit">REGISTER</button>
          </form>
        </div>
      </div>
  );
}

export default RegistrationPage;
