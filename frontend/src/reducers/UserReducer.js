import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
    error: null
}
const handleAuthRequest = (state) => {
    state.loading = true;
    state.isAuthenticated = false
};
const handleAuthFail = (state, action) => {
    state.loading = false;
    state.user = null;
    state.error = action.payload;
    state.isAuthenticated = false;
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("USER_LOGIN_REQUEST", (state) => {
            handleAuthRequest(state);
        })
        .addCase("USER_LOGIN_SUCCESS", (state, action) => {
            state.loading = false;
    state.message = action.payload.message;
    state.user = action.payload.user;
    state.isAuthenticated = true;
        })
        .addCase("USER_LOGIN_FAIL", (state, action) => {
            handleAuthFail(state, action);
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
            state.isAuthenticated = true;
        })

        //REGISTER
        .addCase("USER_REGISTER_REQUEST", (state) => {
            handleAuthRequest(state);
        })
        .addCase("USER_REGISTER_SUCCESS", (state, action) => {
            state.loading = false;
            state.message = action.payload.data.message;
            state.user = action.payload.data.user;
            state.isAuthenticated = true;
        })
        .addCase("USER_REGISTER_FAIL", (state, action) => {
            handleAuthFail(state, action);
        })

        .addCase("CLEAR_ERRORS", (state) => {
            state.error = null;
        })
})
