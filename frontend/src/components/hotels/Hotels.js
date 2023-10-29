import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Hotels.css";
import { clearError, hotelList } from '../../actions/HotelActions';
import HotelCard from './HotelCard';

import SearchIcon from '@mui/icons-material/Search';
import Slider from "@material-ui/core/Slider";
import { Typography } from '@mui/material';
import Rating from "react-rating-stars-component";

const categories = [
    "Single Bedroom",
    "Double Bedroom",
    "Master Bedroom"
];

const Hotels = () => {
    const dispatch = useDispatch();

    const { error, hotels } = useSelector(state => state.hotels)
    const [keyword, setKeyword] = useState("");

    const [price, setPrice] = useState([0,25000]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const navigate = useNavigate();

    const priceHandler =(event, newPrice)=>{
        setPrice(newPrice);
    }

    // HANDLE SEARCH Selection
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
        dispatch(hotelList(keyword,price, selectedCategory, selectedRating));
    }, [dispatch, keyword, price, selectedCategory, selectedRating, error])


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

                {/* DISPLAY HOTELS */}
                <div className='hotels-list'>
                    {hotels && hotels.map((hotel) => (
                        <HotelCard key={hotel._id} hotel={hotel} />
                    ))}

                </div>

                {/* FILTERS SECTION  */}
                <div className='filterBox'>
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                     <Typography className="filterPrice">
                        <div>Rs:{price[0]}</div>
                        <div>Rs:{price[1]}</div>
                    </Typography>
                    <div className='split'></div>

                    <Typography className="categoryBox">Category</Typography>
                    <ul className="categoryList">

                        {/* loop through array */}
                        {categories.map((category) => {
                            return <li className="category-link"
                                key={category}
                                onClick={() => setSelectedCategory(category)}>
                                {category}
                            </li>
                        })}
                    </ul>
                    <div className='split'></div>
                    <Typography className="categoryBox">Rating</Typography>
                    <Rating className='rating'
                        count={5}
                        value={selectedRating}
                        onChange={(rating) => setSelectedRating(rating)}
                        size={24}
                        activeColor="tomato"
                    />
                      <div className='split'></div>
                </div>
            </div>
        </>
    )
}

export default Hotels