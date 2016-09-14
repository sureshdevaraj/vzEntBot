var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var servercall = require('./servicecall.js');


var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var PORT = process.env.PORT || 9000;

var router = express.Router();

router.post('/webhook', function (req, res) {
    //app.post('/webhook', function (req, res) {
    //var intent = req.body.result.metadata.intentName;
    res.send('Hello World1!');

  
});



// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);

app.listen(3000, function () {
    console.log('Listening on port 3000');
});
