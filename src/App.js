import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from './components/navbar/Navbar';
import Footer from "./components/footer/Footer";
// import UserRegistrationPage from './pages/UserRegistrationPage';
// import IARegistrationPage from './pages/IARegistrationPage'
// import CertificatesPage from "./components/individualUser/userCertificates/CertificatesPage";
import LandingPage from "./pages/LandingPage";

import SingleCertificate from "./pages/SingleCertificate";
import Navbar from "./components/navbar/Navbar";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import IARegistrationPage from "./pages/IARegistrationPage";
import UserDashboard from "./pages/UserDashboard";
import AddCertificate from "./components/userDashboard/AddCertificate";
import { useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";
import IADashboard from "./pages/IADashboard";

function App() {
  const { sdk, connected, connecting, provider, chainId } = useSDK();
  useEffect(() => {
    const chainChange = async () => {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [
          {
            chainId: "0x64",
          },
        ],
      });
    };
    console.log(connected);
  }, [chainId, connected]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/registration/user" element={<UserRegistrationPage />} />
        <Route
          path="/registration/issuing-authority"
          element={<IARegistrationPage />}
        />
        <Route exact path="/user/dashboard" element={<UserDashboard />} />
        <Route
          exact
          path="/issuing-authority/dashboard"
          element={<IADashboard />}
        />
        <Route exact path="/Add-Certificate" element={<AddCertificate />} />
        <Route exact path="/certificate" element={<SingleCertificate />} />
      </Routes>
    </Router>
  );
}

export default App;
