import React ,{ useState }from 'react';
import Dashboardimg from '../../assets/dashboard.jpeg'
import css from "../../styles/landingPage/IaDashboard.css";
import icon from "../../assets/quote.png"

const IaDashboard = () => {
  const dropdownContents = {
    About: (
      <div className="authorbio">
       
        
       
        
        {/* Existing content for About goes here */}
        <h3 className='about'>Lampros Tech: A Leading Blockchain Development Company</h3>
        <p>
          Passionate professionals who strive to make technology accessible to everyone. We have worked for years to make businesses more successful using technology and now we want to do the same for blockchain technology. We are guided by our strong values of innovation, commitment, and trust in the way we partner with our clients. Over the years, we have grown into a team of expert web and blockchain developers, who transform your ideas into reality. We boast of a diverse client portfolio spread across the globe and are the right choice of technology partner for you.
        </p>
      </div>
    ),
    'Issue Certificate': (
      <div className="certificate-content">
        {/* Content for Issue Certificate dropdown */}
        <p>This is the Issue Certificate content.</p>
      </div>
    ),
    'Verify User': (
      <div className="verify-user-content">
        {/* Content for Verify User dropdown */}
        <p>This is the Verify User content.</p>
      </div>
    ),
    'User Request': (
      <div className="user-request-content">
        {/* Content for User Request dropdown */}
        <p>This is the User Request content.</p>
      </div>
    ),
  };

  const [selectedDropdown, setSelectedDropdown] = useState('About');

  const handleDropdownChange = (dropdown) => {
    setSelectedDropdown(dropdown);
  };

  return (
    <div className="container3">
    <div className="row">
      <div className="col-lg-5 col-md-12"> {/* Update column size */}
       
      <figure style={{ margin: 0, border: 'none' }}>
  <img
    className="authimage"
    src={Dashboardimg}
    alt="Icon"
    style={{ width: '100%', height: '100%', border: 'none' }}
  />
</figure>
       
        <div className="Issuingname">
          <img src={icon} alt="Icon" className="icon-image" style={{ position: 'absolute', top: 0, left: 0 }} /> {/* Icon in the top-left corner */}
          <h3 className="smaller-name">Lampros Tech Labs</h3>
        </div>
      </div>
        {/* RIGHT SECTION */}
        <div className="col-lg-7">
          <div className="authorbio">
            <div className="pattern-overlay c-pattern"></div>
            <div className="title-divider"></div>
            <h1 className="author-name">Issuing Authority</h1>
            <div className="social-site-link">
              {/* Add your social media links here */}
            </div>
            <div className="dropdown-section">
              <div className="dropdowns">
                {Object.keys(dropdownContents).map((dropdown) => (
                  <button
                    key={dropdown}
                    className={`dropdown-button ${
                      selectedDropdown === dropdown ? 'active' : ''
                    }`}
                    onClick={() => handleDropdownChange(dropdown)}
                  >
                    {dropdown}
                  </button>
                ))}
              </div>
              <div className="dropdown-content">
                {dropdownContents[selectedDropdown]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IaDashboard;