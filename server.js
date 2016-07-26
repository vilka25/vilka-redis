/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
global._            = require('underscore');

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  902;

var redis = require('redis');
var client = redis.createClient();

// client.keys("*", function (err, keys) {
//     keys.forEach(function (key, pos) {
//         console.log(key);
//         client.del(key, function(err, o) {
//             if (err) console.error(key);
//         });
//     });
// });

client.on('connect', function() {
    console.log('redis connected');
});

function storeEvent(event_id, param, object, callback) {
    if(!callback) var callback = function (err, keys) {
        if (err) return console.error(err);
    };
    switch (param) {
        case '':
            client.set('' + event_id, object, callback);
            break;
        case 'pricelist':
            client.set('' + event_id + ':pricelist', object, callback);
            break;
        case 'updated':
            client.set('' + event_id + ':updated', object, callback);
            break;
        default :
            client.hset('' + event_id + ':price:' + param + '', "" + object[0], "" + object[1], callback);
            break;
    }
}
function getEvent(event_id, param, callback) {
    switch (param) {
        case '':
            callback = callback || function(err, object) {
                if (err) return console.log(err);
                else {
                    var vilkas = JSON.parse(object);
                    //console.log("vilkas : ", vilkas);
                }
            };
            client.get('' + event_id, callback);
            break;
        case 'pricelist':
            callback = callback || function(err, object) {
                if (err) return console.log(err);
                else {
                    console.log("pricelist : ", object.split(","))
                }
            };
            //console.log('' + event_id + ':pricelist')
            client.get('' + event_id + ':pricelist', callback);
            break;
        case 'updated':
            callback = callback || function(err, object) {
                if (err) return console.log(err);
                else {
                    //console.log("updated : ", object);
                }
            };
            client.get('' + event_id + ':updated', callback);
            break;
        default :
            callback = callback || function(err, object) {
                if (err) return console.error(err);
                else {
                    //console.log("event_id:price:price_id : ", event_id, param, object);
                }
            };
            client.hgetall('' + event_id + ':price:' + param + '', callback);
            break;
    }
}
function calculateVilkas() {
    client.keys('*:pricelist', function (err, event_ids) {
        // _.each(event_ids, function (price, price_key) {
        //     console.log(price)
        //     event_ids[price_key] = event_ids[price_key].replace(":pricelist","")
        // });
        var eventSelections = [];
        _.each(event_ids, function(event_id, keyEv) {
            event_id = event_id.replace(":pricelist","");
            client.keys('' + event_id+ ':price:*', function (err, prices_list) {
                _.each(prices_list, function(price, keyPr) {
                    price = price.replace("" + event_id + ":price:","")
                    getEvent(event_id, price, function(err, rates){
                        _.each(rates, function(rate, bookmaker) {
                            eventSelections.push([bookmaker, price, rate])
                        });
                        if(keyPr == prices_list.length - 1) console.log(event_id, eventSelections)
                    })
                });
            });
        });
    });
    // client.hgetall('' + event_id + ':price:' + item.price_id, function(err, prices) {
    //     if (err) return console.error(err);
    //     else {
    //         client.keys('' + event_id + ':price:*', function (err, prices_list) {
    //             _.each(prices_list, function (price, price_key) {
    //                 prices_list[price_key] = prices_list[price_key].replace("" + event_id + ":price:","")
    //             });
    //             storeEvent(event_id, 'pricelist', prices_list.toString(), function() {
    //                 console.log(prices_list, prices)
    //             })
    //         });
    //     }
    // });

}
function storeDifference(difference) {
    _.each(difference, function (item, dif_key) {
        if(item.rate != null) {
            storeEvent(item.event_id, item.price_id, ['' + item.bookmaker_id, item.rate], function (err, keys) {
                if(err) console.log(err);
                else {
                    client.hgetall('' + item.event_id + ':price:' + item.price_id, function(err, prices) {
                        if (err) return console.error(err);
                        else {
                            client.keys('' + item.event_id + ':price:*', function (err, prices_list) {
                                _.each(prices_list, function (price, price_key) {
                                    prices_list[price_key] = prices_list[price_key].replace("" + item.event_id + ":price:","")
                                });
                                storeEvent(item.event_id, 'pricelist', prices_list.toString(), function() {
                                    if(dif_key == difference.length - 1) {
                                        calculateVilkas();
                                    }
                                })
                            });
                        }
                    });

                }
            });
        }
        else {

        }
    })
}

// storeEvent(1, '', JSON.stringify([{ "vivaro" : JSON.stringify({price_id : 2, rate : 1.6}), "toto" : JSON.stringify({price_id : 4, rate : 3.6})}])); // event_id
// storeEvent(1, 'pricelist', [ "total:p1", "total:p2"].toString()); // event_id:pricelist
// storeEvent(1, 'updated', new Date()); // event_id:updated
//storeEvent(1, 'total2', ["vivaro", 2.2]); // event_id:price_id

// getEvent(1, '');
//getEvent(2, 'pricelist');
// getEvent(1, 'updated');
// getEvent(1, 'total1');
// getEvent(1, 'total2');
// getEvent(1, 'total3');

var difference = [
    {
        event_id : "1", price_id : "total3", bookmaker_id : "toto", rate : "5.8"
    },
    {
        event_id : "1", price_id : "total2", bookmaker_id : "toto", rate : "3.8"
    },
    {
        event_id : "1", price_id : "total4", bookmaker_id : "toto", rate : "1.8"
    },
    {
        event_id : "1", price_id : "total3", bookmaker_id : "vivaro", rate : "5.7"
    },
    {
        event_id : "1", price_id : "total2", bookmaker_id : "vivaro", rate : "2.2"
    },
    {
        event_id : "1", price_id : "total1", bookmaker_id : "vivaro", rate : "1.6"
    },
    {
        event_id : "2", price_id : "total3", bookmaker_id : "vivaro", rate : "5.7"
    },
    {
        event_id : "2", price_id : "total2", bookmaker_id : "vivaro", rate : "1.2"
    },
    {
        event_id : "2", price_id : "total1", bookmaker_id : "vivaro", rate : "9.3"
    },
    {
        event_id : "2", price_id : "total3", bookmaker_id : "vivaro", rate : "2.7"
    },
    {
        event_id : "3", price_id : "total2", bookmaker_id : "vivaro", rate : "4.2"
    },
    {
        event_id : "3", price_id : "total1", bookmaker_id : "vivaro", rate : "3.3"
    }
];

storeDifference(difference);

var server = app.listen(port || 902, function() {
    console.log("listening on " + port);
});
