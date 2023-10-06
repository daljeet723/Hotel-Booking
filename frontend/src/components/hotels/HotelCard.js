import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import sample from "../../Images/hotels.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';


const HotelCard = ({ hotel }) => {

    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div className="hotels-card">

            <div className='hotel-image'>
                <img src={sample} alt="hotel view" />
            </div>
            <div className='hotel-details'>
                <h2> {hotel.hotelName}</h2>
                <p>City:{hotel.city}</p>
                <p>Amenties: Bangalore</p>
                <p>Address: {hotel.address}</p>
                <p>Contact No: {hotel.phoneNo}</p>
            </div>
            <div className='hotel-contact'>
                <Link to={'/bookHotel/'+hotel.hotelName+'/' + hotel._id}>Book a Room</Link>
                <Link to="/addReview">Add Review</Link>
                <Link to="/viewReview">View Review</Link>
            </div>

        </div >
    )
}

export default HotelCard