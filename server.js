/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
global._ = require('underscore');
global.xml2js = require('xml2js');
global.request = require('request');
global.JsDiff = require('diff');


var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  902;

var redis = require('redis');
global.client = redis.createClient();

client.on('connect', function() {console.log('redis connected');});
client.on("error", function (err) {console.error("Error " + err);});

global.redisOp = require('./middleware/redis-op.js');
redisOp.init(1000);

app.use(express.static('' + __dirname + '/files'));
app.set('views',[''+__dirname + '/files/html', ''+__dirname + '/files/html/botView/']);
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/favicon.ico', express.static('./files/img/favicon.ico'));
app.set('json spaces', 2);

require('./middleware/routes.js')(app, client);

var parser = require('./middleware/parser.js');
parser.betclicData();


var server = app.listen(port || 902, function() {
    console.log("listening on " + port);
});
