import React from "react";
import "../../styles/issuingAuthority/IAUserRequest.css";
import userImage from "../../assets/dummy-user.png";
import { useNavigate } from "react-router-dom";

function IAUserRequest() {
  const navigate = useNavigate();

  const handleViewRequestButton = () => {
    navigate("/verification");
  };
  const userRequests = [
    {
      id: "request001",
      certificateTitle: "SSC Certificate",
      userName: "John Doe",
      userId: "johndoe0097",
      requestDate: "2023-08-01",
      requestType: "Verification",
    },
  ];
  return (
    <div className="ia-user-requests-container">
      <table className="table border ">
        <thead>
          <tr>
            <th className="header-item" scope="col">
              Sr. Number
            </th>
            <th className="header-item" scope="col">
              User
            </th>
            <th className="header-item" scope="col">
              Certificate Title
            </th>
            <th className="header-item" scope="col">
              User Name
            </th>
            <th className="header-item" scope="col">
              User ID
            </th>
            <th className="header-item" scope="col">
              Request Date
            </th>
            <th className="header-item" scope="col">
              Request Type
            </th>
            <th className="header-item" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {userRequests.length > 0 &&
            userRequests.map((request, index) => (
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="ia-field ia-user-profile-photo">
                    <img src={userImage} alt="User Profile" />
                  </div>
                </td>
                <td>{request.certificateTitle}</td>
                <td>{request.userName}</td>
                <td>{request.userId}</td>
                <td>{request.requestDate}</td>
                <td>{request.requestType}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default IAUserRequest;
