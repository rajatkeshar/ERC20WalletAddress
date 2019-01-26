var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var ethers = require('ethers');

var app = express();
var http = require('http').Server(app);
global.appDir = path.dirname(require.main.filename);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/* loading all routes */
try {
    require('./routesLoder')(app, http);
} catch (error) {
    console.log('error', error);
}

app.listen(3030, function(req, res) {
	console.log("server is running at http://127.0.0.1:3030")
});
