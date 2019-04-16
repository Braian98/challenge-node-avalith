// Models
const Room = require('../models/Room');
const FunctionMovie = require('../models/FunctionMovie');
const Movie = require('../models/Movie');

// Helpers
const { errorMessage } = require('../helpers');

const ifExistMovie = async (req, res, next) => {
    const { movie } = req.body;

    try {
        const countMovie = await Movie.countDocuments({ _id: movie });

        if(countMovie > 0) {
            next();
        } else {
            return errorMessage(res, 'Movie not found.', 400);
        }
    } catch (err) {
        errorMessage(res, err);
    }
}

const verifyCapacity = async (req, res, next) => {
    const { room:_id, tickets } = req.body;

    try {
        const room = await Room.findOne({ _id , available: true }, 'capacity cinema')
                            .exec();
        if(!room) {
            return errorMessage(res, 'Room not found.', 400);
        }

        if(tickets > room.capacity) {
            return errorMessage(res, 'Exceeds the capacity of the room.', 400);
        } 

        req.body.cinema = room.cinema;
        next();
    } catch (err) {
        errorMessage(res, err);
    }
}

const verifyHorary = async (req, res, next) => {
    const  { horary, cinema } = req.body;

    const regExpHour = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/

    if(!regExpHour.test(horary)){
        return errorMessage(res, 'Horary not valid.', 400);
    }

    try {
        const countFunction = await FunctionMovie.countDocuments({ cinema, horary, available: true })
                                                .exec();
        if(countFunction > 0) {
            return errorMessage(res, 'Horary not available.', 400);
        }

        next();
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    ifExistMovie,
    isAvailableFunction: [verifyCapacity, verifyHorary]
}