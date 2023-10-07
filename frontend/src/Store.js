import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk';

//composeWithDevTools: This is from the Redux DevTools extension, 
//providing a way to connect your Redux store to the DevTools for debugging.
import {composeWithDevTools} from "redux-devtools-extension";
import {hotelsReducer} from "./reducers/HotelReducers.js";

const reducer = combineReducers({
    hotels : hotelsReducer
});

let initialState ={};

//An array containing middleware functions. 
//In this case, it includes the thunk middleware for handling asynchronous actions.
const middleware = [thunk];

//This code creates the Redux store using createStore. 
//It takes the combined reducer (reducer), the initial state (initialState), and applies middleware, 
//including the Redux DevTools extension for enhanced debugging.
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
//for store maintain 3 things --> reducers, actions, constants