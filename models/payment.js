var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = mongoose.Schema({

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