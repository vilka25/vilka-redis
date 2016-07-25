/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  901;

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('redis connected');
});

function storeEvent(event_id, param, object) {
    switch (param) {
        case '':
            client.set('' + event_id, object, function (err, keys) {
                if (err) return console.log(err);
                else console.log(keys)
            });
            break;
        case 'pricelist':
            client.set('' + event_id + ':pricelist', object, function (err, keys) {
                if (err) return console.log(err);
                else console.log(keys)
            });
            break;
        case 'updated':
            client.set('' + event_id + ':updated', object, function (err, keys) {
                if (err) return console.log(err);
                else console.log(keys)
            });
            break;
        default :
            client.set('' + event_id + ':' + param + '', object, function (err, keys) {
                if (err) return console.log(err);
                else console.log(keys)
            });
            break;
    }
}
function getEvent(event_id, param, object) {
    switch (param) {
        case '':
            client.get('' + event_id, function(err, object) {
                if (err) return console.log(err);
                else console.log("event : ", JSON.parse(object));
            });
            break;
        case 'pricelist':
            client.get('' + event_id + ':pricelist', function(err, object) {
                if (err) return console.log(err);
                else console.log("pricelist : ", object.split(","));
            });
            break;
        case 'updated':
            client.get('' + event_id + ':updated', function(err, object) {
                if (err) return console.log(err);
                else console.log("updated : ", object);
            });
            break;
        default :
            client.get('' + event_id + ':' + param + '', function(err, object) {
                if (err) return console.log(err);
                else console.log("price_id : ", JSON.parse(object));
            });
            break;
    }
}

storeEvent(1, '', JSON.stringify({ "vivaro" : JSON.stringify({price_id : 2, rate : 1.6}), "toto" : JSON.stringify({price_id : 4, rate : 3.6})})); // event_id
storeEvent(1, 'pricelist', [ "total:p1", "total:p2"].toString()); // event_id:pricelist
storeEvent(1, 'updated', new Date()); // event_id:updated
storeEvent(1, 'total1', JSON.stringify({ vivaro : 1.6 , bet365 : 1.8 })); // event_id:price_id

getEvent(1, '');
getEvent(1, 'pricelist');
getEvent(1, 'updated');
getEvent(1, 'total1');

var server = app.listen(port || 901, function() {
    console.log("listening on " + port);
});
