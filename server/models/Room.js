const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    capacity: {
        type: Number,
        required: [true, 'The capacity is required']
    },
    available: {
        type: Boolean,
        default: true
    },
    cinema: {
        type: Schema.Types.ObjectId,
        ref:'cinemas',
        autopopulate: { select: '-rooms -available' },
        required: [true, 'The cinema is required']
    }
});

// Instance methods
roomSchema.methods.toJSON = function() {
    const roomSchema = this;
    const roomObject = roomSchema.toObject();
    delete roomObject.available;

    return roomObject;
}

roomSchema.plugin(require('mongoose-autopopulate'));

roomSchema.post('save', function(doc, next) {
    doc.populate('cinema', '-rooms -available').execPopulate().then(function() {
        next();
    });
});

module.exports = mongoose.model('rooms', roomSchema);