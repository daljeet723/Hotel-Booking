import axios from "axios";
import { createAction } from '@reduxjs/toolkit';
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_FORGOTPASSWORD_REQUEST,
    USER_FORGOTPASSWORD_SUCCESS,
    USER_FORGOTPASSWORD_FAIL,
    VERIFY_OTP_FAILURE,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_REQUEST,
    CLEAR_ERRORS
} from "../constants/UserConstants";

export const UserLogin = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const { data } = await axios.post("api/v1/login", {
            email,
            password,
        },
            {
                header: {
                    "content-type": "application/json"
                }
            });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const userLogout = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGOUT_REQUEST
        });

        const data = await axios.get("api/v1/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const userRegister = (name, address, phoneNo, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const data = await axios.post("api/v1/register", {
            name, address, phoneNo, email, password
        },
            {
                header: {
                    "content-type": "application/json"
                }
            }
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const userForgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOTPASSWORD_REQUEST
        });

        const config = { headers: { "Content-Type": "application/json" } };
        const data = await axios.post("api/v1/forgotPassword", {
            email,
            config
        });
        dispatch({
            type: USER_FORGOTPASSWORD_SUCCESS,
            payload: data.data, // Extract the 'data' property from the response ie from redux state
          });
          
    } catch (error) {
        dispatch({
            type: USER_FORGOTPASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
}

export const userVerifyOtp =(enteredOtp,userEmail)=>async (dispatch)=>{
    try {
        dispatch({
            type:VERIFY_OTP_REQUEST
        });

        const data = await axios.post("api/v1/verify-otp",{enteredOtp, userEmail});
        dispatch({
            type:VERIFY_OTP_SUCCESS,
            payload: data.data
        })
    } catch (error) {
        dispatch({
            type:VERIFY_OTP_FAILURE,
            payload: error.response.data.message||"Failed to verify OTP"
        })
    }
}

export const userFoundAction = createAction('userFound/userFoundAction', (email) => ({
    payload:{
        userEmail:email
    }
  }));

//CLEARING ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}


//=====================
// createAction Function:
// export const userFoundAction = createAction('userFound/userFoundAction', (email) => ({
//   payload: email,
// }));

// This function is part of Redux Toolkit and is used to create a Redux action. It takes two arguments:
// The first argument is the action type, which is a string that identifies the type of the action.
// The second argument is a function that defines how to create the action payload.
// (email) => ({ payload: email }):

// This is the second argument passed to createAction.
// It's an arrow function that takes one parameter, email.
// It returns an object with a payload property, where the value of payload is the email parameter.
// In simpler terms, this function is saying:

// "When you call userFoundAction with an email argument,
//create an action with the type 'userFound/userFoundAction' and include the email in the payload property."
