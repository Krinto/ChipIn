var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/main')[env];
var morgan = require('morgan');
var router = require('./router');
var cors = require('cors');
var app = express();

mongoose.Promise = require('q').Promise;
if(env === 'test') {
    mockgoose(mongoose).then(function() {
	    mongoose.connect('mongodb://localhost/test');
        if(mongoose.isMocked === true) {
            console.log('Mongoose successfuly mocked');
        }
        else {
            throw new Error('Mongoose mocking failed');
        }
    });
}
else {
    mongoose.connect('mongodb://' + config.database.user + ':' + config.database.password + '@' +
                                    config.database.host + ':' + config.database.port + '/' +
                                    config.database.db);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
if(env !== 'test'){
    app.use(morgan('dev'));
}

router(app);

var server = app.listen(config.server.port, function () {
    console.log('Server running at ' + config.server.host + ':' + config.server.port + '/');
});

module.exports = app; // for testing