import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Hotels.css";
import { clearError, hotelList } from '../../actions/HotelActions';
import HotelCard from './HotelCard';
const Hotels = () => {
    const dispatch = useDispatch();

    const {loading, error, hotels} = useSelector(state =>state.hotels)

    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(()=>{
        if (error) {
            dispatch(clearError());
          }
        dispatch(hotelList());
    },[dispatch, error])
    return (
        <>
            <div class="hotels-container" >
                <div className='heading'>
                    <h2 data-aos="fade-up"
                        data-aos-duration="3000"> FIND ME A ROOM </h2>
                </div>
                <div className='hotels-list'>
                {hotels && hotels.map((hotel)=>(
                        <HotelCard key = {hotel._id} hotel = {hotel}/>
                    ))}
                    


                    {/* <div className='hotels-card'
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Hotels