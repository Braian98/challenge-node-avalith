const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        autopopulate: { select: '-state -role' },
        required: [true, 'The user is required']
    },
    function: {
        type: Schema.Types.ObjectId,
        ref: 'functions',
        autopopulate: { select: '-tickets -availableTickets' },
        required: [true, 'The functions is required']
    },
    tickets: {
        type: Number,
        required: [true, 'The tickets is required']
    },
    total: {
        type: Number,
        required: [true, 'The total is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

purchaseSchema.plugin(require('mongoose-autopopulate'));

purchaseSchema.post('save', function(doc, next) {
    doc.populate('user', '-state -role')
        .populate('function', '-available -tickets -availableTickets')
        .execPopulate().then(function() {
            next();
        });
});

module.exports = mongoose.model('purchases', purchaseSchema);