// imports
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please enter a username."],
        unique : [true, "Please enter a unique username."]
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
        minlength : [6, "Password must be 6 symbols long."]
    }
})

// encrytion
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
    }
}

const User = mongoose.model("user", userSchema);

module.exports = User;