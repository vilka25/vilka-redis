/**
 * Created by Mark Sarukhanov on 29.07.2016.
 */

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

knex.raw("CALL getEvents(" + 1 + "," + 1 + ")")
    .catch(function (error) {console.error(error)})
    .then(function (rows) {
        console.log(rows[0][0])
    });
module.exports = {
    
    getEvents : function(params, callback) {
        knex("CALL getEvents(" + params.sport_id + "," + params.competition_id + ")")
            .catch(function (error) {console.error(error)})
            .then(function (rows) {
                if(rows[0] && rows[0][0])  callback(rows[0][0]);
                else callback({error: true});
            })
    },

    getVilkas : function(params, callback) {

    },

    getStringNames : function(vilkas, callback) {
        var bookmakers = [], markets = [], selections = [];
        _.each(vilkas, function(event_vilkas, event_id){
            vilkas[event_id] = JSON.parse(event_vilkas);
            _.each(vilkas[event_id], function(vilka, vilkaKey){
                _.each(vilka, function(item, itemKey){
                    bookmakers.push(item[0]); markets.push(item[1].split(":")[0]); selections.push(item[1].split(":")[1])
                })
            });
        });
        knex.raw("CALL getVilkasNames('"+ bookmakers.join(",") + "','" + markets.join(",") + "','" + selections.join(",") + "')")
            .catch(function (error) { console.error(error) })
            .then(function (rows) {
                bookmakers = _.groupBy(rows[0][0], function(row){return row.bookmaker_id});
                markets = _.groupBy(rows[0][1], function(row){return row.market_id});
                selections = _.groupBy(rows[0][2], function(row){return row.selection_id});
                _.each(vilkas, function(event_vilkas, event_id){
                    _.each(event_vilkas, function(vilka, vilkaKey){
                        _.each(vilka, function(item, itemKey) {
                            vilkas["" + event_id][vilkaKey][itemKey] = [bookmakers["" + item[0]][0].name, markets["" + item[1].split(":")[0]][0].name + ":" + selections["" + item[1].split(":")[1]][0].name, item[2]];
                        })
                    });
                });
                callback(vilkas);
            });
    }
};