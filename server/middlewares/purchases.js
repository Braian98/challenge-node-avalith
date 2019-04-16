// Model
const FunctionMovie = require('../models/FunctionMovie');

// Helpers
const { errorMessage } = require('../helpers');

const availableFunction = async (req, res, next) => {
    const conditions = {
        _id: req.body.idfunction,
        available: true
    }

    try {
        const countFunction = await FunctionMovie.countDocuments(conditions)
                                                .exec();
        if(countFunction > 0) {
            next();
        } else {
            return errorMessage(res, "The function is not exist or available.", 400)
        }
    } catch (err) {
        errorMessage(res, err);
    }
}

const availableTickets = async (req, res, next) => {
    const { tickets, idfunction } = req.body;

    try {
        const functionDB = await FunctionMovie.findById(idfunction, 'availableTickets')
                                            .exec();

        const availableTickets = functionDB.availableTickets - tickets;

        if(availableTickets < 0) {
            return errorMessage(res, `Only there are ${ functionDB.availableTickets } tickets available.`, 400);
        } else if(availableTickets === 0){
            req.functionUpdated = { availableTickets, available: false }
        } else {
            req.functionUpdated = { availableTickets }
        }

        req.body.total = functionDB.movie.ticketPrice * tickets;
        
        next();
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    availableTickets,
    availableFunction
}