import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import verifyEmail from "../../Images/verifyEmail.jpg";
import "./ForgetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { userVerifyOtp } from '../../actions/UserActions';



const OtpVerification = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const { userEmail } = useSelector(state => state.userFound);
  const {otpVerify, error} = useSelector(state =>state.forgotPassword);

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

  const userEnteredOTPString = otp.join("");
  const userEnteredOTPNumber = parseInt(userEnteredOTPString, 10);

  const handleVerifyAccount = (e) => {
    e.preventDefault();
    dispatch(userVerifyOtp(userEnteredOTPNumber,userEmail));
  };

 if(otpVerify){
  navigate("/resetPassword");
 }

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
              <p>Code sent to {userEmail}.</p>
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
              <div className='resend-otp'>
                <p>Time remaining: </p>
                <button type="button">Resend OTP</button>
              </div>

              {/* join otp on click of button */}
              <button type="submit" className='submitBtn'>
                Verify Account</button>

            </form>
            {error && <div className='error-message'>{error}</div>}


          </div>
        </div>
      </div>
    </>

  )
}

export default OtpVerification

// SOURCE: https://www.youtube.com/watch?v=qf56frPk5lA