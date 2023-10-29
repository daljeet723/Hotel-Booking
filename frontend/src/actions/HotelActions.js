// Someone (maybe a user) does something in your app, 
// like clicking a button. This triggers an action,
//  which is like adding a new page to your story.
// Therefore, actions are like notes about what happened,

import axios from "axios";

import {
    ALL_HOTEL_FAIL,
    ALL_HOTEL_REQUEST,
    ALL_HOTEL_SUCCESS,
    HOTEL_DETAIL_SUCCESS,
    HOTEL_DETAIL_REQUEST,
    HOTEL_DETAIL_FAIL,
    CLEAR_ERRORS
} from "../constants/HotelConstants.js"

export const hotelList = (keyword="",price = [0, 25000], selectedCategory, selectedRating = 0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_HOTEL_REQUEST
        });

        let link = "/api/v1/hotels?keyword=" + keyword + "&price[gt]=" + price[0] + "&price[lt]=" + price[1] + "&ratings[gte]=" + selectedRating

        if(selectedCategory){
            link = "/api/v1/hotels?keyword=" + keyword + "&price[gt]=" + price[0] + "&price[lt]=" + price[1] + "&ratings[gte]=" + selectedRating + "&category=" + selectedCategory
        }
        const { data } = await axios.get(link);

        dispatch({
            type: ALL_HOTEL_SUCCESS,
            payload: data.hotels
        });
    } catch (error) {
        console.log('Dispatching ALL_HOTEL_FAIL');
        dispatch({
            type: ALL_HOTEL_FAIL,
            payload: error.response.data.message
        });
    }
};

export const hotelDetailAction = (id) => async (dispatch)=>{
    try {
       dispatch({
        type:HOTEL_DETAIL_REQUEST
       })

       const {data} = await axios.get('/api/v1/hotel/' + id);

       dispatch({
        type: HOTEL_DETAIL_SUCCESS,
        payload: data.hotelDetail
       });

    } catch (error) {
        dispatch({
            type: HOTEL_DETAIL_FAIL,
            payload: error.response.data.message
        });
    }
}

//CLEARING ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}