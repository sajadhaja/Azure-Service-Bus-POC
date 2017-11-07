var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require("path");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));

app.get('/serviceBus', function (req, res) {
    res.sendFile(path.join(__dirname + '/service-bus.html'));
});

// routes
app.use('/topic', require('./controllers/topic.controller'));
app.use('/subscription', require('./controllers/subscription.controller'));
// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});