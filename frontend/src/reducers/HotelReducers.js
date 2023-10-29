// Import createReducer from @reduxjs/toolkit
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    hotels: [],
    hotelDetail:[],
    error:null
};

// Use createReducer to define state mutations based on action types
export const hotelsReducer = createReducer(initialState,(builder)=> {
    builder
    .addCase("ALL_HOTEL_REQUEST", (state) => {
        state.loading = true;
    })
    .addCase("ALL_HOTEL_SUCCESS", (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
    })
    .addCase("ALL_HOTEL_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
    })
});

export const hotelDetailReducer = createReducer(initialState,(builder)=> {
    builder
    .addCase("HOTEL_DETAIL_REQUEST", (state) => {
        state.loading = true;
    })
    .addCase("HOTEL_DETAIL_SUCCESS", (state, action) => {
        state.loading = false;
        state.hotelDetail = action.payload;
    })
    .addCase("HOTEL_DETAIL_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })
})