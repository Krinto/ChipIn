var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/main')[env];
var ObjectId = require('mongoose').Types.ObjectId; 

module.exports = function(passport){
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    //opts.issuer = "accounts.examplesoft.com";
    //opts.audience = "yoursite.net";

    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.findById(jwt_payload._id, function(err, user){
            if(err){
                return done(err, false);
            }
            if(user){
                done(null, user);
            } 
            else{
                done(null, false);
            }
        });
    }));
};