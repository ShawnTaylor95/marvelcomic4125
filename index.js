var express = require('express');
var fetch = require('node-fetch');
var app = express();
var md5   = require("blueimp-md5");

var pubkey = '94527016ce8d780d5741835efed6c566';
var pvtkey = 'b0d94bb240304ac1daea677d8eefc358a55cb82f';
var ts = new Date().getTime();
var stringToHash  = ts+pvtkey+pubkey;
var hash = md5(stringToHash);

// url for characters
var baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
var limit = 20;
var url = baseUrl + '?limit=' + limit + '&ts=' + ts + '&apikey=' + pubkey + '&hash=' + hash;

//Port information
const port = process.env.PORT || 3000;


//tell application to use ejs for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));

app.get('/', function(req,res){
//return something to homepage
    res.render('index');
    //return res.redirect('/comic');

});


//get home page /
app.get('/', function(req, res){
    res.render('index')
    console.log("got it");
    
});

app.get('/character', function(req, res){
    res.render('character')
    console.log("got it");
    
});

app.get('/date', function(req, res){
    res.render('date')
    console.log("got it");
    
});

app.get('/random', function(req, res){
   // let randNum=Math.floor((Math.random() * 2373) + 1);
    //fetch('https://xkcd.com/'+randNum+'/info.0.json')
    //.then(res => res.json())
    //.then(data => {
        res.render('random',{data:data})
    //});
})

app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});

//app.post('/newRand', function(req, res){
  //  let randNum=Math.floor((Math.random() * 2373) + 1);
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