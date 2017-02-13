var jwt = require('jsonwebtoken');
var User = require('../models/user');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/main')[env];

exports.register = function(req, res, next){
    var email = req.body.email;
    var name = req.body.name;
    var pass = req.body.password;
    if(!email){
        return res.status(422).json({ message: 'You must enter an email' });
    } 
    if(!pass) {
        return res.status(422).json({ message: 'You must enter a password' });
    }
    User.findOne({ email: email }, function(err, existingUser){
        if(err){
            return next(err);
        }

        if(existingUser){
            return res.status(422).json({ message: 'Email already in use' });
        }

        var newUser = new User({
            email: email,
            displayName: name,
            password: pass
        });

        newUser.save(function(err, user){
            if(err){
                return next(err);
            }
            var token = jwt.sign(user.toJSON(), config.secret, {
                expiresIn: 60 * 30
            });
            res.status(201).json({ message: 'Successfully created new user', token: token, user: user.toJSON() });
        });
    });
    

    
};

exports.authenticate = function(req, res, next){
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            return next(err);
        }
        if(!user){
            res.status(400).json({ message: 'Authentication failed'});
        }
        else{
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 60 * 30
                    });
                    res.status(201).json({ message: 'Successfully logged in', token: 'JWT ' + token, user: user.toJSON() });
                }
                else {
                    res.status(400).json({ message: 'Authentication failed'});
                }
            });
        }
    });
};