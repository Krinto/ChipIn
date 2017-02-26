var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Collection = require('./collection');

var groupSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    collections: [Collection],
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);