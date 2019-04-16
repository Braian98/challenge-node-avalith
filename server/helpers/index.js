
const errorMessage = (res, error, status = 500) => {
    let err = (typeof error === 'string') ? { message: error } : error;
    
    if(error.name === 'ValidationError') {
        err = {
            name: error.name,
            message: error.message,
            _message: error._message
        }
    }

    return res.status(status).json({
        status: false,
        err
    });
};

const successMessage = (res, name, data, message, token) => {
    let object = {
        status: true,
        message,
        [name]: data
    };

    if(token) {
        object.token = token;
    }

    return res.json(object);
}

module.exports = {
    errorMessage,
    successMessage
}