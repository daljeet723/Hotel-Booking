// Import createReducer from @reduxjs/toolkit
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    hotels: [],
};

// Use createReducer to define state mutations based on action types
export const hotelsReducer = createReducer(initialState, {
    "ALL_HOTEL_REQUEST": (state) => {
        state.loading = true;
    },
    "ALL_HOTEL_SUCCESS": (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
    },
    "ALL_HOTEL_FAIL": (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    "CLEAR_ERRORS": (state) => {
        state.error = null;
    },
});
