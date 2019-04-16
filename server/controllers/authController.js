// Model
const User = require('../models/User');

// Helpers
const { errorMessage, successMessage } = require('../helpers'); 

const register = async (req, res) => {
    const { firstName, surName, email, address, phoneNumber, password } = req.body;


    const newUser = new User({
        firstName,
        surName,
        email,
        address,
        phoneNumber,
        password
    });

    if(!newUser.validateSync()){
        newUser.password = newUser.encryptedPassword();
    }

    try {
        const userDB = await newUser.save();

        successMessage(res, 'user', userDB, 'User registered correctly.');
    } catch (err) {
        errorMessage(res, err);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!password) {
        return errorMessage(res, 'The password is empty', 400)
    }

    try {
        const userDB = await User.findOne({ email, state: true })
                                .exec();
        if(!userDB) {
            return errorMessage(res, 'User not found.', 400);
        }

        if(!User.comparePassword(password, userDB.password)) {
            return errorMessage(res, 'Incorrect Password.', 400);
        }

        const token = User.generateToken(userDB);

        successMessage(res, 'user', userDB, 'The user has successfully logged in.', token);

    } catch (err) {
        errorMessage(res, err);
    }
}

module.exports = {
    register,
    login
};