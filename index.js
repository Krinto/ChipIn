var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/main')[env];
var morgan = require('morgan');
var router = require('./router');
var cors = require('cors');
var app = express();

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://' + config.database.user + ':' + config.database.password + '@' +
 	                            config.database.host + ':' + config.database.port + '/' +
                                config.database.db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

router(app);

var server = app.listen(config.server.port, function () {
    console.log('Server running at ' + config.server.host + ':' + config.server.port + '/');
});