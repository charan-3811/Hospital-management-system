// src/components/DoctorLogin.js
import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const DoctorLogin = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const {user,setuser}=props

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/doctorLogin', {
                username: username,
                password: password,
            });

            console.log(response.data);

            if (response.data === 'you are ready to login') {
                setuser("doctor")
                navigate(`/d/${username}/Dashboard`);
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
            {user==="doctor"?
                <div>
                    <h1>you have already logged in </h1>
                </div>
                : user==="None"?
                    <div>
                        <h2>Doctor Login</h2>
                        <div className={"form-container"}>

                            <form onSubmit={handleLogin}>
                                <label>
                                    Username:
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </label>
                                <br />
                                <label>
                                    Password:
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </label>
                                <br />
                                <button type="submit">Login</button>
                            </form>
                            <p>New user? <Link to="/doctorSignup">Signup Here</Link></p>
                        </div>
                    </div>
                    :
                    <div>
                        <h1>you dont have access to this page</h1>
                    </div>
            }

        </div>
    );
};

export default DoctorLogin;
