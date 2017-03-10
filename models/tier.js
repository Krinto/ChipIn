var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var tierSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Tier', tierSchema);