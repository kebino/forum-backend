const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');

const forum = require('./api/forum-api');
const profile = require('./api/profile-api');
const comment = require('./api/comment-api');

//conncect to db
mongoose.Promise =  global.Promise;
mongoose.connect(config.database);

//declare the port of our server
const port = process.env.PORT || 3000;

//use body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//routings
app.use('/api/forum', forum);
app.use('/api/profile', profile);
app.use('/api/comment', comment);


app.listen(port, () => {
    console.log('server running on port: ', port);
})