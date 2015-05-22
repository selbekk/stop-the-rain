var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var apiResource = require('./api-resource'),
    log = require('./util/logger');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/assets', express.static('../webapp/public'));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.render('index');
});

app.get('/api/check-weather', apiResource.getWeather);
app.get('/api/order-sun', apiResource.orderSun);

app.listen(4000, function() {
    log.info('server launched @ localhost:4000');
});
