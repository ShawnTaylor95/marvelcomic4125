//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//creat marvel object,
var api = require('marvel')




//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));
// use marvel public and private key
var marvel = new api({ publicKey: "e1e8485e01f4cb3811178c89ef33f8c6", 
privateKey: "110a77fc5084cb96dc850208d085e60b7f3a4740"})

//get home page /
app.get('/', function(req, res){
    res.render('index')
    console.log("got it");
    
});

app.get('/character', function(req, res){
    res.render('character')
    marvel.characters
    .name("Hulk")
    .get(function(err, resp) {
        if (err) { console.log("Error: ", err) }
        else { console.log(resp)
        data =>{resp} }
    })
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