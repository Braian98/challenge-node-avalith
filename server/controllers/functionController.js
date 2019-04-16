// Models
const FunctionMovie = require('../models/FunctionMovie');
const Movie = require('../models/Movie');

// Helpers
const { errorMessage, successMessage } = require('../helpers');

const index = async (req, res) => {
    try {
        const functions = await FunctionMovie.find({ available:true })
                                            .exec();

        successMessage(res, 'functions', functions);
    } catch (err) {
        errorMessage(res, err);
    }
}

const showById = async (req, res) => {
    const conditions = {
        _id: req.params.id,
        available: true
    }

    try {
        const functionDB = await FunctionMovie.findOne(conditions)
                                            .exec();

        if(!functionDB) {
            return errorMessage(res, 'Function not found.',400);
        }

        successMessage(res, 'function', functionDB)
    } catch (err) {
        errorMessage(res, err);
    }
}

const search = async (req, res) => {
    const conditions = {
        cinema: req.params.cinema,
        available: true
    }

    try {
        const functionDB = await FunctionMovie.find(conditions)
                                            .exec();
        if(functionDB.length <= 0) {
            return errorMessage(res, 'function not found.', 400)
        }

        successMessage(res, 'functions', functionDB);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {
    const { cinema, room, movie, horary, tickets } = req.body;

    const newFunction = new FunctionMovie({
        cinema,
        room,
        movie,
        horary,
        tickets,
        availableTickets: tickets
    });

    try {
        const functionDB = await newFunction.save();

        updateMovie(functionDB._id, movie);

        successMessage(res, 'function', functionDB, 'function created correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const updateMovie = async (idFunction, idMovie) => {
    const data = { functions: idFunction };

    await Movie.findByIdAndUpdate(idMovie, { $push: data }, { new:true })
            .exec();
}

const destroy = async (req, res) => {
    const conditions = {
        _id: req.params.id,
        available: true
    }
    const options = { new:true, omitUndefined: true };

    try {
        const functionDB = await FunctionMovie.findOneAndUpdate(conditions, { available:false }, options)
                                            .exec();  
        if(!functionDB) {
            return errorMessage(res, 'function not found.', 400)
        }

        successMessage(res, 'function', functionDB, 'function disabled correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    index,
    showById,
    search,
    store,
    destroy
}