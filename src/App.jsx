import {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import PatientLogin from './components/Patients/patientLogin.jsx';
import DoctorLogin from './components/Doctors/doctorLogin.jsx';
import ManagementLogin from './components/Management/managementLogin.jsx';
import './App.css';
import PatientSignup from "./components/Patients/patientSignup.jsx";
import ManagementSignup from "./components/Management/managementSignup.jsx";
import DoctorSignup from "./components/Doctors/doctorSignup.jsx";
import PatientDashboard from "./components/Patients/patientDashboard.jsx";
import DoctorDashboard from "./components/Doctors/doctorDashboard.jsx";
import ManagementDashboard from "./components/Management/managementDashboard.jsx";
const App = () => {
    const [user, setUser] = useState(sessionStorage.getItem('user') || "None");
    // Update sessionStorage when user state changes
    useEffect(() => {
        sessionStorage.setItem('user', user);
    }, [user]);

    function handleLogout() {
        setUser("None");
        sessionStorage.removeItem('user'); // Remove user authentication from sessionStorage on logout
    }

    return (
        <div className={"completebody"}>
        <Router>
            <div>
                <div className="topnav">
                    <Link to="/"><button>HOME</button></Link>
                    {user==="None"?
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
                    <Route path={"/patientLogin"} element={<PatientLogin user={user} setuser={setUser}/>} />
                    <Route path={"/doctorLogin"} element={<DoctorLogin user={user} setuser={setUser}/>} />
                    <Route path={"/managementLogin"} element={<ManagementLogin user={user} setuser={setUser}/>} />
                    <Route path={"/patientSignup"} element={<PatientSignup user={user} setuser={setUser}/>}/>
                    <Route path={"/managementSignup"} element={<ManagementSignup user={user} setuser={setUser}/>}/>
                    <Route path={"/doctorSignup"} element={<DoctorSignup user={user} setuser={setUser}/>}/>
                    <Route path={"/p/:username/Dashboard"} element={<PatientDashboard user={user} setuser={setUser}/>}/>
                    <Route path={"/d/:username/Dashboard"} element={<DoctorDashboard user={user} setuser={setUser}/>}/>
                    <Route path={"/m/:username/Dashboard"} element={<ManagementDashboard user={user} setuser={setUser}/>}/>
                </Routes>
            </div>
        </Router>
        </div>
    );
};

export default App;
