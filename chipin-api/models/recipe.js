var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    ingredients: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema);