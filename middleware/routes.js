/**
 * Created by Mark Sarukhanov on 29.07.2016.
 */

var dbRequest = require('./dbRequests');

module.exports = function (app, fs) {

    app.post('/api/getEvents',function (req, res) {
        dbRequest.getEvents(req.body, function(callback){
           res.send(callback).end(); 
        });
    });

    app.post('/api/getVilkas',function (req, res) {
        dbRequest.getVilkas(req.body, function(vilkas){
            dbRequest.getEvents(vilkas, function(callback){
                res.send(callback).end();
            });
        });
    });

    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: '././files/' });
    });

    app.post('*', function (req, res) {
        res.sendFile('index.html', { root: '././files/' });
    });
};
