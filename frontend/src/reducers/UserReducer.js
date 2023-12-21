import { createReducer } from "@reduxjs/toolkit";
import { userFoundAction } from "../actions/UserActions";

const initialState = {
    loading: true,
    error: null,
    isAuthenticated: false,
    user: null,
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

export const forgotPasswordReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("USER_FORGOTPASSWORD_REQUEST", (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase("USER_FORGOTPASSWORD_SUCCESS", (state, action) => {
            state.loading = false;
            state.message = action.payload.message; // Extract 'message' property from redux state
            state.isAuthenticated = true;
            state.userEmail = action.payload.userEmail;
        })
        .addCase("USER_FORGOTPASSWORD_FAIL", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase("VERIFY_OTP_REQUEST", (state) => {
            state.loading = true;
            state.otpVerify = false;
        })
        .addCase("VERIFY_OTP_SUCCESS", (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.otpVerify = true;
        })
        .addCase("VERIFY_OTP_FAILURE", (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.otpVerify = false;
        })

        .addCase("CLEAR_ERRORS", (state) => {
            state.error = null;
        })

})

export const userFoundReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(userFoundAction, (state, action) => {
            state.isAuthenticated = true;
            state.userEmail = action.payload.userEmail
        })
        .addCase("CLEAR_ERRORS", (state) => {
            state.error = null;
        })
})