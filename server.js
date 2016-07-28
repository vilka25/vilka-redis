/**
 * Created by mmalkav on 08.04.2016.
 */

var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http');
global._ = require('underscore');

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || parseInt(process.env.PORT) ||  902;

var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {console.log('redis connected');});
client.on("error", function (err) {console.error("Error " + err);});

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'qwerty',
        database: 'test1',
        debug: false,
        typeCast: function (field, next) {
            if (field.type == "BIT" && field.length == 1) {
                var bit = field.string();
                var b = (bit === null) ? null : bit.charCodeAt(0);
                return !!b;
            }
            return next();
        }
    }
});
knex('teams')
    .select('*')
    .catch(function (error) {
        console.error(error)
    })
    .then(function (rows) {
        console.log(rows);
    });
var stringsForMySQL = { '542': '[[["1","1:1","1.73"],["2","1:3","3.63"]]]',
    '644': '[[["2","2:2","3.76"],["1","2:3","4.35"]]]' };

function getStringNames(vilkas, callback) {
    var bookmakers = [], markets = [], selections = [];
    _.each(vilkas, function(event_vilkas, event_id){
        vilkas[event_id] = JSON.parse(event_vilkas)
        _.each(vilkas[event_id], function(vilka, vilkaKey){
            _.each(vilka, function(item, itemKey){
                bookmakers.push(item[0]); markets.push(item[1].split(":")[0]); selections.push(item[1].split(":")[1])
            })
        });
    });
    knex('bookmakers').select('*')
        .whereIn('bookmaker_id', bookmakers)
        .catch(function (error) { console.error(error) })
        .then(function (rows) {
            bookmakers = _.groupBy(rows, function(row){return row.bookmaker_id});
            knex('markets').select('*')
                .whereIn('market_id', markets)
                .catch(function (error) { console.error(error) })
                .then(function (rows) {
                    markets = _.groupBy(rows, function(row){return row.market_id});
                    knex('selections').select('*')
                        .whereIn('selection_id', selections)
                        .catch(function (error) { console.error(error) })
                        .then(function (rows) {
                            selections = _.groupBy(rows, function(row){return row.selection_id});
                            _.each(vilkas, function(event_vilkas, event_id){
                                _.each(event_vilkas, function(vilka, vilkaKey){
                                    _.each(vilka, function(item, itemKey) {
                                        vilkas["" + event_id][vilkaKey][itemKey] = [bookmakers["" + item[0]][0].name, markets["" + item[1].split(":")[0]][0].name + ":" + selections["" + item[1].split(":")[1]][0].name, item[2]];
                                    })
                                });
                            });
                            callback(vilkas);
                        });
                });
        });
    console.log(bookmakers, markets, selections);
}
getStringNames(stringsForMySQL, function (vilkas) {
    console.log(vilkas['542'])
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
                    console.log("vilkas : ", vilkas);
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

function deleteEvent(event_id, param, callback) {
    switch (param) {
        case '':
            callback = callback || function(err, object) {
                    if (err) return console.log(err);
                    else {
                        var vilkas = JSON.parse(object);
                        //console.log("vilkas : ", vilkas);
                    }
                };
            client.del('' + event_id, callback);
            break;
        case 'pricelist':
            callback = callback || function(err, object) {
                    if (err) return console.log(err);
                    else {
                        console.log("pricelist : ", object.split(","))
                    }
                };
            client.del('' + event_id + ':pricelist', callback);
            break;
        case 'updated':
            callback = callback || function(err, object) {
                    if (err) return console.log(err);
                    else {
                        //console.log("updated : ", object);
                    }
                };
            client.del('' + event_id + ':updated', callback);
            break;
        default :
            callback = callback || function(err, object) {
                    if (err) return console.error(err);
                    else {
                        //console.log("event_id:price:price_id : ", event_id, param, object);
                    }
                };
            client.hdel('' + event_id + ':price:' + param + '', "" + object[0], callback);
            break;
    }
}

// TODO ====== make real VILKA calculating ========
function calculateVilkas(event_id, eventSelections) {

    var vilkas = [], vilkaNum = 1;

    // ================================================
    // TODO ====== make real VILKA calculating ========

    var groupedByMarket = _.groupBy(eventSelections, function(selection){ return selection[1].split(":")[0]; });

    _.each(groupedByMarket, function(market, marketKey) {
        var groupedBySelection = _.groupBy(market, function(selection){ return selection[1].split(":")[1]; });
        var bestSelections = [];
        _.each(groupedBySelection, function(item, kk){
            bestSelections.push(_.max(item, function(selection){ return selection[2]; }));
        });
        if(market.length > 1) {
            vilkaNum = _.reduce(bestSelections, function(memo, num) {return memo + 1/Number(num[2])}, 0);
            if(vilkaNum < 1) vilkas.push(bestSelections);
        }
    });

    if(vilkas.length == 0) deleteEvent(event_id, '');
    else storeEvent(event_id, '', JSON.stringify(vilkas));

    // TODO ====== make real VILKA calculating ========
    // ================================================
}
// TODO ====== make real VILKA calculating ========

var i = 0;
function getVilkas(event_ids) {
    var all_vilkas = {};
    if(event_ids) {
        _.each(event_ids, function(event_id, keyEv) {
            getEvent(event_id, '', function(err, vilkas){
                if(!err && vilkas != null) all_vilkas[''+event_id] = vilkas;
                if(keyEv == event_ids.length-1) {
                    //console.log("all_vilkas : ", all_vilkas);
                    i++; console.log(i);
                    console.log(all_vilkas)
                }
            });
        });
    }
    else {
        client.keys('*:pricelist', function (err, event_ids) {
            _.each(event_ids, function(event_id, keyEv) {
                event_ids[keyEv] = event_id.replace(":pricelist","");
            });
            getVilkas(event_ids);
        });
    }
}

function sortEvents() {
    client.keys('*:pricelist', function (err, event_ids) {
        _.each(event_ids, function(event_id, keyEv) {
            var eventsSelections = [];
            event_id = event_id.replace(":pricelist","");
            client.keys('' + event_id+ ':price:*', function (err, prices_list) {
                _.each(prices_list, function(price, keyPr) {
                    price = price.replace("" + event_id + ":price:","")
                    getEvent(event_id, price, function(err, rates){
                        _.each(rates, function(rate, bookmaker) {
                            eventsSelections.push([bookmaker, price, rate])
                        });
                        if(keyPr == prices_list.length - 1) {
                            calculateVilkas(event_id, eventsSelections);
                        }
                    })
                });
            });
        });
    });
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
                                        sortEvents();
                                    }
                                })
                            });
                        }
                    });

                }
            });
        }
        else {
            deleteEvent(item.event_id, item.price_id, function (err, keys) {
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
                                        sortEvents();
                                    }
                                })
                            });
                        }
                    });

                }
            });
        }
    })
}

