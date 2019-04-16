// Model
const Cinema = require('../models/Cinema');

// Helpers
const { errorMessage, successMessage } = require('../helpers')

const index = async (req, res) => {
    try {
        const cinemas = await Cinema.find({ available: true })
                                    .sort('name')
                                    .exec();
        successMessage(res, 'cinemas', cinemas);
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
        const cinema = await Cinema.findOne(conditions)
                                .exec();

        if(!cinema) {
            return errorMessage(res, 'Cinema not found.', 400);
        }

        successMessage(res, 'cinema', cinema);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {
    const { name, address } = req.body;
    
    const newCinema = new Cinema({ name, address });

    try {
        const cinema = await newCinema.save();

        successMessage(res, 'cinema', cinema, 'Cinema created correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const update = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const cinema = await Cinema.findByIdAndUpdate(id, body, { new:true, omitUndefined:true })
                                .exec();

        if(!cinema) {
            return errorMessage(res, 'Cinema not found.', 400);
        }

        successMessage(res, 'cinema', cinema, 'Cinema updated correctly.');
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
        const cinema = await Cinema.findOneAndUpdate(conditions, { available: false }, { new: true })
                                .exec();                       
        if(!cinema) {
            return errorMessage(res, 'Cinema not found.', 400);
        }
        
        successMessage(res, 'cinema', cinema, 'Cinema deleted correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    index,
    showById,
    store,
    update,
    destroy
}