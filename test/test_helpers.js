var mongoose = require('mongoose');
var mockgoose = require('mockgoose');

mockgoose(mongoose);

exports.createDB = function(done) {
    mongoose.connect('mongodb://localhost/test', done);
};

exports.destroyDB = function() {
    mongoose.disconnect();
};