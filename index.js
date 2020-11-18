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
var  publicKey= "e1e8485e01f4cb3811178c89ef33f8c6"; 
var privateKey= "110a77fc5084cb96dc850208d085e60b7f3a4740";
var ts = new Date().getTime();
var charLimit=3;
var stringToHash = ts+privateKey+publicKey;
var hash = md5(stringToHash);
var data;

//get home page /
app.get('/', function(req, res){
    res.render('index')
    console.log("got it");
    
});

app.get('/character', function(req, res){ 
    //fetch('https://gateway.marvel.com:443/v1/public/characters?name=Hulk&limit='
    //  + charLimit + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash)
    //.then(res => res.json())
    //.then(info=> { 
        // console.log(res) 
    // }); 
    var info;
    var comic;
    //the link that i got the code from
//https://gomakethings.com/how-to-use-the-fetch-method-to-make-multiple-api-calls-with-vanilla-javascript/
// Call the API
fetch('https://gateway.marvel.com:443/v1/public/characters?name=Hulk&limit='
     + charLimit + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (charInfo) {

	// Store the post data to a variable
    info = charInfo;
    //var charId = charInfo.data.result[0].id;

	// Fetch another API
    return fetch('https://gateway.marvel.com:443/v1/public/characters/1009351/comics?format=comic&limit='
     + charLimit + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash);

}).then(function (response) {
	if (response.ok) {
		return response.json();
	} else {
		return Promise.reject(response);
	}
}).then(function (charComic) {
    comic=charComic;
    console.log(info);
    console.log(comic);
    //res.render('character',{info:info},{comic:comic})
}).catch(function (error) {
	console.warn(error);
}); 
//res.render('character',{info:info},{comic:comic})
});


app.post('/getCharacter',function(req,res){
    var name;
 name=req.body.heroName;
fetch('https://gateway.marvel.com:443/v1/public/characters?name='+ name+ '&limit='
      + charLimit + '&ts=' + ts + '&apikey=' + publicKey + '&hash=' + hash)
    .then(res => res.json())
    .then(info=> {	
       res.render('character', {info:info});	
        console.log(info.data.results);}
)});
    


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
});

app.get('/contact', function(req, res){
    res.render('contact')
    console.log("got it");
    
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});