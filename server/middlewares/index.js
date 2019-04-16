// Helpers
const { errorMessage } = require('../helpers');

const verifyBody = (req, res, next) => {
    if(Object.keys(req.body).length > 0) {
        next();
    } else{
        errorMessage(res, 'The body is empty.', 400);
    }
}

module.exports = {
    verifyBody
}