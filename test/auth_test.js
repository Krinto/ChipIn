var env = process.env.NODE_ENV || 'development';
var config = require('../config/main')[env];
var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var chaiHttp = require('chai-http');
var Mongoose = require('mongoose').Mongoose;
var mongoose = new Mongoose();
var mockgoose = require('mockgoose');
var server = require('../index');

chai.use(chaiHttp);

describe('Authentication', function() {

    before(function(done) {
        mockgoose(mongoose);
        mongoose.connect('mongodb://localhost:27017/mydatabase');
        done();
    });

    it('can call root route', function(done) {
        chai.request(server)
            .get('/api/')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Hello World');
                done();
            });
    });

    it('should fail when missing header', function(done) {
        chai.request(server)
            .get('/api/protected')
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});