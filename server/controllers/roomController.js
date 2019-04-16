// Models
const Room = require('../models/Room');
const Cinema = require('../models/Cinema');

// Helpers
const { errorMessage, successMessage } = require('../helpers');

const showByCinema = async (req, res) => {
    const conditions = {
        cinema: req.params.cinema,
        available: true
    }

    try {
        const roomDB = await Room.find(conditions).exec();

        if(roomDB.length <= 0) {
            return errorMessage(res, 'cinema not found', 400);
        }
        
        successMessage(res, 'rooms', roomDB);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {
    const { name, capacity, cinema } = req.body;

    const newRoom = new Room({ name, capacity, cinema });

    try {
        const roomDB = await newRoom.save();

        await Cinema.findByIdAndUpdate(cinema, { $push: { rooms: roomDB._id } }, { new:true })
                .exec();

        successMessage(res, 'room', roomDB, 'Room created correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const update = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const roomDB = await Room.findByIdAndUpdate(id, body, { new:true, omitUndefined:true })
                            .exec();
        if(!roomDB) {
            return errorMessage(res, 'Room not found.', 400)
        }

        successMessage(res, 'room', roomDB, 'Room updated correctly.');
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
        const roomDB = await Room.findOneAndUpdate(conditions, { available: false } , { new:true })
                            .exec();
        if(!roomDB) {
            return errorMessage(res, 'Room not found.', 400)
        }

        successMessage(res, 'room', roomDB, 'Room disabled correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    showByCinema,
    store,
    update,
    destroy
}