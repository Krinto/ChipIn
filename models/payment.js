var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var paymentSchema = new Schema({

    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    collection: { 
        type: Schema.Types.ObjectId, 
        ref: 'Collection',
        required: true
    },
    amount: { 
        type: Number,
        required: true
    },
    anonymous: {
        type: Boolean
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);