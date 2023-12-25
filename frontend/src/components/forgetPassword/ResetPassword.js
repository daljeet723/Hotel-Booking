import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import login from "../../Images/login.jpg";
import "./ResetPassword.css";
import { userResetPassword } from '../../actions/UserActions';


const ForgetPassword = () => {

  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isButtonDisabled = !newPassword || !confirmPassword;

  const { userEmail } = useSelector(state => state.userFound);

 
  const handleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const updatePassword = (e) => {
    e.preventDefault();
    dispatch(userResetPassword(newPassword, confirmPassword, userEmail));

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
                <button
                  disabled={isButtonDisabled} type="submit" className='submitBtn'
                  style={{backgroundColor: isButtonDisabled ? "#B6BBC4" : "#75C2F6"}}>
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