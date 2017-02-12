var mongoose = require('mongoose');
var Tier = require('./tier');

var collectionSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    validTo: Date,
    goal: Number,
    allowCustomPrice: Boolean,
    tiers: [Tier]
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);