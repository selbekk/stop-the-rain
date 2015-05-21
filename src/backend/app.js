var express = require('express');

var app = express();

app.use(express.static('webapp/public'));

app.get('/', function(req, res, next) {
    res.json({message: "web app is up and running!"});
});

app.listen(4000, function() {
    console.log('server launched @ localhost:4000');
});
