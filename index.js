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
    res.render('character')
    console.log("got it");
    
});

//get results to stop saying [object] and allow user to plug in date
app.get('/date', function(req,res){
    fetch('https://gateway.marvel.com:443/v1/public/comics?dateRange=2020-01-10%2C2020-05-10&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
    .then(res => res.json())
    .then(data => {	
        res.render('date', {data: data});	
        //console.log(data);	
    });	
});

app.post('/findDate', function(req,res){
    var start = req.body.startDate;
    var end = req.body.endDate;
    fetch('https://gateway.marvel.com:443/v1/public/comics?dateRange='+ start + '%2c'+ end+ '&limit='
      + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
    .then(res => res.json())
    .then(data => {	
       res.render('date', {data: data});	
        console.log(data);	
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

//app.post('/newRand', function(req, res){
    //let randNum=Math.floor((Math.random() * 2373) + 1);
    //fetch('https://xkcd.com/'+randNum+'/info.0.json')
    //.then(res => res.json())
    //.then(data => {
      //  res.render('random',{data:data})
    //});
//})

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});