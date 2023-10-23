// Import createReducer from @reduxjs/toolkit
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    hotels: [],
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
