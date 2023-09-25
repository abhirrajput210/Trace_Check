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
    <div className="user-requests">
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
            className="bg-primary request-certificate-button"
            onClick={handleRequestCertificateClick}
          >
            + Request Certificate
          </button>
        </div>
      </div>

      {/* <div className="requests-table">
        <div className="requests-header">
          <div className="header-item">Sr. Number</div>
          <div className="header-item">Certificate Title</div>
          <div className="header-item">Issuing Authority Name</div>
          <div className="header-item">Issuing Authority Email</div>
          <div className="header-item">Request Date</div>
          <div className="header-item">Request Type</div>
          <div className="header-item">Status</div>
        </div>
        {filteredRequests.map((request, index) => (
          <div key={request.id} className="request-row">
            <div className="row-item">{index + 1}</div>
            <div className="row-item">{request.title}</div>
            <div className="row-item">{request.issuingAuthority}</div>
            <div className="row-item">{request.issuingAuthorityEmail}</div>
            <div className="row-item">{request.requestDate}</div>
            <div className="row-item">{request.requestType}</div>
            <div className="row-item">{request.status}</div>
          </div>
        ))}
      </div> */}
      <table className=" table">
        <thead>
          <tr>
            <th>Sr. Number</th>
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
          {filteredRequests.map((request, index) => (
            <tr key={request.id} className="request-row">
              <td className="row-item">{index + 1}</td>
              <td className="row-item">{request.title}</td>
              <td className="row-item">{request.issuingAuthority}</td>
              <td className="row-item">{request.issuingAuthorityEmail}</td>
              <td className="row-item">{request.requestDate}</td>
              <td className="row-item">{request.requestType}</td>
              <td className="row-item">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserRequests;
