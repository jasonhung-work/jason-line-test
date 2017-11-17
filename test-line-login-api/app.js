var express = require('express');
var app = express();
var port = process.env.PORT||8080;
var http = require('http');
var server = http.Server(app).listen(port);
var bodyParser = require('body-parser');


//APP
app.get("/api", function(req,res){
    res.send("API is running");
});