var express = require('express');
var passport = require('passport');

var recipesCountroller = require('./controllers/recipes');
var authController = require('./controllers/auth');

module.exports = function(app) {
    app.use(passport.initialize());
    require('./config/passport')(passport);

    var apiRoutes = express.Router();
    var authRoutes = express.Router();
    var recipeRoutes = express.Router();

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
    // Recipe Routes

    apiRoutes.use('/recipe', recipeRoutes);
    recipeRoutes.use(passport.authenticate('jwt', { session: false }));

    recipeRoutes.get('/', recipesCountroller.getAllRecipes);

    recipeRoutes.post('/', recipesCountroller.createRecipe);

    recipeRoutes.get('/:id', recipesCountroller.getRecipe);

    recipeRoutes.put('/:id', recipesCountroller.updateRecipe);

    recipeRoutes.delete('/:id', recipesCountroller.deleteRecipe);

    // ====================================================
    // Base url for api routes
    app.use('/api', apiRoutes);
}