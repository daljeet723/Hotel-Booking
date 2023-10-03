import jwt from "jsonwebtoken"
import {ErrorHandler} from "../utils/ErrorHandler.js"
import { User } from "../model/User.js";

//We define a middleware function that checks for the presence of a JWT token in the Authorization header of the HTTP request.
// If a valid token is found, it decodes the token
// and stores the user information in req.user.
export const isUserLogin = async(req, res, next)=>{
try {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    const decodeCode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeCode.id);
    next(); // callback function

} catch (error) {
    return res.status(401).json({
        success: false,
        message: error.message
    })
}
}