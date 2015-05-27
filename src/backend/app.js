var express = require('express'),
    exphbs  = require('express-handlebars'),
    bodyParser = require('body-parser');

var apiRouter = require('./api-router'),
    log = require('./util/logger');

var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use('/assets', express.static('../webapp/public'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/api', apiRouter);

app.listen(app.get('port'), function() {
    log.info('server launched @ localhost:' + app.get('port'));
});
