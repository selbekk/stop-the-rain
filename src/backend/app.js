var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var app = express();

var hbs = exphbs.create({
    defaultLayout: 'main',
    
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('assets', express.static('webapp/public'));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.render('index');
});

app.get('/api/check-weather', function(req, res, next) {
    res.json({ raining: true });
});

app.get('/api/order-sun', function(req, res, next) {
    res.status(201).json({eta: '2 days'});
});

app.listen(4000, function() {
    console.log('server launched @ localhost:4000');
});
