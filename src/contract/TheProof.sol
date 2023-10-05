// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract CertificateManagement {
    enum OrgType {
        EducationalInstitutions,
        Corporations
    }
    enum IssuingAuthority {
        CompanyA,
        CompanyB,
        CompanyC
    }
    enum CertificationType {
        Academic,
        WorkExperience
    }
    enum VerificationStatus {
        NotVerified,
        Pending,
        Verified,
        Rejected
    }
    enum RequestType {
        Issue,
        Verify
    }
    struct Authority {
        address authorityAddress;
        string orgName;
        string email;
        string profileImage;
        string country;
        OrgType orgType;
        address[] alumni; // Store alumni addresses
    }
    struct User {
        string name;
        string email;
        string profileImage;
        string country;
        address authority; // Add the authority's address
    }
    struct Certificate {
        string certificateTitle;
        uint256 certificateID;
        address issuingAuthority; // Change the type to address
        CertificationType certificationType;
        uint256 from;
        uint256 to;
        string description;
        string uploadCertificateCID;
        VerificationStatus status;
        
    }
  
    address[] private addresses;
    mapping(address => Authority) private authorityMapping;
    mapping(address => bool) private isAuthorityAddedMapping;
    mapping(address => User) private usersMapping;
    mapping(address => bool) private isUserAddedMapping;
    mapping(address => Certificate[]) private userCertificates;
    mapping(address => uint256) private userIDs;
    uint256 private nextUserID = 1; // Initialize the next user ID
    uint256 public certificateCounter;
    mapping(uint256 => Certificate) public certificates;
    // mapping(uint256 => VerificationRequest) public verificationRequests;
    modifier onlyAuthority() {
        require(
            isAuthorityAddedMapping[msg.sender],
            "Only an authority can perform this action"
        );
        _;
    }
    modifier onlyIssuingAuthority(uint256 _certificateId) {
        require(
            certificates[_certificateId].issuingAuthority == msg.sender,
            "Only the issuing authority can perform this action"
        );
        _;
    }
    event CertificateRequested(
        uint256 indexed certificateId,
        address indexed userAddress,
        string certificateCID
    );
   
   

    function setAuthority(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _profileImage,
        OrgType _orgType
    ) public {
        require(
            !isAuthorityAddedMapping[msg.sender],
            "User is already registered as an authority"
        );
        require(
            !isUserAddedMapping[msg.sender],
            "You are already registered as a User so you cann't be an Institute/authority"
        );
        authorityMapping[msg.sender] = Authority(
            msg.sender,
            _name,
            _email,
            _profileImage,
            _country,
            _orgType,
            new address[](0) // Initialize alumni array
        );
        isAuthorityAddedMapping[msg.sender] = true;
        addresses.push(msg.sender);
    }
    function setUser(
        string memory name,
        string memory email,
        string memory country,
        string memory profileImage
    ) public {
        require(!isUserAddedMapping[msg.sender], "User is already registered");
        require(
            !isAuthorityAddedMapping[msg.sender],
            "User is already registered as an authority"
        );
        uint256 userID = nextUserID; // Assign the next available user ID
        nextUserID++; // Increment the next user ID for the next registration
        usersMapping[msg.sender] = User(
            name,
            email,
            profileImage,
            country,
            address(0)
        ); // Initialize authority address to 0
        isUserAddedMapping[msg.sender] = true;
        userIDs[msg.sender] = userID; // Map the user's address to the user ID
        addresses.push(msg.sender);
    }
    function getUser(address _userAddress) external view returns (User memory) {
        uint256 userID = userIDs[_userAddress]; // Get the user's ID
        // Check if the user exists
        require(userID > 0, "User does not exist");
        return usersMapping[_userAddress];
    }
    function updateUser(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _profileImage
    ) public {
        require(isUserAddedMapping[msg.sender], "User is not registered");
        User storage user = usersMapping[msg.sender];
        if (bytes(_name).length > 0) {
            user.name = _name;
        }
        if (bytes(_email).length > 0) {
            user.email = _email;
        }
        if (bytes(_country).length > 0) {
            user.country = _country;
        }
        if (bytes(_profileImage).length > 0) {
            user.profileImage = _profileImage;
        }
    }
    function updateAuthority(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _profileImage
    ) public onlyAuthority {
        Authority storage authority = authorityMapping[msg.sender];
        if (bytes(_name).length > 0) {
            authority.orgName = _name;
        }
        if (bytes(_email).length > 0) {
            authority.email = _email;
        }
        if (bytes(_country).length > 0) {
            authority.country = _country;
        }
        if (bytes(_profileImage).length > 0) {
            authority.profileImage = _profileImage;
        }
    }
    function getAuthority(address _address)
        public
        view
        returns (Authority memory)
    {
        return authorityMapping[_address];
    }
    function addCertiByAuth(
        string memory certificateTitle,
        CertificationType certificationType,
        uint256 from,
        uint256 to,
        string memory description,
        string memory uploadCertificateCID
    ) external {
        Authority storage issuingAuthority = authorityMapping[msg.sender];
        Certificate memory newCertificate = Certificate({
            certificateTitle: certificateTitle,
            certificateID: certificateCounter,
            issuingAuthority: msg.sender,
            certificationType: certificationType,
            from: from,
            to: to,
            description: description,
            uploadCertificateCID: uploadCertificateCID,
            status: VerificationStatus.NotVerified
        });
        userCertificates[msg.sender].push(newCertificate);
        certificates[certificateCounter] = newCertificate;
        certificateCounter++;
      
        if (usersMapping[msg.sender].authority != address(0)) {
            issuingAuthority.alumni.push(msg.sender);
        }
    }


     function getCertificatesByIssuingAuthority(address _authority) public view returns (Certificate[] memory) {
        Certificate[] memory result = new Certificate[](certificateCounter);
        uint256 count = 0;
        
        for (uint256 i = 0; i < certificateCounter; i++) {
            if (certificates[i].issuingAuthority == _authority) {
                result[count] = certificates[i];
                count++;
            }
        }
        
        // Resize the result array to the actual count of matching certificates
        assembly {
            mstore(result, count)
        }
        
        return result;
    }


    function requestVerification(
        uint256 _certificateId

    ) external {
        require(
            certificates[_certificateId].issuingAuthority == msg.sender,
            "Only the certificate owner can request verification"
        );
        require(
            certificates[_certificateId].status ==
                VerificationStatus.NotVerified,
            "Certificate is not el igible for verification"
        );
        certificates[_certificateId].status = VerificationStatus.Verified;
      
    }
    function verifyCertificate(uint256 _certificateId, bool _accepted , string memory _cid )
        external
        onlyIssuingAuthority(_certificateId)
    {
        require(
            !(certificates[_certificateId].status == VerificationStatus.Rejected),
            "Certificate is not pending verification"
        );
        if (_accepted) {
            certificates[_certificateId].status = VerificationStatus.Verified;
            if(!(bytes(_cid).length == 0))
            {
            certificates[_certificateId].uploadCertificateCID = _cid;
            }
            
            
        } else {
            certificates[_certificateId].status = VerificationStatus.Rejected;
        }
    
    }
    function getCertificateStatus(uint256 _certificateId)
        external
        view
        returns (VerificationStatus)
    {
        return certificates[_certificateId].status;
    }
    function registerUnderAuthority(address _authorityAddress) external {
        require(
            isUserAddedMapping[msg.sender],
            "User must be registered before registering under an authority"
        );
        require(
            isAuthorityAddedMapping[_authorityAddress],
            "The specified authority does not exist"
        );
        usersMapping[msg.sender].authority = _authorityAddress;
        // Add the user to the authority's alumni list
        authorityMapping[_authorityAddress].alumni.push(msg.sender);
    }
    function getAlumniList()
        external
        view
        onlyAuthority
        returns (address[] memory)
    {
        return authorityMapping[msg.sender].alumni;
    }
    // get usercertificates
    function getUserCertificates(address _userAddress)
        external
        view
        returns (Certificate[] memory)
    {
        return userCertificates[_userAddress];
    }
    // get Usercertificates under authority
    function getUserCertificatesUnderAuthority(
        address _userAddress,
        address _authorityAddress
    ) external view returns (Certificate[] memory) {
        require(
            isAuthorityAddedMapping[_authorityAddress],
            "The specified authority does not exist"
        );
        require(
            usersMapping[_userAddress].authority == _authorityAddress,
            "User is not registered under this authority"
        );
        return userCertificates[_userAddress];
    }
    function addCertiByUser(
        string memory certificateTitle,
        CertificationType certificationType,
        uint256 from,
        uint256 to,
        string memory description,
        string memory uploadCertificateCID,
        address authorityAddress
    ) external {
        uint256 userID = userIDs[msg.sender]; // Get the user's ID
        // Check if the user exists
        require(userID > 0, "User is not registered");
        require(
            isAuthorityAddedMapping[authorityAddress],
            "The specified authority does not exist"
        );
        Certificate memory newCertificate = Certificate({
            certificateTitle: certificateTitle,
            certificateID: certificateCounter,
            issuingAuthority: authorityAddress, // Set the issuing authority address
            certificationType: certificationType,
            from: from,
            to: to,
            description: description,
            uploadCertificateCID: uploadCertificateCID,
            status: VerificationStatus.NotVerified
        });
        userCertificates[msg.sender].push(newCertificate);
        certificates[certificateCounter] = newCertificate;
        certificateCounter++;
     
    }
    function getAllRegisteredAuthorities() external view returns (Authority[] memory) {
        uint256 numAuthorities = addresses.length;
        uint256 counter =0;
        Authority[] memory registeredAuthorities = new Authority[](numAuthorities);
        for (uint256 i = 0; i < numAuthorities; i++) {
            address authorityAddress = addresses[i];
            if (isAuthorityAddedMapping[authorityAddress]) {
                registeredAuthorities[counter++] = authorityMapping[authorityAddress];
            }
        }
        return registeredAuthorities;
    }
   
    function requestCertiByUser(
        string memory certificateTitle,
        CertificationType certificationType,
        uint256 from,
        uint256 to,
        string memory description,
        address authorityAddress
    ) external {
        uint256 userID = userIDs[msg.sender]; // Get the user's ID
        // Check if the user exists
        require(userID > 0, "User is not registered");
        require(
            isAuthorityAddedMapping[authorityAddress],
            "The specified authority does not exist"
        );
        // Create a new Certificate without the CID
        Certificate memory newCertificate = Certificate({
            certificateTitle: certificateTitle,
            certificateID: certificateCounter,
            issuingAuthority: authorityAddress, // Set the issuing authority address
            certificationType: certificationType,
            from: from,
            to: to,
            description: description,
            uploadCertificateCID: "", // No CID for this request
            status: VerificationStatus.NotVerified
        });
        userCertificates[msg.sender].push(newCertificate);
        certificates[certificateCounter] = newCertificate;
        certificateCounter++;
      
    }
}