

// controllers
module.exports.home_get = (req, res) => {
    res.render("home");
}

// temp
module.exports.audiotest_get = (req, res) => {
    res.render("audiotest");
}

// 404
module.exports.error404 = (req, res) => {
    res.render("404");
}