import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import "./Header.css"
import { userLogout } from '../../actions/UserActions';
const Header = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleHotelsTabClick = () => {
        window.location.reload();
        navigate('/hotels');
    };
    const handleLogout = () => {
        dispatch(userLogout());
        navigate("/login")
    }
    return (
        <>
            <div className='container'>
                <div className='logo'>
                    <h2> <Link to="/">BonStay</Link></h2>
                </div>
                <div className='links'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li onClick={handleHotelsTabClick}><Link to="/hotels">Hotels</Link></li>
                        <li><Link to="/bookings">Bookings</Link></li>
                    </ul>
                </div>
                <div className='welcome'>
                    {user ? <p>Welcome {user.name}</p> : <p>Welcome</p>}
                </div>
                <div className='sign-in-div'>
                
                    {user ? (
                        // If user is logged in, display Logout link

                        <Link to="/login" className="login-btn">

                            <p onClick={handleLogout}>Logout</p>
                        </Link>
                    ) : (
                        // If user is not logged in, display Login link
                        <Link to="/login" className="login-btn">
                            <p>Login</p>
                        </Link>
                    )}
                </div>
            </div>
        </>
    )
}
export default Header