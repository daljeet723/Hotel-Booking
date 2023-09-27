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
        required: [true, "Please enter your name"],
        maxLength: [10, "Length should not exceed 10 digits"]
    },
    "email": {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Plesae Enter Valid Email"]
    },
    "password": {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be atleast 8 characters"],
        maxLength: [12, "Password cannot exceed 12 characters"],
        select: false
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.getJWTToken = function () {
    return jwt.sign(
        { id: this.id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

//compare user entered pwsd with hashed pswd
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)

}
export const User = mongoose.model("User", userSchema);