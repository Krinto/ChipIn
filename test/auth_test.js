var env = process.env.NODE_ENV || 'development';
var config = require('../config/main')[env];
var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var chaiHttp = require('chai-http');
var server = require('../index');
var db = require('./test_helpers');

chai.use(chaiHttp);

describe('Authentication', function() {

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