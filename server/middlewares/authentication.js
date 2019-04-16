const jwt = require('jsonwebtoken');

// Helpers
const { errorMessage } = require('../helpers');

const verifyToken = async (req, res, next) => {
    const token = req.get('token');
    
    try {
        const decoded = await jwt.verify(token, process.env.SEED);
        req.user = decoded.user;
        next();
    } catch (err) {
        errorMessage(res, err, 401);
    }
}

const isAdmin = (req, res, next) => {
    const { role } = req.user;

    if(role !== 'ADMIN_ROLE') {
        return errorMessage(res, "You don't have permission", 403);
    }
    next();
}

module.exports = {
    verifyToken,
    isAdmin
}