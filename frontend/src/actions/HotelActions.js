// Someone (maybe a user) does something in your app, 
// like clicking a button. This triggers an action,
//  which is like adding a new page to your story.
// Therefore, actions are like notes about what happened,

import axios from "axios";

import {
    ALL_HOTEL_FAIL,
    ALL_HOTEL_REQUEST,
    ALL_HOTEL_SUCCESS,
    CLEAR_ERRORS
} from "../constants/HotelConstants.js"

export const hotelList = () => async (dispatch) => {
    try {
        console.log('Dispatching ALL_HOTEL_REQUEST');
        dispatch({
            type: ALL_HOTEL_REQUEST
        });

        const { data } = await axios.get("/api/v1/hotels");

        console.log('Dispatching ALL_HOTEL_SUCCESS');
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


//CLEARING ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}