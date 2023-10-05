import React, { useState } from "react";
import "../../styles/issuingAuthority/TrackAlumni.css";
import logo from "../../assets/flipbox-4.jpg";

function TrackAlumni() {
  const initialAlumniData = [
    {
      id: "jake0097",
      name: "Jake",
      email: "test@gmail.com",
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
    <div className="container">
      <div className="search-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="alumni-list">
        {filteredAlumniData.map((alumni) => (
          <div key={alumni.id} className="alumni-card">
            <div className="alumni-profile-photo">
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

export default TrackAlumni;
