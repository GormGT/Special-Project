// imports
const express = require('express');
const router = require("./routes/routes");
const mongoose = require("mongoose");

// variables
const port = 80;

// create server
const server = express();

// middleware
server.use(express.urlencoded({ extended : true }))
server.use(express.static('public'));
server.use(express.json());

// view engine
server.set('view engine', 'ejs');

// DB connection
const dbURI = "mongodb+srv://Shootinggallery:Lká8Ñ§îågWÜ±xéùöéðå°Òç³èò@shooting-gallery-projec.otwz3i6.mongodb.net/";
mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology : true })
 .then((result) => server.listen(port, () => console.log(`Listening to port ${port}`)))
 .catch((err) => console.log(err))

// cookies
server.get("/setcookie", (req, res) => {
    res.setHeader("Set-Cookie", "newUser=true");
    res.send("YOU HAVE COOKIE :)");
})

// routes
server.use(router);

