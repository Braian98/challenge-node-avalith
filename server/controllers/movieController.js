// Model
const Movie = require('../models/Movie');

// Helpers
const { errorMessage, successMessage } = require('../helpers');

const index = async (req, res) => {
    try {
        const movies = await Movie.find({ available:true })
                                .sort('name')
                                .exec();
        successMessage(res, 'movies', movies);
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
        const movie = await Movie.findOne(conditions)
                                .sort('name')
                                .exec();
        if(!movie) {
            return errorMessage(res, 'Movie not found.', 400);
        }

        successMessage(res, 'movie', movie);
    } catch (err) {
        errorMessage(res, err);
    }
}

const search = async (req, res) => {
    const { term } = req.params;
    const conditions = {
        name: new RegExp(term),
        available: true
    }

    try {
        const movie = await Movie.find(conditions)
                            .sort('name')
                            .exec();
        if(movie.length <= 0) {
            return errorMessage(res, `No movies that match the term: ${ term }`, 400);
        }

        successMessage(res, 'movies', movie);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {
    const { name, description, ticketPrice } = req.body;

    const newMovie = new Movie({ name, description, ticketPrice });

    try {
        const movie = await newMovie.save();

        successMessage(res, 'movie', movie, 'Movie created correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const update = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const movie = await Movie.findByIdAndUpdate(id, body, { new: true, omitUndefined: true })
                                .exec();
        if(!movie) {
            return errorMessage(res, 'Movie not found.', 400);
        }

        successMessage(res, 'movie', movie, 'Movie updated correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const destroy = async (req, res) => {
    const conditions = {
        _id: req.params.id,
        available: true
    }

    try {
        const movie = await Movie.findOneAndUpdate(conditions, { available: false })
                                .exec();
        if(!movie) {
            return errorMessage(res, 'Movie not found.', 400);
        }

        successMessage(res, 'movie', movie, 'Movie disabled correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    index,
    showById,
    search,
    store,
    update,
    destroy
}