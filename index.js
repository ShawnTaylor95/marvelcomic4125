//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//create
var md5 = require("blueimp-md5")
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));
// use marvel public and private key
//var marvel = new api({
var  pubkey= "e1e8485e01f4cb3811178c89ef33f8c6"; 
var pvtkey= "110a77fc5084cb96dc850208d085e60b7f3a4740";
var ts = new Date().getTime();
var limit=5;
var stringToHash = ts+pvtkey+pubkey;
var hash = md5(stringToHash);
//var data;

//get home page /
app.get('/', function(req, res){
    res.render('index')
    console.log("got it");
    
});

app.get('/character', function(req, res){ 
    var info;

// Call the API
fetch('https://gateway.marvel.com:443/v1/public/characters?name=Hulk&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
.then(function (res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject("no valid data");
	}
}).then(function (details) {

	// Store the post data to a variable
	info = details;
    charID= details.data.results[0].id;

	// Fetch another API
	return fetch('https://gateway.marvel.com:443/v1/public/characters/'+charID+'/comics?limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash);

}).then(function (res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject("invalid input");
	}
}).then(function (comic) {
	console.log(info.data.results, comic.data.results);
    res.render('character',{info:info,comic:comic})
}).catch(function (error) {
	console.warn(error);
});
});


app.post('/getCharacter',function(req,res){
    var name;
 name=req.body.heroName;
var info;

// Call the API
fetch('https://gateway.marvel.com:443/v1/public/characters?name='+name+'&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
.then(function (res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject("no valid data");
	}
}).then(function (details) {

	// Store the post data to a variable
	info = details;
    charID= details.data.results[0].id;

	// Fetch another API
	return fetch('https://gateway.marvel.com:443/v1/public/characters/'+charID+'/comics?limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash);

}).then(function (res) {
	if (res.ok) {
		return res.json();
	} else {
		return Promise.reject("invalid input");
	}
}).then(function (comic) {
	console.log(info.data.results, comic.data.results);
    res.render('character',{info:info,comic:comic})
}).catch(function (error) {
	console.warn(error);
});        
});
    


app.get('/date', function(req,res){
    fetch('https://gateway.marvel.com:443/v1/public/comics?dateRange=2020-01-10%2C2020-05-10&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
    .then(res => res.json())
    .then(comic => {	
        res.render('date', {comic: comic});	
        //console.log(data);	
    });	
});

app.post('/findDate', function(req,res){
    var start = req.body.startDate;
    var end = req.body.endDate;
    fetch('https://gateway.marvel.com:443/v1/public/comics?dateRange='+ start + '%2c'+ end+ '&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
    .then(res => res.json())
    .then(comic => {	
       res.render('date', {comic: comic});	
        console.log(comic.data.results);	
    });	
});

app.get('/random', function(req, res){
   // let randNum=Math.floor((Math.random() * 2373) + 1);
    //fetch('https://xkcd.com/'+randNum+'/info.0.json')
    //.then(res => res.json())
    //.then(data => {
        res.render('random',{data:data})
    //});
});

app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});