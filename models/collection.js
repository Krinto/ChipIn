var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Tier = require('./tier');

var collectionSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    validTo: Date,
    goal: Number,
    allowCustomPrice: Boolean,
    tiers: [Tier.schema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);