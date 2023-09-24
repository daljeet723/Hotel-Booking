import mongoose from "mongoose";
import validator from "validator"
const userSchema = new mongoose.Schema({
    "name":{
        type:String,
        require:[true, "Please enter your name"],
        minLength:[3, "Name should be atleast 3 characters"]
    },
    "address":{
        type:String,
        require:[true, "Please enter your address"],
    },
    "phoneNo":{
        type:Number,
        require:[true, "Please enter your name"],
        maxLength:[10, "Length should not exceed 10 digits"]
    },
    "email":{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Plesae Enter Valid Email"]
    },
    "password":{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8, "Password should be atleast 8 characters"],
        maxLength:[12, "Password cannot exceed 12 characters" ],
        select:false
    }
});

export const User = mongoose.model("User", userSchema);