import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import verifyEmail from "../../Images/verifyEmail.jpg";
import "./ForgetPassword.css";

const ForgetPassword = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submitHandler =()=>{
    navigate("/OtpVerification");
  }

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


          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPassword

// SOURCE: https://www.youtube.com/watch?v=qf56frPk5lA