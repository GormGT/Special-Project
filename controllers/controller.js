

// controllers
module.exports.home_get = (req, res) => {
    res.render("home");
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