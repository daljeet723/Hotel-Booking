import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import sample from "../../Images/hotels.jpg"

import AOS from 'aos';
import 'aos/dist/aos.css';

import "./Hotels.css";
const Hotels = () => {

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <>
            <div class="hotels-container" >
                <div className='heading'>
                    <h2 data-aos="fade-up"
                        data-aos-duration="3000"> FIND ME A ROOM </h2>
                </div>
                <div className='hotels-list'>
                    <div className='hotels-card'
                        data-aos="zoom-in-up">
                        <div className='hotel-image'>
                            <img src={sample} alt="hotel view" />
                        </div>
                        <div className='hotel-details'>
                            <h2> Paradise Stay</h2>
                            <p>City: Bangalore</p>
                            <p>Amenties: Bangalore</p>
                            <p>Address: Bangalore</p>
                            <p>Contact No: Bangalore</p>
                        </div>
                        <div className='hotel-contact'>
                            <Link to="/bookRoom">Book a Room</Link>
                            <Link to="/addReview">Add Review</Link>
                            <Link to="/viewReview">View Review</Link>
                        </div>
                    </div>

                    <div className='hotels-card'
                        data-aos="zoom-in-up">
                        <div className='hotel-image'>
                            <img src={sample} alt="hotel view" />
                        </div>
                        <div className='hotel-details'>
                            <h2> Paradise Stay</h2>
                            <p>City: Bangalore</p>
                            <p>Amenties: Bangalore</p>
                            <p>Address: Bangalore</p>
                            <p>Contact No: Bangalore</p>
                        </div>
                        <div className='hotel-contact'>
                            <Link to="/bookRoom">Book a Room</Link>
                            <Link to="/addReview">Add Review</Link>
                            <Link to="/viewReview">View Review</Link>
                        </div>
                    </div>


                    <div className='hotels-card'
                        data-aos="zoom-in-up">
                        <div className='hotel-image'>
                            <img src={sample} alt="hotel view" />
                        </div>
                        <div className='hotel-details'>
                            <h2> Paradise Stay</h2>
                            <p>City: Bangalore</p>
                            <p>Amenties: Bangalore</p>
                            <p>Address: Bangalore</p>
                            <p>Contact No: Bangalore</p>
                        </div>
                        <div className='hotel-contact'>
                            <Link to="/bookRoom">Book a Room</Link>
                            <Link to="/addReview">Add Review</Link>
                            <Link to="/viewReview">View Review</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hotels