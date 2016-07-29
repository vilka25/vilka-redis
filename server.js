/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
global._ = require('underscore');

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  902;

var redis = require('redis');
global.client = redis.createClient();

client.on('connect', function() {console.log('redis connected');});
client.on("error", function (err) {console.error("Error " + err);});

global.redisOp = require('./middleware/redis-op.js');
redisOp.init();

app.use(express.static('' + __dirname + '/files'));
app.set('views',[''+__dirname + '/files/templates', ''+__dirname + '/files/templates/botView/']);
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/favicon.ico', express.static('./files/img/favicon.ico'));
app.set('json spaces', 2);

require('./middleware/routes.js')(app, client);

// var stringsForMySQL = { '542': '[[["1","1:1","1.73"],["2","1:3","3.63"]]]',
//     '644': '[[["2","2:2","3.76"],["1","2:3","4.35"]]]' };

// getStringNames(stringsForMySQL, function (vilkas) {
//     console.log("new vilkas : ", vilkas['542'])
// });

var server = app.listen(port || 902, function() {
    console.log("listening on " + port);
});













// storeEvent(1, '', JSON.stringify([{ "vivaro" : JSON.stringify({price_id : 2, rate : 1.6}), "toto" : JSON.stringify({price_id : 4, rate : 3.6})}])); // event_id
// storeEvent(1, 'pricelist', [ "total:p1", "total:p2"].toString()); // event_id:pricelist
// storeEvent(1, 'updated', new Date()); // event_id:updated
//storeEvent(1, 'total2', ["vivaro", 2.2]); // event_id:price_id

//getEvent(2, '');
//getEvent(2, 'pricelist');
// getEvent(1, 'updated');
// getEvent(1, 'total1');
// getEvent(1, 'total2');
// getEvent(1, 'total3');


// var difference = [
//     {
//         event_id : "1", price_id : "total1", bookmaker_id : "toto", rate : "2.1"
//     },
//     {
//         event_id : "1", price_id : "total2", bookmaker_id : "toto", rate : "3.8"
//     },
//     {
//         event_id : "1", price_id : "total3", bookmaker_id : "toto", rate : "2.3"
//     },
//     {
//         event_id : "1", price_id : "total1", bookmaker_id : "vivaro", rate : "2.2"
//     },
//     {
//         event_id : "1", price_id : "total2", bookmaker_id : "vivaro", rate : "1.6"
//     },
//     {
//         event_id : "2", price_id : "total3", bookmaker_id : "vivaro", rate : "4.7"
//     },
//     {
//         event_id : "2", price_id : "total1", bookmaker_id : "eurofootball", rate : "5.3"
//     },
//     {
//         event_id : "2", price_id : "total2", bookmaker_id : "eurofootball", rate : "2.7"
//     },
//     {
//         event_id : "3", price_id : "total3", bookmaker_id : "eurofootball", rate : "4.2"
//     },
//     {
//         event_id : "3", price_id : "total2", bookmaker_id : "toto", rate : "4.8"
//     },
//     {
//         event_id : "3", price_id : "total3", bookmaker_id : "toto", rate : "3.3"
//     },
//     {
//         event_id : "3", price_id : "total1", bookmaker_id : "eurofootball", rate : "2.2"
//     },
//     {
//         event_id : "3", price_id : "total2", bookmaker_id : "eurofootball", rate : "4.6"
//     }
// ];
//
// storeDifference(difference);