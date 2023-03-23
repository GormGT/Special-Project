// imports
const User = require("../models/User");
const JWT = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username : "", email : "", password : "" };

    // incorrect email
    if (err.message === "incorrect email") {
        errors.email = "That email is not registered.";
    }

    if (err.message === "incorrect password") {
        errors.password === "that password is incorrect";
    }
}

// JWT token creation
const maxAge = 2 * 24 * 60 * 60
const createToken = (id) => {
    return JWT.sign({ id }, "In front of you is a vat of sulfuric acid. In order to escape you must- wait what the fuck are you doing don't dip your balls in there that isn't the challenge holy shit", {
        expiresIn : maxAge
    })
}

// controllers
module.exports.home_get = (req, res) => {
    res.render("home", { title: "Home", bg: "main" });
}

module.exports.levSelect_get = (req, res) => {
    res.render("levSelect", { title: "Level Select", bg: "main" });
}

module.exports.settings_get = (req, res) => {
    res.render("settings", { title: "Settings", bg: "main" });
}

module.exports.credits_get = (req, res) => {
    res.render("credits", { title: "Credits", bg: "main" });
}

module.exports.login_get = (req, res) => {
    res.render("login", { title: "Log in", bg: "main" });
}

//login post request
module.exports.login_post = async (req, res) => {// login
    const { username, email, password } = req.body;
    console.log("hola");
    try {
        // makes user model
        const user = await User.login(username, email, password)
         .then((result) => console.log(result));
        console.log("hola1");
        // makes jwt token
        const token = createToken(user._id);
        // saves token to cookies
        res.cookie("jwt", token, { httpOnly : true, maxAge : maxAge * 1000 });
        res.status(200).json({ user : user._id });
    } catch (err) {
        console.log("ERROR ERROR!!!")
        res.status(400).json({ err });
    }

}

module.exports.signup_get = (req, res) => {
    res.render("signup", { title: "Create account", bg: "main" });
}

// signup post request
module.exports.signup_post = async (req, res) => {// signup
    const { username, email, password } = req.body;

    try {
        // creates user from schema
        const user = await User.create({ username, email, password });
        // creates logged in json web token
        const token = createToken(user._id);
        // saves token to browser
        res.cookie("jwt", token, { httpOnly : true, maxAge : maxAge * 1000 })
        res.status(201).json({ user : user._id });
    } catch (err) {
        handleErrors(err);
        res.status(400);
    }
}


// temp
module.exports.audiotest_get = (req, res) => {
    res.render("audiotest", { title: "Audiotest", bg: "testing" });
}

module.exports.enemyClassTest_get = (req, res) => {
    res.render("enemyClassTest", { title: "enemyClassTest", bg: "classTest" });
}

module.exports.carouselTest_get = (req, res) => {
    res.render("carouselTest", { title: "Carousel Test", bg: "carouselTest"});
}


// 404
module.exports.error404 = (req, res) => {
    res.render("404", { title: "404 page not found", bg: "main"});
}