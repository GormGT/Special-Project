// imports
const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please enter a username."]
    },
    email : {
        type : String,
        required : [true, "Please enter an email."],
        unique : [true, "Email must be unique."],
        lowercase : true,
        validate : [isEmail, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Please enter a password."],
        minlength : [10, "Password must be 10 symbols long."]
    }
})

const User = mongoose.model("user", userSchema)

module.exports = User;