var _ = require('lodash');
var dao = require('./weather-dao');

exports.orderSun = function(req, res, next) {
    var pos = { lat: req.query.lat, lng: req.query.lng || req.query.lan };
    dao.getForecast(pos, function(err, data) {
        if(err) {
            return next();
        }

        var firstNonRainyPeriod = _.find(data.list, function(item) {
            return item.weather[0].main.toLowerCase().indexOf('rain') === -1;
        });

        res.status(201).json({eta: firstNonRainyPeriod.dt_txt });
    });

};
exports.getWeather = function(req, res, next) {
    var pos = { lat: req.query.lat, lng: req.query.lng || req.query.lan };

    if(!pos.lat || !pos.lng) {
        return res.status(400).json({error: 'you\'re doing it wrong!'});
    }

    dao.getWeather(pos, function(err, result) {
        if(err) {
            return next();
        }

        res.status(200).json({
            weather: result.weather[0].main,
            isRaining: result.weather[0].main.toLowerCase().indexOf('rain') > -1,
            place: {
                name: result.name,
                country: result.sys.country
            }
        });
    });
};
