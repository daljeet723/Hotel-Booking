import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import sample from "../../Images/hotels.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';


const HotelCard = ({ hotel }) => {

    const options = {
        edit: false,
        // color: "#434242",
        color: "#B4B4B3",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,// window width < 600 px star size will be 20 else 25 
        value: hotel.ratings,
        isHalf: true,
        // isHalf ie take value with decimal value also 2.5
    };

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
                {/* <p>Amenties: Bangalore</p> */}
                <p>Address: {hotel.address}</p>
                <p>Contact: {hotel.phoneNo}</p>
                <h3>Starting price: &#8377;{hotel.price} </h3>
                <ReactStars {...options} /> 
                
                
            </div>
            <div className='hotel-contact'>
                <Link to={'/hotel/'+hotel._id}>Book a Room</Link>
                <Link to="/addReview">Add Review</Link>
                <Link to="/viewReview">View Review</Link>
            </div>

        </div >
    )
}

export default HotelCard