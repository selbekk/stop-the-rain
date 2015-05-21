var dao = require('./yr-dao');

exports.orderSun = function(req, res, next) {
    res.status(201).json({message: 'order created!'});
};
exports.getWeather = function(req, res, next) {
    var pos = { lat: req.query.lat, lng: req.query.lng };
    dao.getWeather(pos, function(err, result) {
        if(err) {
            console.error('error while asking for the current weather', err);
            return next();
        }

        res.status(200).json({weather: 'not terrible'});
    });
};
