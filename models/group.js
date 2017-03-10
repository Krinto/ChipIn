var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Collection = require('./collection');

var groupSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    collections: [Collection.schema],
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Group', groupSchema);