import axios from "axios";

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
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
                type:USER_LOGIN_SUCCESS,
                payload: data
            })
    } catch (error) {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const userLogout = ()=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_LOGOUT_REQUEST
        });

        const data = await axios.get("api/v1/logout");
        dispatch({
            type:USER_LOGOUT_SUCCESS,
            payload:data.message
        })
    } catch (error) {
        dispatch({
            type:USER_LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}