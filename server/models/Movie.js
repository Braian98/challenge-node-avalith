const mongoose = require('mongoose');

const { Schema } = mongoose;

const movieSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    description: {
        type: String
    },
    ticketPrice: {
        type: Number,
        required: [true, 'The ticketPrice is required']
    },
    functions: [{
        type: Schema.Types.ObjectId,
        ref:'functions',
        autopopulate: {
            select: '-movie -available',
            match: { available:true },
            populate: { path:'cinema' }
        }
    }],
    available: {
        type: Boolean,
        default: true
    }
});

// Instance methods
movieSchema.methods.toJSON = function() {
    const movieSchema = this;
    const movieObject = movieSchema.toObject();
    delete movieObject.available;

    return movieObject;
}

movieSchema.plugin(require('mongoose-autopopulate'));

movieSchema.pre('findOneAndRemove', function(){
    this.populate({ path:'functions', select: '-movie -available', match: { available:true }, populate: { path:'cinema' } });
});

module.exports = mongoose.model('movies', movieSchema);