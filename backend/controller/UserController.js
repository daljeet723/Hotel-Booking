import { User } from "../model/User.js"
import { sendToken } from "../utils/jwtToken.js"
import { ErrorHandler } from ".././utils/ErrorHandler.js"


// User Profile
// Update profile
//Change password
// User Favorites: Implement APIs that allow users to save hotels to their favorites or wishlists.

export const registerUser = async (req, res) => {
    try {
        const { name, address, phoneNo, email, password } = req.body;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(401).json({
                success: false,
                message: "User already exists. Please Login"
            })
        }
        else {
            const user = await User.create({
                name, address, phoneNo, email, password
            });

            sendToken(user, 200, res);
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //check if user enetered both inputs
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter both email and paaword"
            });
            //return next(new ErrorHandler("Please enter both email and paaword", 401))
        }

        //check if user exists and password is false in db
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            //return next(new ErrorHandler("Invalid Email or Password", 401));
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordMatched = await user.comparePassword(password);

        if (isPasswordMatched) {
            sendToken(user, 200, res);

        }
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
            //return next(new ErrorHandler("Invali Email or Password", 401));
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }


}
export const userLogout = async (req, res, next) => {
    try {
        //expire session now 
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}
export const getAllUsers = async (req, res) => {
    try {
        //deducting password from getting details
        //const users = await User.find().select("-password");
        const users = await User.find().select("+password");

        return res.status(201).json({
            success: true,
            users
        })
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message
        })
    }
}