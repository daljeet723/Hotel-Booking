import axios from "axios";

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
//CLEARING ERRORS
export const clearError = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}