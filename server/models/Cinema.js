const mongoose = require('mongoose');

const { Schema } = mongoose;

const cinemaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    address: {
        type: String
    },
    rooms: [{
        type: Schema.Types.ObjectId,
        ref:'rooms',
        autopopulate: { select:'-cinema -available', match: { available:true } }
    }],
    available: {
        type: Boolean,
        default: true
    }
});

// Instance methods
cinemaSchema.methods.toJSON = function() {
    const cinema = this;
    const cinemaObject = cinema.toObject();
    delete cinemaObject.available;

    return cinemaObject;
}

cinemaSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('cinemas', cinemaSchema);