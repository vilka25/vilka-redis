/**
 * Created by Mark Sarukhanov on 02.08.2016.
 */
var parser = new xml2js.Parser();
var diff = require('deep-diff').diff;

function betClicRefactor(data) {
    data = data.sports.sport;
    data =  _.filter(data, function(item) {return item.$.name == "Football"});
    data = data[0].event;
    _.each(data, function(competition, compK){
        data[compK] = {
            name : competition.$.name,
            events : competition.match
        };
        _.each(data[compK].events, function(event, evK){
            data[compK].events[evK]= {
                name : event.$.name,
                isLive : event.$.live_id != '',
                markets : event.bets[0].bet
            };
            _.each(data[compK].events[evK].markets, function(market, marketK){
                data[compK].events[evK].markets[marketK]= {
                    name : market.$.name,
                    selections : market.choice
                };
                _.each(data[compK].events[evK].markets[marketK].selections, function(selection, selK){
                    data[compK].events[evK].markets[marketK].selections[selK]= [selection.$.name, selection.$.odd];
                });
            });

        });
    });
    return data;
}

module.exports = {
    betclicData : function(old_data) {
        var _this = this;
        request("http://xml.cdn.betclic.com/odds_en.xml", function(err, res, body){
            if(err){
                //console.log(err);
                _this.betclicData();
            }
            else{
                parser.parseString(body, function (err, data) {
                    if(err || !data || !data.sports || !data.sports.sport) {
                        //console.log(err);
                        _this.betclicData();
                    }
                    else {
                        data = betClicRefactor(data);
                        if(old_data) {
                            var differences = diff(old_data, data);
                            if(differences) {
                                _.each(differences, function(dif, keyDif){
                                   differences[keyDif] = {
                                       comp : data[dif.path[0]].name,
                                       team1 : data[dif.path[0]].events[dif.path[2]].name.split(" - ")[0],
                                       team2 : data[dif.path[0]].events[dif.path[2]].name.split(" - ")[1],
                                       market : data[dif.path[0]].events[dif.path[2]].markets[dif.path[4]].name,
                                       selection : data[dif.path[0]].events[dif.path[2]].markets[dif.path[4]].selections[dif.path[6]]
                                   };
                                });
                                console.log("differences : ", differences);
                            }
                            _this.betclicData(data);
                        }
                        else {
                            _this.betclicData(data);
                        }
                        console.log('Done');
                    }

                });
            }
        });
    }
};