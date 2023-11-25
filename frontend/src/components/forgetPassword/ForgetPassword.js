import React, { useState } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import login from "../../Images/login.jpg";
import "./ForgetPassword.css";


const ForgetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowOldPassword =()=>{
    setShowOldPassword(!showOldPassword);
  }
  const handleShowNewPassword =()=>{
    setShowNewPassword(!showNewPassword);
  }
  const handleShowConfirmPassword =()=>{
    setShowConfirmPassword(!showConfirmPassword);
  }
  const updatePassword =(e)=>{
    e.preventDefault();
   console.log("old - ", oldPassword);
   console.log("new - ", newPassword);
   console.log("confirm - ", confirmPassword);
  }
  return (
    <>
      <div className='forgot-container'>
        <div className='forgot-details'>

          <div className='forgot-left-section'>
            <img src={login} alt="Forgot page" />
          </div>
          <div className='forgot-password-right-section'>
            <h2>BonStay with Us</h2>
            <div className='forgot-form-fields'>
              <form onSubmit={updatePassword}>
                <input type={showOldPassword ? "text": "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {showOldPassword ? <RemoveRedEyeOutlinedIcon className='forgot-show-password'
                  onClick={handleShowOldPassword} /> :
                  <VisibilityOffOutlinedIcon className='forgot-show-password'
                    onClick={handleShowOldPassword} />
                }

                <input type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showNewPassword ? <RemoveRedEyeOutlinedIcon className='forgot-show-password'
                  onClick={handleShowNewPassword} /> :
                  <VisibilityOffOutlinedIcon className='forgot-show-password'
                    onClick={handleShowNewPassword} />
                }
                 <input type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? <RemoveRedEyeOutlinedIcon className='forgot-show-password'
                  onClick={handleShowConfirmPassword} /> :
                  <VisibilityOffOutlinedIcon className='forgot-show-password'
                    onClick={handleShowConfirmPassword} />
                }
                <button type="submit" className='submitBtn'>
                  Update Password</button>

              </form>
            </div>


          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPassword