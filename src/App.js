import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from './components/navbar/Navbar';
import Footer from "./components/footer/Footer";
// import UserRegistrationPage from './pages/UserRegistrationPage';
// import IARegistrationPage from './pages/IARegistrationPage'
// import CertificatesPage from "./components/individualUser/userCertificates/CertificatesPage";
import LandingPage from "./pages/LandingPage";

import Navbar from "./components/navbar/Navbar";
import UserRegistrationPage from "./pages/UserRegistrationPage";
import IARegistrationPage from "./pages/IARegistrationPage";
import UserDashboard from "./pages/UserDashboard";
import AddCertificate from "./components/userDashboard/AddCertificate";
import { useEffect } from "react";

import IADashboard from "./pages/IADashboard";
import RequestCertificate from "./components/userDashboard/RequestCertificate";
import IssueCertificateForm from "./components/issuingAuthority/IssueCertificateForm";
import SingleCertificate from "./pages/SingleCertificate";

function App() {
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
        <Route exact path="/add-certificate" element={<AddCertificate />} />
        <Route exact path="/certificate" element={<SingleCertificate />} />
        <Route
          path="/Request-Certificate"
          element={<RequestCertificate />}
        />{" "}
        <Route
          path="/Issue-Certificate-Form"
          element={<IssueCertificateForm />}
        />
      </Routes>
    </Router>
  );
}

export default App;
