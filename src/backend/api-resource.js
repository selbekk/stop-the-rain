var _ = require('lodash');
var dao = require('./weather-dao');
var Position = require('./position');
var weatherHelper = require('./weather-helper');

exports.orderSun = function(req, res, next) {
    var pos = new Position({ lat: req.query.lat, lng: req.query.lng });
    if(!pos.isValid()) {
        return res.status(400).json({error: 'You\'re doing it wrong!'});
    }
    dao.getForecast(pos, function(err, data) {
        if(err) {
            return next();
        }

        res.status(201).json({eta: weatherHelper.etaRainStop(data) });
    });
};

exports.timeUntilRain = function(req, res, next){
    var pos = new Position({ lat: req.query.lat, lng: req.query.lng });
    if(!pos.isValid()) {
        return res.status(400).json({error: 'You\'re doing it wrong!'});
    }

    dao.getForecast(pos, function(err, data) {
        if(err) {
            return next();
        }

        res.status(201).json({eta: weatherHelper.etaRainStart(data) });
    });
};

exports.getWeather = function(req, res, next) {
    var pos = new Position({ lat: req.query.lat, lng: req.query.lng });

    if(!pos.isValid()) {
        return res.status(400).json({error: 'you\'re doing it wrong!'});
    }

    dao.getWeather(pos, function(err, result) {
        if(err) {
            return next();
        }

        var weather = weatherHelper.resolveCode(result.weather[0].id);
        res.status(200).json({
            weather: weather,
            description: result.weather[0].description,
            isRaining: weather === 'rainy',
            place: {
                name: result.name,
                country: result.sys.country
            }
        });
    });
};
