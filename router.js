var express = require('express');
var passport = require('passport');

var groupsCountroller = require('./controllers/groups');
var authController = require('./controllers/auth');

module.exports = function(app) {
    app.use(passport.initialize());
    require('./config/passport')(passport);

    var apiRoutes = express.Router();
    var authRoutes = express.Router();
    var groupRoutes = express.Router();

    // ====================================================
    // Auth Routes

    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', authController.register);

    // Login route
    authRoutes.post('/authenticate', authController.authenticate);

    // ====================================================
    // Test Routes
    apiRoutes.get('/', function (req, res) {
        res.json({message: 'Hello World'}); 
    });

    apiRoutes.get('/protected', passport.authenticate('jwt', { session: false }), function (req, res) {
        res.json({message: 'Success the user id is: ' + req.user._id }); 
    });

    // ====================================================
    // Group Routes

    apiRoutes.use('/group', groupRoutes);
    groupRoutes.use(passport.authenticate('jwt', { session: false }));

    groupRoutes.get('/', groupsCountroller.getAllGroups);

    groupRoutes.post('/', groupsCountroller.createGroup);

    groupRoutes.get('/:id', groupsCountroller.getGroup);

    groupRoutes.put('/:id', groupsCountroller.updateGroup);

    groupRoutes.delete('/:id', groupsCountroller.deleteGroup);

    // ====================================================
    // Base url for api routes
    app.use('/api', apiRoutes);
}