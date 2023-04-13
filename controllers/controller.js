// imports
const User = require("../models/User");
const JWT = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email : "", password : "" };

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
    console.log("jwt in progress")
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

module.exports.account_get = (req, res) => {
    res.render("account", { title: "Account", bg: "main" });
}

module.exports.login_get = (req, res) => {
    res.render("login", { title: "Log in", bg: "test" });
}

//login post request
module.exports.login_post = async (req, res) => {// login
    const { username, email, password } = req.body;
    console.log(username, email, password);
    try {
        // makes user model
        const user = await User.login(username, email, password)
         .then((result) => console.log(result));
        console.log(user._id);
        // makes jwt token
        console.log(user._id);
        const token = createToken(user._id);
        console.log(token);
        // saves token to cookies
        res.cookie("jwt", token, { httpOnly : true, maxAge : maxAge * 1000 });
        res.status(200).json({ user : user._id });
    } catch (err) {
        const error = handleErrors(err);
        res.status(400).json({ err });
    }

}

module.exports.signup_get = (req, res) => {
    res.render("signup", { title: "Create account", bg: "test" });
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
        console.log("success?");
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400);
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
}

// temp
module.exports.audiotest_get = (req, res) => {
    res.render("audiotest", { title: "Audiotest", bg: "testing" });
}

module.exports.enemyClassTest_get = (req, res) => {
    res.render("enemyClassTest", { title: "enemyClassTest", bg: "classTest" });
}

// levels

module.exports.shootingRange_get = (req, res) => {
    res.render("shootingRange", { title: "The Shooting Range", bg: "shootingRange" });
}


// 404
module.exports.error404 = (req, res) => {
    res.render("404", { title: "404 page not found", bg: "main"});
}