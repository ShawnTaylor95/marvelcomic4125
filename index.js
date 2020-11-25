var express = require('express');
var fetch = require('node-fetch');
var app = express();
var bodyParser= require('body-parser');
var md5   = require("blueimp-md5");

var pubkey = '94527016ce8d780d5741835efed6c566';
var pvtkey = 'b0d94bb240304ac1daea677d8eefc358a55cb82f';
var ts = new Date().getTime();
var stringToHash  = ts+pvtkey+pubkey;
var hash = md5(stringToHash);

// url for characters search
//var charUrl = 'https://gateway.marvel.com:443/v1/public/characters';
//var limit = 20;
//var charUrl2 = charUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash;

// url for comic/date search
//var comicUrl = 'https://gateway.marvel.com:443/v1/public/comics';
var limit = 5;
//var comUrl = comicUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash;
//https://gateway.marvel.com:443/v1/public/comics?dateRange=2020-01-10%2C2020-05-10&limit=5&apikey=94527016ce8d780d5741835efed6c566

//Port information
const port = process.env.PORT || 3000;


//tell application to use ejs for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
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
        res.render('random')
        console.log("got it");
    });


app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});


app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});


//server setup
app.listen(port, function(){});