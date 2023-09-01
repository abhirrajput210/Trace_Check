import   './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
// import UserRegistrationPage from './pages/UserRegistrationPage';
// import IARegistrationPage from './pages/IARegistrationPage'
import CertificatesPage from './components/individualUser/userCertificates/CertificatesPage';
import LandingPage from './components/landingPage/LandingPage';
import GetStarted from './components/landingPage/GetStarted';
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
        
          {/* <Route exact path="/" element={<UserRegistrationPage/>}/> */}
          {/* <Route exact path="/" element={<IARegistrationPage/>}/> */}
          {/* <Route exact path="/" element={<CertificatesPage/>}/> */}
        <LandingPage/>
        <GetStarted/>
   
   
    </BrowserRouter>
    
  );
}

export default App;
