var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    googleId: String,
	facebookId: String,
	displayName: String,
	active: Boolean
}, {
    timestamps: true
});

userSchema.pre('save', function(next){
    var user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt){
            if(err){
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err, hash){
                if(err){
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

userSchema.methods.toJSON = function () {
	var user = this.toObject();
	delete user.password,
           user.googleId,
           user.facebookId;
	return user;
};

userSchema.methods.comparePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch){
        if(err){
            return callback(err);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);