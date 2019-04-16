const mongoose = require('mongoose');

const { Schema } = mongoose;

const functionMovieSchema = new Schema({
    cinema: {
        type: Schema.Types.ObjectId,
        ref: 'cinemas',
        autopopulate: { select: '-rooms -available' },
        required: [true, 'The cinema is required']
    },
    room: {
        type: Schema.Types.ObjectId,
        ref: 'rooms',
        autopopulate: { select: '-cinema -available' },
        required: [true, 'The room is required']
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movies',
        autopopulate: { select:'-functions -available' },
        required: [true, 'The movie is required']
    },
    horary: {
        type: String,
        required: [true, 'The horary is required']
    },
    tickets: {
        type: Number,
        required: [true, 'The tickets is required']
    },
    availableTickets: {
        type: Number
    },
    available: {
        type: Boolean,
        default: true
    }
});

// Instance methods
functionMovieSchema.methods.toJSON = function() {
    const functionMovie = this;
    const functionObject = functionMovie.toObject();
    delete functionObject.available;

    return functionObject;
}

functionMovieSchema.plugin(require('mongoose-autopopulate'));

functionMovieSchema.post('save', function(doc, next) {
    doc.populate('movie cinema room', '-functions -rooms -cinema -available')
        .execPopulate().then(function() {
            next();
        });
});

module.exports = mongoose.model('functions', functionMovieSchema);