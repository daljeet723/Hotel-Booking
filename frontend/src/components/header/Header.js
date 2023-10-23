import React from 'react'
import { Link, useNavigate } from "react-router-dom"

import "./Header.css"
const Header = () => {

    const navigate = useNavigate();
    const handleHotelsTabClick = () => {
        window.location.reload();
        navigate('/hotels');
      };
    return (
        <>
            <div className='container'>
                <div className='logo'>
                    <h2> <Link to ="/">BonStay</Link></h2>
                </div>
                <div className='links'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li onClick={handleHotelsTabClick}><Link to="/hotels">Hotels</Link></li>
                        <li><Link to="/bookings">Bookings</Link></li>
                    </ul>
                </div>
                <div className='sign-in-div'>
                    <Link to="/login" className="login-btn">
                        <p>Login
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Header