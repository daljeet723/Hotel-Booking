import jwt from "jsonwebtoken"
import {ErrorHandler} from "../utils/ErrorHandler.js"
import { User } from "../model/User.js";

//We define a middleware function that checks for the presence of a JWT token in the Authorization header of the HTTP request.
// If a valid token is found, it decodes the token
// and stores the user information in req.user.
export const isUserLogin = async(req, res, next)=>{
try {
    //It first checks if there is a token present in the request's cookies.
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401));
    }

    //If a token is present, it attempts to verify the token using the jwt.verify method.
    const decodeCode = jwt.verify(token, process.env.JWT_SECRET);

    //It then attempts to find the user in the database based on the decoded user ID.
    req.user = await User.findById(decodeCode.id);

    //If everything is successful, the next() callback function is called, allowing the request to proceed to the next middleware or route handler.
    next();

} catch (error) {
    if (error.name === 'TokenExpiredError') {
        // Handle token expiration separately
        return res.status(401).json({
          success: false,
          message: 'Token has expired. Please log in again.',
        });
      }
      
    return res.status(401).json({
        success: false,
        message: error.message
    })
}
}