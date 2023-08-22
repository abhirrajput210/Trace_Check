import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from './components/individualUser/RegistrationPage';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<RegistrationPage/>}/> */}
        <Route exact path="/" element={<Navbar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
