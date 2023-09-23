import React, { useState } from 'react'
import { Link } from "react-router-dom";
import login from "../../Images/login.jpg"
import "./Register.css"
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        alert("Regsiter");
    }
    return (
        <>
            <div className='register-container'>
                <div className='register-details'>
                    <div className='register-left-section'>
                        <img src={login} alt="register page" />
                    </div>
                    <div className='register-right-section'>
                        <h2>BonStay with Us</h2>
                        <div className='register-form-fields'>
                            <form onSubmit={submitHandler}>
                            <input type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <input type="number"
                                    placeholder="Contact"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                />

                                <input type="email"
                                    placeholder="Email ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit">
                                    Regsiter</button>
                            </form>
                        </div>
                        <div className='register-signup'>
                            <p><span><Link to="/login">Login</Link></span> with your existing account.</p>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )

}

export default Register