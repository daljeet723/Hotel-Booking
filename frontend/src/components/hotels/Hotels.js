import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Hotels.css";
import { clearError, hotelList } from '../../actions/HotelActions';
import SearchIcon from '@mui/icons-material/Search';
import HotelCard from './HotelCard';
const Hotels = () => {
    const dispatch = useDispatch();

    const { error, hotels } = useSelector(state => state.hotels)
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate("/hotels/" + keyword)
        }
        else {
            navigate("/hotels");
        }

    }


    //Function to handle Enter key press for Search button
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Prevent default form submission behavior
            event.preventDefault();
            //when Enter key is pressed, trigger the search
            handleSearch(event)
        }
    }
    useEffect(() => {
        AOS.init();
    }, [])

    useEffect(() => {
        if (error) {
            dispatch(clearError());
        }
        dispatch(hotelList(keyword));
    }, [dispatch, keyword, error])


    return (
        <>
            <div className="hotels-container" >
                <div className='heading'>
                    <h2 data-aos="fade-down"
                        data-aos-duration="3000"> FIND ME A ROOM
                    </h2>
                    <form className='searchBox' onSubmit={handleSearch}>
                        <input type='text'
                            placeholder='Search for hotels ....'
                            value={keyword}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="search-button">
                            <i className="search-icon"> <SearchIcon /></i>
                        </button>
                    </form>
                </div>
                <div className='hotels-list'>
                    {hotels && hotels.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))}

                </div>
            </div>
        </>
    )
}

export default Hotels