import React, { useState } from "react";
import "../../styles/individualUser/RegistrationPage.css";

function RegistrationPage() {
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
  };

  return (
    <div className="main-container"> 
    <div className="registration-container">
      <form onSubmit={handleSubmit}>
        <div className="registration-header">
            <div className="registration-title">User Registration</div>
        </div>
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
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
        <button type="submit">REGISTER</button>
      </form>
    </div>
    </div>
  );
}

export default RegistrationPage;
