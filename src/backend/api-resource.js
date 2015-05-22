var dao = require('./weather-dao');

exports.orderSun = function(req, res, next) {
    res.status(201).json({message: 'order created!'});
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
