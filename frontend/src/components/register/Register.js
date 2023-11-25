import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import login from "../../Images/login.jpg"
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import "./Register.css"
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../actions/UserActions';
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { message, error} = useSelector((state) => state.user);

    const handleTogglePassword = (e) => {
        setShowPassword(!showPassword)
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(userRegister(name, address, phoneNo, email, password));
        console.log("message :" + message);

    }

    useEffect(() => {
        if (error) {
            console.error('Error:', error);
        } else if (message === 'Logged in successfully') {
            // Redirect to the hotels page upon successful login
            dispatch({ type: 'CLEAR_ERRORS' });
            navigate('/hotels'); // Use navigate instead of history.push
        }
    }, [error, message, navigate, dispatch]);

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
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {showPassword ? <RemoveRedEyeOutlinedIcon className='register-show-password-icon'
                                    onClick={handleTogglePassword} /> :
                                    <VisibilityOffOutlinedIcon className='register-show-password-icon'
                                        onClick={handleTogglePassword} />
                                }
                                <button type="submit">
                                    Regsiter</button>
                            </form>
                        </div>
                        <div className='register-signup'>
                            <p><span><Link to="/login">Login</Link></span> with your existing account.</p>
                            {error && <div className='error-message'>{error}</div>}
                        </div>

                    </div>
                </div>
            </div>
        </>

    )

}

export default Register