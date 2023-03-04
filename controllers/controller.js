// controllers
module.exports.home_get = (req, res) => {
    res.render("home");
}

module.exports.login_get = (req, res) => {
    res.render("login");
}

module.exports.login_post = (req, res) => {
    res.send(req.body);
}

module.exports.signup_get = (req, res) => {
    res.render("signup");
}

module.exports.signup_post = (req, res) => {
    res.send(req.body);
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