import React, { useState } from "react";
import "../styles/individualUser/RegistrationPage.css";

function UserRegistrationPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
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
      country: "",
      profilePhoto: null,
    });
  };

  return (
    <div className="user-register-main-container">
      <div className="user-register-registration-container">
        <form className="user-register-form" onSubmit={handleSubmit}>
          <div className="user-register-registration-header">
            <div className="user-register-registration-title">
              User Registration
            </div>
          </div>
          <div className="user-register-form-group">
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
          <div className="user-register-form-group">
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
          <div className="user-register-form-group">
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
          <div className="user-register-form-group">
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
          <button className="user-register-button" type="submit">
            REGISTER
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegistrationPage;
