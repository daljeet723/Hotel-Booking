import React, { useState } from 'react'
import { Link } from "react-router-dom";
import "./Login.css";
import login from "../../Images/login.jpg"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        alert("Login");
    }
    return (
        <>
            <div className='login-container'>
                <div className='login-details'>
                    <div className='left-section'>
                        <img src={login} alt="login page" />
                    </div>
                    <div className='right-section'>
                        <h2>BonStay with Us</h2>
                        <div className='form-fields'>
                            <form onSubmit={submitHandler}>
                                <input type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit">
                                    Login</button>
                            </form>
                        </div>
                        <div className='signup'>
                            <p><span><Link to="/register">Sign Up</Link></span> to create new account.</p>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}
export default Login
