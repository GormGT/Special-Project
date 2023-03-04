// imports
const User = require("../models/User");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
}

// controllers
module.exports.home_get = (req, res) => {
    res.render("home");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.login_post = (req, res) => {// login
    const { username, email, password } = req.body;


}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.signup_post = async (req, res) => {// signup
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        res.status(201).json(user);
    } catch (err) {
        handleErrors(err);
        res.status(400).send("Error: User not created");
    }
}


// temp
module.exports.audiotest_get = (req, res) => {
    res.render("audiotest");
}

module.exports.enemyClassTest_get = (req, res) => res.render("enemyClassTest");

// 404
module.exports.error404 = (req, res) => {
    res.render("404");
}