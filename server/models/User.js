const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not valid role'
}

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'The firstName is required']
    },
    surName: {
        type: String,
        required: [true, 'The surName is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique:true
    },
    password: {
        type: String,
        minlength: [6, 'The password must have 6 characters or more.'],
        required: [true, 'The password is required']
    },
    address: {
        type: String,
        required: [true, 'The address is required'] 
    },
    phoneNumber: {
        type: Number,
        required: [true, 'The phone number is required']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    img: { type: String },
    state: {
        type: Boolean, 
        default: 'true'
    }
});

// Instance methods
userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.state;

    return userObject;
}

userSchema.methods.encryptedPassword = function() {
    return bcrypt.hashSync(this.password, 10)
};

// Static methods
userSchema.statics.comparePassword = (password, passwordDB) => (
    bcrypt.compareSync(password, passwordDB)
);

userSchema.statics.generateToken = user => (
    jwt.sign({ user }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION })
);

userSchema.plugin(uniqueValidator, { message: '{PATH} must be an only one' });

module.exports = mongoose.model('users', userSchema);