// Model
const Cinema = require('../models/Cinema');

// Helpers
const { errorMessage } = require('../helpers');

const ifExistCinema = async (req, res, next) => {
    const { cinema } = req.body;

    try {
        const countCinema = await Cinema.countDocuments({ _id: cinema })
                                    .exec();
        if(countCinema > 0) {
            next()
        } else {
            return errorMessage(res, 'Cinema not found.', 400);
        }
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    ifExistCinema
}