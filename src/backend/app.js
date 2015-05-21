var express = require('express');

var app = express();

app.use('assets', express.static('webapp/public'));

app.get('/api/check-weather', function(req, res, next) {
    res.json({ isItRaining: true; });
});

app.get('/api/order-sun', function(req, res, next) {
    res.status(201).json({eta: '2 days'});
});

app.listen(4000, function() {
    console.log('server launched @ localhost:4000');
});
