var env = process.env.NODE_ENV || 'development';
var config = require('../config/main')[env];
var chai = require('chai');
var should = chai.should();
var expect = chai.expect();
var chaiHttp = require('chai-http');
var server = require('../index');
var mockgoose = require('mockgoose');
var db = require('./test_helpers');
var User = require('../models/user');

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

    describe('Register', function() {

        before(function(done) {
            var newUser = new User({
                email: 'test@test.com',
                displayName: 'testing',
                password: 'password'
            });
            newUser.save(function(err, user){
                if(err){
                    done(err);
                }
                done();
            });
        });

        after(function(done) {
            mockgoose.reset(function() {
                done();
            });
        });

        it('should fail when no email provided', function(done) {
            var req = {
                name: 'bob',
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/register')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('You must enter an email');
                    done();
            });
        });

        it('should fail when no password provided', function(done) {
            var req = {
                email: 'bob@test.com',
                name: 'bob'
            };
            chai.request(server)
                .post('/api/auth/register')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('You must enter a password');
                    done();
            });
        });

        it('should fail when user already exists', function(done) {
            var req = {
                email: 'test@test.com',
                displayName: 'testing',
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/register')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Email already in use');
                    done();
            });
        });

        it('should create new user', function(done) {
            var req = {
                email: 'bob@test.com',
                name: 'bob',
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/register')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully created new user');
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    done();
            });
        });
    });

    describe('Login', function() {
        
        before(function(done) {
            var newUser = new User({
                email: 'test@test.com',
                displayName: 'testing',
                password: 'password'
            });
            newUser.save(function(err, user){
                if(err){
                    done(err);
                }
                done();
            });
        });

        after(function(done) {
            mockgoose.reset(function() {
                done();
            });
        });

        it('should fail when missing email', function(done) {
            var req = {
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/authenticate')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Authentication failed');
                    done();
            });
        });

        it('should fail when missing password', function(done) {
            var req = {
                email: 'test@test.com'
            };
            chai.request(server)
                .post('/api/auth/authenticate')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Authentication failed');
                    done();
            });
        });

        it('should fail when user not in database', function(done) {
            var req = {
                email: 'bob@test.com',
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/authenticate')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Authentication failed');
                    done();
            });
        });

        it('should login with correct credentials', function(done) {
            var req = {
                email: 'test@test.com',
                password: 'password'
            };
            chai.request(server)
                .post('/api/auth/authenticate')
                .send(req)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully logged in');
                    res.body.should.have.property('token');
                    res.body.should.have.property('user');
                    done();
            });
        });

        describe('Logged In', function() {
            before(function(done) {
                var newUser = new User({
                    email: 'test@test.com',
                    displayName: 'testing',
                    password: 'password'
                });
                newUser.save(function(err, user){
                    if(err){
                        done(err);
                    }
                    done();
                });
            });

            after(function(done) {
                mockgoose.reset(function() {
                    done();
                });
            });

            it('should authenticate with correct token', function(done) {
                var req = {
                    email: 'test@test.com',
                    password: 'password'
                };
                chai.request(server)
                    .post('/api/auth/authenticate')
                    .send(req)
                    .end((err, res) => {
                        res.should.have.status(201);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Successfully logged in');
                        res.body.should.have.property('token');
                        res.body.should.have.property('user');
                        chai.request(server)
                            .get('/api/protected')
                            .set('Authentication', 'JWT ' + res.body.token)
                            .end((err, res) => {
                                res.should.have.status(200);
                                res.body.should.be.a('object');
                                res.body.should.have.property('message');
                                done();
                        });
                });
            });
        });
    });
});