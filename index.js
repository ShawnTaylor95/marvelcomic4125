//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));
var md5   = require("blueimp-md5");

var pubkey = '94527016ce8d780d5741835efed6c566';
var pvtkey = 'b0d94bb240304ac1daea677d8eefc358a55cb82f';
var ts = new Date().getTime();
var stringToHash  = ts+pvtkey+pubkey;
var hash = md5(stringToHash);

var ts = new Date().getTime();
var charLimit=5;
var data;

app.get('/', function(req, res){
    res.render('index')
    console.log("got it");
    
});

app.get('/character', function(req, res){ 
    res.render('character')
    console.log("got it");
});

app.post('/getCharacter',function(req,res){
    var name;
 name=req.body.heroName;
fetch('https://gateway.marvel.com:443/v1/public/characters?name='+ name+ '&limit='
      + charLimit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash)
    .then(res => res.json())
    .then(data => {	
        res.results
       res.render('character', {data: data});	
        console.log(data);}
)});

    

var limit = 5;
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
   // let randNum=Math.floor((Math.random() * 2373) + 1);
    //fetch('https://xkcd.com/'+randNum+'/info.0.json')
    //.then(res => res.json())
    //.then(data => {
        res.render('random')
        console.log("got it");

    //});
})

app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});


//server setup
app.listen(port, function(){});