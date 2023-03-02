// imports
const express = require('express');
const router = require("./routes/routes");

// variables
const port = 80;

// create server
const server = express();

// middleware
server.use(express.static('public'));
server.use(express.json());

// view engine
server.set('view engine', 'ejs');

// listen
server.listen(port);

console.log('Listening for requests on port:', port);

// routes
server.use(router);

// TEMP ROUTES
//server.get('/audio', (req, res) => res.render('audiotest'));

// 404
server.use((req, res) => res.status(404).render('404'));