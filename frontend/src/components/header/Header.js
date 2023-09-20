import React from 'react'
import {Link} from "react-router-dom"

import "./Header.css"
 const Header = () => {
  return (
   <>
    <div className='container'>
        <div className='logo'>
        <h2>BONSTAY</h2>
        </div>
        <div className='links'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/hotels">Hotels</Link></li>
                <li><Link to="/bookings">Bookings</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </div>
    </div>
   </>
  )
}
export default Header