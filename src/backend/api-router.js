var express = require('express');
var apiResource = require('./api-resource');

var router = express.Router();

router.get('/check-weather', apiResource.getWeather);
router.post('/order-sun', apiResource.orderSun);

module.exports = router;
