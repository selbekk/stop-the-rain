
exports.orderSun = function(req, res, next) {
    res.status(201).json({message: 'order created!'});
};
exports.getWeather = function(req, res, next) {
    res.status(200).json({weather: 'not terrible'});
};
