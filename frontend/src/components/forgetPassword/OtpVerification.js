import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import verifyEmail from "../../Images/verifyEmail.jpg";
import "./ForgetPassword.css";
import { useDispatch, useSelector } from 'react-redux';
import { userForgotPassword, userVerifyOtp } from '../../actions/UserActions';



const OtpVerification = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);

  const { userEmail } = useSelector(state => state.userFound);
  const { otpVerify, error } = useSelector(state => state.forgotPassword);

  //Function to set otp in array string 
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

  //function to resend otp
  const resendOtp = () => {
   setMinutes(0);
   setSeconds(10);
   dispatch(userForgotPassword(userEmail));
  }

  //function to verify OTP
  const handleVerifyAccount = (e) => {
    e.preventDefault();
    dispatch(userVerifyOtp(userEnteredOTPNumber, userEmail));
  };

  if (otpVerify) {
    navigate("/resetPassword");
  }

  //set timer for otp
  useEffect(()=>{
    const interval = setInterval(()=>{
      //Decrease seconds if greater than 0
      if(seconds >0){
        setSeconds(seconds - 1);
      }

      //When seconds reach 0, decrease minutes if greater than 0
      if(seconds === 0){
        if(minutes === 0){
          //Stop countdown when both mins and seconds reach to 0
          clearInterval(interval);
        }
        else{
          //Reset seconds to 59, and decrease mins by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    },1000);
    return ()=>{
      //Cleanup: stop the interval when components unmounts
      clearInterval(interval);
    };
  },[seconds]);// Re-run this effect whenever "seconds" change

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
                <p>Time Left: {" "}
                  <span style={{ fontWeight: 600 }}>
                    {minutes < 10 ? `0${minutes}` : minutes}:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </span></p>

                {/* button to resend otp */}
                <button
                  disabled={seconds > 0 || minutes > 0}
                  style={{ color: seconds > 0 || minutes > 0 ? "#B6BBC4" : "#FF5630" }}
                  onClick={resendOtp}>
                  Resend OTP
                </button>
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