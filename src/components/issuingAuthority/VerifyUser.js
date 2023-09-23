import React, { useState } from "react";
import "../../styles/issuingAuthority/VerifyUser.css";
import logo from "../../assets/dummy-user.png";

function VerifyUser() {
  const initialAlumniData = [
    {
      id: "alumni001",
      name: "John Doe",
      email: "john.doe@example.com",
      profilePhoto: logo,
    },
    {
      id: "alumni002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      profilePhoto: logo,
    },
    {
      id: "alumni003",
      name: "John Doe",
      email: "john.doe@example.com",
      profilePhoto: logo,
    },
    {
      id: "alumni004",
      name: "John Doe",
      email: "john.doe@example.com",
      profilePhoto: logo,
    },
    {
      id: "alumni005",
      name: "John Doe",
      email: "john.doe@example.com",
      profilePhoto: logo,
    },
  ];

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const filteredAlumniData = initialAlumniData.filter((alumni) => {
    return (
      alumni.id.toLowerCase().includes(searchId.toLowerCase()) &&
      alumni.name.toLowerCase().includes(searchName.toLowerCase()) &&
      alumni.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
  });

  return (
    <div>
      <div className="vu-search-filters">
        <div className="vu-search-filter">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="vu-search-filter">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="vu-search-filter">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="user-list">
        {filteredAlumniData.map((alumni) => (
          <div key={alumni.id} className="user-card">
            <div className="user-profile-photo">
              <img src={alumni.profilePhoto} alt="User Profile" />
            </div>
            <h3>{alumni.name}</h3>
            <p>{alumni.email}</p>
            <p>User ID: {alumni.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerifyUser;
