var _ = require('lodash');
var Recipe = require('../models/recipe.js');

exports.createRecipe = function (req, res){
    var newRecipe = new Recipe(req.body);
    newRecipe.save(function (err) {
        if (err) {
            res.json({info: 'error during recipe create', error: err});
        };
        res.json({info: 'recipe created successfully'});
    });
};

exports.getAllRecipes = function (req, res){
    Recipe.find(function (err, recipes) {
        if (err) {
            res.json({info: 'error during find recipes', error: err});
        };
        res.json({info: 'recipes found successfully', data: recipes});
    });
};

exports.getRecipe = function (req, res){
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) {
            res.json({info: 'error during recipe find', error: err});
        };
        if (recipe) {
            res.json({info: 'recipe found successfully', data: recipe});
        }
        else {
            res.json({info: 'recipe not found'});
        }
    });
};

exports.updateRecipe = function (req, res){
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) {
            res.json({info: 'error during recipe find', error: err});
        };
        if (recipe) {
            _.merge(recipe, req.body);
            recipe.save(function (err) {
                if (err) {
                    res.json({info: 'error during recipe update', error: err});
                };
                res.json({info: 'recipe updated successfully'});
            });
        }
        else {
            res.json({info: 'recipe not found'});
        }
    });
};

exports.deleteRecipe = function (req, res){
    Recipe.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.json({info: 'error during remove recipe', error: err});
        };
        res.json({info: 'recipe removed successfully'});
    });
};