const express = require('express');

const authController = require('../controllers/authController');
const { verifyBody } = require('../middlewares');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', verifyBody, authController.login);

module.exports = router;