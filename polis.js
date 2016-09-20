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

                            
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        "headers": headersInfo,
        "data": JSON.stringify(reqData)
    };
        
    var req = client.post("https://www98.verizon.com/foryourhome/vzrepair/flowengine/vzwhatshot.ashx", args, function (data, response) {

        var parsedData = "";
        console.log("success1");
            parsedData = JSON.parse(data);
            res.json(parsedData);
           
    });

     
});

router.get('/webhook', function (req, res) {

    var headersInfo = { "Content-Type": "application/json" };
    var Client = require('node-rest-client').Client;
    var client = new Client();
    var args = {
        "headers": headersInfo
    };

    var req = client.post("http://localhost:58328/Handler1.ashx", args, function (data, response) {

        var parsedData = "";
        console.log("success1");
        parsedData = JSON.parse(data);
        res.json(parsedData);

    });


});

// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);
app.listen(3000, function () {
    console.log('Listening on port ' + PORT) ;
});
