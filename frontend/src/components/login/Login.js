import React, { useEffect, useState } from 'react'
import { Link , useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import login from "../../Images/login.jpg"
import { UserLogin } from '../../actions/UserActions';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { message, error,user} = useSelector((state) => state.user);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(UserLogin(email, password));
       
    }
    useEffect(() => {
        if (error) {
          console.error('Error:', error);
        } else if (message === 'Logged in successfully') {
          // Redirect to the hotels page upon successful login
          console.log("message :"+message);
          dispatch({ type: 'CLEAR_ERRORS' });
          navigate('/hotels'); // Use navigate instead of history.push
        }
      }, [error, message, navigate, dispatch]);

        // If user is already logged in, redirect to hotels page
  useEffect(() => {
    if (user) {
      navigate('/hotels');
    }
  }, [user, navigate]);
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
                            {error && <div className='error-message'>{error}</div>}
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </>

    )
}
export default Login
