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
    struct Authority {
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
    uint256 public certificateCounter;
    mapping(uint256 => Certificate) public certificates;
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
    event CertificateVerified(
        uint256 indexed certificateId,
        VerificationStatus status
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
            _name,
            _email,
            _profileImage,
            _country,
            _orgType,
            new address[](0) // Initialize alumni array
        );
        isAuthorityAddedMapping[msg.sender] = true;
    }
    function setUser(
        string memory _name,
        string memory _email,
        string memory _country,
        string memory _profileImage
    ) public {
        require(!isUserAddedMapping[msg.sender], "User is already registered");
        require(
            !isAuthorityAddedMapping[msg.sender],
            "User is already registered as an authority"
        );
        usersMapping[msg.sender] = User(
            _name,
            _email,
            _profileImage,
            _country,
            address(0)
        ); // Initialize authority address to 0
        isUserAddedMapping[msg.sender] = true;
    }
    function getUser(address _userAddress) external view returns (User memory) {
        require(isUserAddedMapping[_userAddress], "User does not exist");
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
        emit CertificateRequested(
            newCertificate.certificateID,
            msg.sender,
            newCertificate.uploadCertificateCID
        );
        // If the user registered under an authority, add them to the authority's alumni list
        if (usersMapping[msg.sender].authority != address(0)) {
            issuingAuthority.alumni.push(msg.sender);
        }
    }
    function getAuthorityCertificate(address userID)
        external
        view
        returns (Certificate[] memory)
    {
        return userCertificates[userID];
    }
    function requestVerification(uint256 _certificateId) external {
        require(
            certificates[_certificateId].issuingAuthority == msg.sender,
            "Only the certificate owner can request verification"
        );
        require(
            certificates[_certificateId].status ==
                VerificationStatus.NotVerified,
            "Certificate is not eligible for verification"
        );
        certificates[_certificateId].status = VerificationStatus.Pending;
        emit CertificateVerified(_certificateId, VerificationStatus.Pending);
    }
    function verifyCertificate(uint256 _certificateId, bool _accepted)
        external
        onlyIssuingAuthority(_certificateId)
    {
        require(
            certificates[_certificateId].status == VerificationStatus.Pending,
            "Certificate is not pending verification"
        );
        if (_accepted) {
            certificates[_certificateId].status = VerificationStatus.Verified;
        } else {
            certificates[_certificateId].status = VerificationStatus.Rejected;
        }
        emit CertificateVerified(
            _certificateId,
            certificates[_certificateId].status
        );
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
    // Function to allow users to submit unverified certificates
    function addCertiByUser(
        string memory certificateTitle,
        CertificationType certificationType,
        uint256 from,
        uint256 to,
        string memory description,
        string memory uploadCertificateCID
    ) external {
        require(isUserAddedMapping[msg.sender], "User is not registered");
        Certificate memory newCertificate = Certificate({
            certificateTitle: certificateTitle,
            certificateID: certificateCounter,
            issuingAuthority: address(0), // Initially set to address(0) for unverified
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
        emit CertificateRequested(
            newCertificate.certificateID,
            msg.sender,
            newCertificate.uploadCertificateCID
        );
    }
    function getAllAuthorities() external view returns (address[] memory) {
        address[] memory authorities = new address[](addresses.length);
        uint256 authorityCount = 0;
        for (uint256 i = 0; i < addresses.length; i++) {
            if (isAuthorityAddedMapping[addresses[i]]) {
                authorities[authorityCount] = addresses[i];
                authorityCount++;
            }
        }
        // Resize the authorities array to the actual number of authorities
        assembly {
            mstore(authorities, authorityCount)
        }
        return authorities;
    }
    function getAuthorityName(address _authorityAddress)
        external
        view
        returns (string memory)
    {
        require(
            isAuthorityAddedMapping[_authorityAddress],
            "The specified authority does not exist"
        );
        return authorityMapping[_authorityAddress].orgName;
    }
}