import mongoose from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [3, "Name should be atleast 3 characters"]
    },
    "address": {
        type: String,
        required: [true, "Please enter your address"],
    },
    "phoneNo": {
        type: Number,
        required: [true, "Please enter your Contact details"],
        maxLength: [10, "Length should not exceed 10 digits"]
    },
    "email": {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    "password": {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be atleast 8 characters"],
        select: false
    },
    "otp":{
        type: Number
    }
});


//a Mongoose pre-save middleware function is used to hash the password before saving it to the database. 
//Before hashing, it checks that the password length doesn't exceed 12 characters. 
//If it does, it returns an error, preventing the password from being saved. 
//Adjust the salt rounds (e.g., 10 in this example) as needed for your security requirements.

userSchema.pre("save", async function (next) {
    // Only hash the password if it's being modified or is new
    if (!this.isModified('password')) {
        return next();
    }

    // Ensure that the password length doesn't exceed 12 characters
    if (this.password.length < 8) {
        return next(new Error("Password should be atleast 8 characters"));
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(this.password, 10); // Adjust the salt rounds as needed
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});


//Create token 
userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

//compare user entered pwsd with hashed pswd
userSchema.methods.comparePassword = async function (password) {
    // console.log("Input password: " + password);
    // console.log("Stored hashed password: " + this.password);

    try {
        const isMatch = await bcrypt.compare(password, this.password);
        // console.log("Password comparison result: " + isMatch);

        return isMatch;
    } catch (error) {
        console.error("Error comparing passwords: " + error);
        throw error; // Rethrow the error for better error handling
    }

}
export const User = mongoose.model("User", userSchema);