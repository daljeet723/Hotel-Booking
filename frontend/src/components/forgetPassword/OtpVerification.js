import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import verifyEmail from "../../Images/verifyEmail.jpg";
import "./ForgetPassword.css";



const ForgetPassword = () => {

  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) =>
      idx === index ? element.value : d)
    ]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  }

  const handleVerifyAccount = (e) => {
    e.preventDefault();
    alert("Entered OTP is " + otp.join(""))
  };

  return (
    <>
      <div className='forgot-container'>
        <div className='forgot-details'>

          <div className='otp-left-section'>
            <img src={verifyEmail} alt="forgot page" />
          </div>
          <div className='otp-right-section'>

            <form onSubmit={handleVerifyAccount}>
              <h2>OTP Verification</h2>
              <p>We have sent a code to your email.</p>
              <div className='otp'>
                {otp.map((data, index) => {
                  return (
                    <input className='otp-field'
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={e => handleChange(e.target, index)}
                      onFocus={e => e.target.select()}
                    />
                  );
                })}
              </div>

              {/* join otp on click of button */}
              <button type="submit" className='submitBtn'>
                Verify Account</button>

            </form>


          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPassword

// SOURCE: https://www.youtube.com/watch?v=qf56frPk5lA