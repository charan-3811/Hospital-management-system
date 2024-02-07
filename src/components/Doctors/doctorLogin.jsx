// src/components/DoctorLogin.js
import  { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const DoctorLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post('http://localhost:4000/doctorLogin', {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                navigate('/doctorDashboard');
            } else {
                alert("User doesn't exist or incorrect credentials");
            }
        } catch (error) {
            console.error('Failed to login:', error);
            alert('Failed to login. Please try again.');
        }
    };

    return (
        <div className={"loginBox"}>

            <h2>Doctor Login</h2>
            <div className={"form-container"}>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} placeholder={"Enter Username"} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} placeholder={"Enter Password"} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>
                    Login
                </button><br/>
                <p>New user? <Link to={"/doctorSignup"}>Signup Here</Link></p>
            </form>
                </div>
        </div>
    );
};

export default DoctorLogin;
