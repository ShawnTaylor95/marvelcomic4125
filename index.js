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


//fetches comic api data and send it to frontend of /comic
app.get('/comic', function(req,res){
    fetch(url)
    .then(res => res.json())
    .then(data => {
        res.render('index', {data: data});
        console.log(data);
    });
});

/*fetches random comic api data and send it to frontend of /rancComic
app.get('/ranComic', function(req,res){
    var ranNumber = Math.floor(Math.random() * 2373) + 1;
    fetch('http://xkcd.com/'+ranNumber+'/info.0.json')
    .then(res => res.json())
    .then(randomData => {
        res.render('ranComic', {randomData: randomData});
    });
});
*/


//Server setup
app.listen(port,function(){
    console.log('Listening on ' + port)
});