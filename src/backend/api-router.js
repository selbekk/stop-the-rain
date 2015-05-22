var express = require('express');
var apiResource = require('./api-resource');

var router = express.Router();

router.get('/check-weather', apiResource.getWeather);
router.get('/order-sun', apiResource.orderSun);

module.exports = router;
