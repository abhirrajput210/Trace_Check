import React, { useState } from "react";
import "./LandingPage"; // Import your CSS file
import Image from "../assets/landing.png";
import Image2 from "../assets/educator.png";
import Image3 from "../assets/landingimg2.png";
import "../styles/landingPage/LandingPage.css"; // Import the CSS file for this component
import ContentInfo from "../components/issuingAuthority/ContentInfo";
import GetStarted from "../components/landingPage/GetStarted";
import Imagelanding from "../assets/landingZig.png";
import { contractInstance } from "../components/ContractInstance";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from "@rainbow-me/rainbowkit";

function App() {
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const [loading, setLoading] = useState({ one: false, two: false });

  const navigate = useNavigate();

  const fetchProfile = async (type) => {
    if (!address) {
      openConnectModal();
      return;
    }
    if (type === "user") {
      setLoading({ one: true, two: false });
    } else {
      setLoading({ one: false, two: true });
    }
    try {
      const contract = await contractInstance();
      const user = await contract.checkUserType();
      console.log(user);
      if (parseInt(user) === 1) {
        setLoading({ one: false, two: false });
        navigate("/user/dashboard");
      } else if (parseInt(user) === 2) {
        setLoading({ one: false, two: false });
        navigate("/issuing-authority/dashboard");
      } else if (parseInt(user) === 0) {
        if (type === "user") {
          setLoading({ one: false, two: false });
          navigate("/registration/user");
        } else {
          setLoading({ one: false, two: false });
          navigate("/registration/issuing-authority");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section className="home-banner">
        <div className="container">
          <div className="row pt-5">
            {/* Left Banner Content */}
            <div className="  leftsec col-md-6 banner-left  h-100">
              <div className="image-overlay pattern-overlay">
                <figure className="image2-opacity">
                  <img src={Image2} alt="circle round" />
                  <img
                    className="image3"
                    src={Imagelanding}
                    alt="zig zag lines"
                  />
                </figure>
              </div>
              <div className="banner-content">
                <div className="banner-title">
                  Revolutionizing Background Verification
                  <span className="tick-icon"> ✔</span>{" "}
                  {/* Add the tick icon here */}
                </div>
                <div className="banner-text">
                  <h6>
                    TraceCheck is on a mission to revolutionize the background
                    verification process, providing a secure and decentralized
                    platform for issuing certificates, ensuring trust and
                    empowerment for job seekers and recruiters alike.
                  </h6>
                </div>
                <br></br>
                <div className="banner-button">
                  <a href="#getstarted" className="button-round-secondary">
                    GET STARTED
                  </a>
                </div>
              </div>
            </div>

            {/* Right Banner Content */}
            <div className="col-md-6 banner-right">
              <div className="image-container">
                <img src={Image} alt="" className="banner-img" />
                <img src={Image3} alt="" className="background-image" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContentInfo />
      <GetStarted fetchProfile={fetchProfile} loading={loading} />
    </>
  );
}

export default App;
