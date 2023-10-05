import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/userDashboard/UserRequests.css";

function UserRequests() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("");
  const requestsData = [
    {
      id: 1,
      title: "SSC Certificate",
      issuingAuthority: "Tech Academy",
      issuingAuthorityEmail: "techacademy181@gmail.com",
      requestDate: "2023-08-01",
      requestType: "Verification",
      status: "Pending",
    },
  ];

  const handleRequestCertificateClick = () => {
    navigate("/Request-Certificate");
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredRequests = filterType
    ? requestsData.filter((request) => request.requestType === filterType)
    : requestsData;

  return (
    <div className="user-requests container ">
      <div className="requests-main-header">
        <div className="request-type-filter">
          <select
            id="filterType"
            value={filterType}
            onChange={handleFilterChange}
          >
            <option value="">Request Type</option>
            <option value="Verification">Verification</option>
            <option value="Issuing Certificate">Issuing Certificate</option>
          </select>
          <button
            className="request-certificate-button"
            onClick={handleRequestCertificateClick}
          >
            + Request Certificate
          </button>
        </div>
      </div>

      <div>
        <table className="table border ">
          <thead>
            <tr>
              <th className="header-item" scope="col">
                Sr. Number
              </th>
              <th className="header-item" scope="col">
                Certificate Title
              </th>
              <th className="header-item" scope="col">
                Issuing Authority Name
              </th>
              <th className="header-item" scope="col">
                Issuing Authority Email
              </th>
              <th className="header-item" scope="col">
                Request Date
              </th>
              <th className="header-item" scope="col">
                Request Type
              </th>
              <th className="header-item" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 &&
              filteredRequests.map((request, index) => (
                <tr key={request.id}>
                  <td>{index + 1}</td>
                  <td>{request.title}</td>
                  <td>{request.issuingAuthority}</td>
                  <td>{request.issuingAuthorityEmail}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.requestType}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserRequests;
