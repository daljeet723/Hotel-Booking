import { User } from "../model/User.js"
import { sendToken } from "../utils/jwtToken.js"
import { ErrorHandler } from ".././utils/ErrorHandler.js";
import { sendEmail } from "../utils/SendEmail.js";


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

export const forgotPassword = async (req, res) => {
    //Generate 6 digit random number
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const user = await User.findOneAndUpdate(
        { email: req.body.email }, // Find the user by email
        { otp: otp }, // Update the user document with the OTP
        { new: true } // Return the updated user document
    );
    //const user =req.body.email ;
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found!"
        });
    }

    const userEmail = user.email;

    //save user who already login
    await user.save({ validateBeforeSave: false });

    // If you want to store otp in user's session
    // req.session.otp = otp;

    const message = 'Please use the verification code below to sign in. \n\n' + otp + '\n\n\nIf you have not request this, please ignore this email.\n\n\nThanks\nBonStay Team';

    try {
        await sendEmail({
            email: userEmail,
            subject: "BonStay password Recovery",
            message
        });
        return res.status(200).json({
            success: true,
            message: 'OTP sent successfully with otp '+otp,
            userEmail
        });
    } catch (error) {
        //await user.save({ validateBeforeSave: false });
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const verifyOtp = async (req, res) => {
    try {

        //gtting user otp and email from component
        const enteredOtp = req.body.enteredOtp;
        const userEmail = req.body.userEmail;

        //find user in database
        const user = await User.findOne({ email: userEmail });

        //match user entered otp with otp stored in dn
        if (enteredOtp === user.otp) {
            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully'
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: 'Sorry, OTP does not match!!'
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    try {
        //Find user in database
        const email = req.body.userEmail;
        const user = await User.findOne({email});

        if (req.body.newPassword != req.body.confirmPassword) {
            return res.send(500).json({
                success: false,
                message: "Password does not match!!"
            })
        }

        //reset password
        user.password = req.body.newPassword;
        user.otp ="";

        await user.save();
        //immediately login user after change password
        sendToken(user, 200, res);
    //    return res.status(200).json({
    //     success:true,
    //     message:"Password changes successfully"
    //    });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
