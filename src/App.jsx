// src/App.js
import {useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PatientLogin from './components/Patients/patientLogin.jsx';
import DoctorLogin from './components/Doctors/doctorLogin.jsx';
import ManagementLogin from './components/Management/managementLogin.jsx';
import './App.css';
import PatientSignup from "./components/Patients/patientSignup.jsx";
import ManagementSignup from "./components/Management/managementSignup.jsx";
import DoctorSignup from "./components/Doctors/doctorSignup.jsx"; // Import the CSS file for styling
import PatientDashboard from "./components/Patients/patientDashboard.jsx";
const App = () => {

    const [user,setuser]=useState("None")

    function handleLogout() {
        setuser("None")
    }

    return (
        <div className={"completebody"}>
        <Router>
            <div>
                <div className="topnav">
                    <Link to="/"><button>HOME</button></Link>
                    {user=="None"?
                        <div>
                            <Link to="/patientLogin"><button>PATIENT LOGIN</button></Link>
                            <Link to="/doctorLogin"><button>DOCTOR LOGIN</button></Link>
                            <Link to="/managementLogin"><button>MANAGEMENT LOGIN</button></Link>
                        </div>
                        :
                        <Link to={"/"}> <button onClick={handleLogout}>LOGOUT</button> </Link>
                    }

                </div>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={"/patientLogin"} element={<PatientLogin />} />
                    <Route path={"/doctorLogin"} element={<DoctorLogin />} />
                    <Route path={"/managementLogin"} element={<ManagementLogin />} />
                    <Route path={"/patientSignup"} element={<PatientSignup/>}/>
                    <Route path={"/managementSignup"} element={<ManagementSignup/>}/>
                    <Route path={"/doctorSignup"} element={<DoctorSignup/>}/>
                    <Route path={"/:username/Dashboard"} element={<PatientDashboard/>}/>
                </Routes>
            </div>
        </Router>
        </div>
    );
};

export default App;
