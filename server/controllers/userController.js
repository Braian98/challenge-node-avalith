// Model
const User = require('../models/User');

// Helpers
const { errorMessage, successMessage } = require('../helpers');

const index = async (req, res) => {
    try {
        const users = await User.find({ state: true })
                            .exec();
        successMessage(res, 'users', users);
    } catch (err) {
        errorMessage(res, err);
    }
}

const showById = async (req, res) => {
    const conditions = {
        _id: req.params.id,
        state: true
    }
    
    try {
        const user = await User.findOne(conditions)
                            .exec();
        if(!user) {
            return errorMessage(res, 'User not found.', 400)
        }

        successMessage(res, 'user', user);
    } catch (err) {
        errorMessage(res, err);
    }
}

const store = async (req, res) => {
    const { firstName, surName, email, password, address, phoneNumber, role } = req.body;

    const newUser = new User({
        firstName,
        surName,
        email,
        address,
        phoneNumber,
        password,
        role
    });

    if(!newUser.validateSync()){
        newUser.password = newUser.encryptedPassword();
    }

    try {
        const user = await newUser.save();

        successMessage(res, 'user', user, 'User created correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const update = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, body, { new: true, omitUndefined:true })
                            .exec();
        if(!user) {
            return errorMessage(res, 'User not found.', 400);
        }
        
        successMessage(res, 'user', user, 'User updated correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const destroy = async (req, res) => {
    const conditions = {
        _id: req.params.id,
        state: true
    }

    try {
        const user = await User.findOneAndUpdate(conditions, { state: false }, { new: true })
                            .exec();
        if(!user) {
            return errorMessage(res, 'User not found.', 400);
        }
        
        successMessage(res, 'user', user, 'User disabled correctly.');
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