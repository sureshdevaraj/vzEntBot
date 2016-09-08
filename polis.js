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
  var intent = req.body.result.action;
  
    switch (intent) {
        case "welcome":
             res.json(chatInitiate());
            break;
        case "Billing":
            res.json(billInquiry());
            break;
        case "showrecommendation":
            //res.json(recommendTV());
            
            recommendTVNew(function (str) {
                console.log("inside showrecommendation ");                
                res.json(recommendTVNew1(str));
            });
           
            /*
            performRequest('http://vzbotapi.azurewebsites.net/api/values', 'GET', '', function (data) {
                res.json(data);
                console.log('Logged in:', data);
            });
            */

            break;
        case "Recommendation":
            res.json(recommendTV());
            break;
        default:
            res.json(recommendTV());
    }
});


function recommendTVNew(callback) {
    request.post(
        'http://vzbotapi.azurewebsites.net/api/values',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        }
    );
}

function performcall(){
console.log("starting performcall");
	var myresp='';
	myresp=request.post({
	  headers: {'content-type' : 'application/x-www-form-urlencoded'},
	  url:     'https://vznode1.herokuapp.com/api/webhook/',
	  body:    "mes=heydude"
	}, function(error, response, body)
		{
			console.log("inside fn call");
			if (!error && response.statusCode == 200) 
    			{
    			//console.log(body); // Print the google web page.
    			//callback(body);
			myresp = body;
			
			console.log(myresp);
    			}
    			 else
			     {
			     	console.log(error);
			     	console.log(response.statusCode);
			     	myresp=recommendTV();
			     	
			     }
		}
	);
console.log('myresp');
console.log(myresp); 	
return(myresp);
};

function performRequest(endpoint, method, data, success) {
  console.log('staring performRequest ');
  var querystring = require('querystring');
var https = require('https');

var host = '';
var username = '';
var password = '';
var apiKey = '';
var sessionId = null;
var deckId = '68DC5A20-EE4F-11E2-A00C-0858C0D5C2ED';
var responseObject='';
 var responseString = '';
 
  var dataString = JSON.stringify(data);
  var headers = {};
  
  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

   

    res.on('data', function(data) {
      responseString += data;
   
    });

    res.on('end', function() {
      console.log('responseString:'+responseString);
       responseObject = JSON.parse(responseString);
       //console.log('responseObject:'+ responseObject);
       //console.log('dataString:'+ dataString);
       
      success(responseObject);
    });
  });
//console.log('endpoint:'+ endpoint);
  req.write(dataString);
  req.end();

  return{
    
     speech:'response from call' ,
        displayText: "TV recommendations",
        data: responseObject,
         source: "test functions"
  }
 };



function recommendTVNew(callback) {
    request.post(
        'http://vzbotapi.azurewebsites.net/api/values',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                callback(body);
            }
        }
    );
 }
function recommendTVNew1(apiresp) {
	var objToJson = { };
	objToJson = apiresp;


    //var output = eval('(' + JSON.stringify(apiresp) + ')');
    console.log("apiresp1:" + JSON.stringify(objToJson));
    //console.log("output1:" + output);
    var aa = JSON.parse(apiresp);
    var cc = aa.data.facebook.objToJson;
    console.log("objToJson"+cc);
    //console.log(aa);
    //return objToJson;
    
    return ({
        speech: "Here are some recommendations for tonight",
        displayText: "TV recommendations",
        data: aa.data.facebook.objToJson,
        source: "Zero Service - app_zero.js"
    });
    
}
function recommendTV() {
    return ({
        speech: "Here are some recommendations for tonight",
        displayText: "TV recommendations",
        data: {
            "facebook": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Shark Tank",
                                "subtitle": "Shark Tank",
                                "image_url": "http://image.vam.synacor.com.edgesuite.net/0f/07/0f07592094a2a596d2f6646271e9cb0311508415/w=414,h=303,crop=auto/?sig=88c390c980d4fa53d37ef16fbdc53ec3dfbad7d9fa626949827b76ae37140ac3&amp;app=powerplay",
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "http://www.youtube.com/embed/SQ1W7RsXL3k",
                                        "title": "Watch video"
                                    },
                                    {
                                        "type": "web_url",
                                        "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
                                        "title": "Record"
                                    }
                                ]
                            },
                            {
                                "title": "Game of Thrones",
                                "subtitle": "Game of Thrones",
                                "image_url": "http://ia.media-imdb.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_UX182_CR0,0,182,268_AL_.jpg",
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://www.youtube.com/watch?v=36q5NnL3uSM",
                                        "title": "Watch video"
                                    },
                                    {
                                        "type": "web_url",
                                        "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
                                        "title": "Record"
                                    }
                                ]
                            },
                            {
                                "title": "The Night Of",
                                "subtitle": "The Night Of",
                                "image_url": "http://ia.media-imdb.com/images/M/MV5BMjQyOTgxMDI0Nl5BMl5BanBnXkFtZTgwOTE4MzczOTE@._V1_UX182_CR0,0,182,268_AL_.jpg",
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://www.youtube.com/watch?v=36q5NnL3uSM",
                                        "title": "Watch video"
                                    },
                                    {
                                        "type": "web_url",
                                        "url": "https://m.verizon.com/myverizonmobile/router.aspx?token=tvlisting",
                                        "title": "Record"
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        source: "Zero Service - app_zero.js"
    });
}
function chatInitiate() {
    return ({
        speech: "Welcome Hi,there. I am Ent, an entertainment bot.  Would you like to see some recommendations for tonight?",
        displayText: "TV Recommendations",
        data: {
            "facebook": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Hi,there. I am Ent, an entertainment bot.  Would you like to see some recommendations for tonight?",
                        //"template_type":"generic",
                        //"elements":[
                        //	{
                        //		"title":"Hi,there. I am Ent, an entertainment bot.",
                        //		"image_url":"https://petersfancybrownhats.com/company_image.png",
                        //		"subtitle":"Would you like to see some recommendations for tonight?",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes",
                                "payload": "Yes"
                            },
                            {
                                "type": "postback",
                                "title": "No",
                                "payload": "No"
                            }
                        ]
                    }
                }
            }
        },
        source: "Zero Service - app_zero.js"
    });
}
function billInquiry() {
    return ({
        speech: "Let me get an expert to help you.  Please click on the link below.",
        displayText: "TV Recommendations",
        data: {
            "facebook": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": "Unfortunately, I'm unable to help with that query.  Would you like to talk to an expert?",
                        "buttons": [
                            {
                                "type": "phone_number",
                                "title": "Talk to an agent",
                                "payload": "+919962560884"
                            },
                            {
                                "type": "postback",
                                "title": "No, thanks",
                                "payload": "No, thanks"
                            }
                        ]
                    }
                }
            }
        },
        source: "Zero Service - app_zero.js"
    });
}
// more routes for our API will happen here
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

app.use('/api', router);
app.listen(PORT, function () {
  console.log('Listening on port ' + PORT);
});