function generateCollectedData(number) {
    var newDifference = [];
    _.times(number, function(n){
        var selection = _.sample(["1", "2", "3"]);
        var rate = (Number(selection) * ( 1 + _.random(1, 99)/100)).toFixed(2);
        var eventRange = [_.random(1, 1000),_.random(1, 1000)];
        newDifference.push({
            event_id : _.random(_.min(eventRange), _.max(eventRange)),
            price_id : _.sample(["total", "doublechance", "matchresult"]) + ":" + selection,
            bookmaker_id : _.sample(["toto", "vivaro", "eurofootball", "bet365","toto2", "vivaro2", "eurofootball2", "bet3652"]),
            rate : rate //_.random(1, 8) + "." + _.random(1, 99)
        })
    });
    storeDifference(newDifference);
}

// generateCollectedData(250);
//
// getVilkas();
//

client.keys("*", function (err, keys) {
    if(err) console.error(err);
    else {
        if(keys.length == 0) {
            generateCollectedData(50000);
            setInterval(function(){
                generateCollectedData(500);
                getVilkas();
            }, 1000);
        }
        else {
            keys.forEach(function (key, pos) {
                client.del(key, function(err, o) {
                    if (err) console.error(key);
                    else if(pos == keys.length - 1) {
                        console.log("starting data generation");
                        //================================= little-tests ================================
                        generateCollectedData(100);
                        setTimeout(function(){
                            getVilkas();
                        }, 1000);
                        //================================= little-tests ================================

                        // generateCollectedData(50000);
                        // setInterval(function(){
                        //     generateCollectedData(500);
                        //     getVilkas();
                        // }, 1000);

                    }
                });
            });
        }
    }
});



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