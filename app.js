var express = require('express');
var app = express();
var port = process.env.PORT||8080;
var http = require('http');
var server = http.Server(app).listen(port);
var bodyParser = require('body-parser');
var config = fs.readFileSync(__dirname + '/config.json', 'utf8');

config = JSON.parse(config);

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});
app.use(express.static('pages'));

//APP
app.get("/api", function(req,res){
    res.send("API is running");
});

app.get("/login", function(req, res){
    res.redirect('https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1547012826&redirect_uri=https://powerful-lake-68319.herokuapp.com/auth&state=reportAuth&scope=openid%20profile&nonce=myapp');
});

app.get("/auth", function(request, response){
    console.log('response :' + response);
    console.log('request:' + request);
    request.header('Content-Type', 'text/html');
    var fs = require('fs');
    fs.readFile(__dirname + '/pages/Auth.htm', 'utf8', function (err, data) {
        if (err) {
            res.send(err);
        }
        var protocol = 'http://';
        var host = this.req.get('host');
        logger.info('encrypted: ' + this.req.connection.encrypted);
        if (this.req.connection.encrypted) {
            protocol = 'https://';
        }
        this.res.send(data);
    }.bind({ req: request, res: response }));
});