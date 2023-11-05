import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    loading: true,
    error:null
}

export const userLoginReducer = createReducer(initialState,(builder) =>{
    builder
    .addCase("USER_LOGIN_REQUEST", (state) => {
        state.loading = true;
    })
    .addCase("USER_LOGIN_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.isAuthenticated = true;
    })
    .addCase("USER_LOGIN_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
    })

    //LOGOUT
    .addCase("USER_LOGOUT_REQUEST", (state) => {
        state.loading = true;
    })
    .addCase("USER_LOGOUT_SUCCESS", (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.isAuthenticated = false;
        state.user = null;
    })
    .addCase("USER_LOGOUT_FAIL", (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true
    })

    .addCase("CLEAR_ERRORS", (state) => {
        state.error = null;
    })
})