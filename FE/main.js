
var express = require('express'); //required express module
var app =  express();
var path = require('path');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(express.staticProvider(__dirname + '/build'));
app.use(express.static(path.join(__dirname, '/build')))
app.get('/', function(req, res) {
    res.render(__dirname+'/build/static/index.html');
});
//Server code goes here
    http = require('http');

    http.createServer(app).listen(8000, function(){
        console.log("api listening to ", 8000);
    });

//Ends
