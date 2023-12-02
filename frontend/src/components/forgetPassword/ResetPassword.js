import React, { useState } from 'react'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import login from "../../Images/login.jpg";
import "./ResetPassword.css";


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

  }
  return (
    <>
      <div className='reset-container'>
        <div className='reset-details'>

          <div className='reset-left-section'>
            <img src={login} alt="reset page" />
          </div>
          <div className='reset-password-right-section'>
            <h2>BonStay with Us</h2>
            <div className='reset-form-fields'>
              <form onSubmit={updatePassword}>
                <input type={showOldPassword ? "text": "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                {showOldPassword ? <RemoveRedEyeOutlinedIcon className='reset-show-password'
                  onClick={handleShowOldPassword} /> :
                  <VisibilityOffOutlinedIcon className='reset-show-password'
                    onClick={handleShowOldPassword} />
                }

                <input type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showNewPassword ? <RemoveRedEyeOutlinedIcon className='reset-show-password'
                  onClick={handleShowNewPassword} /> :
                  <VisibilityOffOutlinedIcon className='reset-show-password'
                    onClick={handleShowNewPassword} />
                }
                 <input type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? <RemoveRedEyeOutlinedIcon className='reset-show-password'
                  onClick={handleShowConfirmPassword} /> :
                  <VisibilityOffOutlinedIcon className='reset-show-password'
                    onClick={handleShowConfirmPassword} />
                }
                <button type="submit" className='submitBtn'>
                  Reset Password</button>

              </form>
            </div>


          </div>
        </div>
      </div>
    </>

  )
}

export default ForgetPassword