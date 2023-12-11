import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import verifyEmail from "../../Images/verifyEmail.jpg";
import {clearError, userForgotPassword} from "../../actions/UserActions";
import "./ForgetPassword.css";
import { useDispatch, useSelector } from 'react-redux';

const ForgetPassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const { error, success, isAuthenticated} = useSelector(state => state.forgotPassword)

  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(userForgotPassword(email));
  }

  useEffect(()=>{
    if (error) {
      dispatch(clearError);
    }
    if (isAuthenticated) {
      navigate("/OtpVerification");
    }
  }, [dispatch, error, isAuthenticated])


  return (
    <>
      <div className='forgot-container'>
        <div className='forgot-details'>

          <div className='forgot-left-section'>
            <img src={verifyEmail} alt="forgot page" />
          </div>
          <div className='forgot-right-section'>
            
              <form onSubmit={submitHandler}>
              <h2>Email Verification</h2>
                <input type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className='submitBtn'>
                  Send OTP</button>

              </form>
              {error && <div className='error-message'>{error}</div>}


          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPassword

// SOURCE: https://www.youtube.com/watch?v=qf56frPk5lA