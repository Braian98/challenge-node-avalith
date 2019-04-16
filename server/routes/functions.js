const express = require('express');

// Middlewares
const { verifyBody } = require('../middlewares');
const { verifyToken, isAdmin } = require('../middlewares/authentication');
const { isAvailableFunction, ifExistMovie } = require('../middlewares/functions');

// Controller
const functionController = require('../controllers/functionController');

const router = express.Router();

// All functions
router.get('/', verifyToken, functionController.index);

// Function by ID
router.get('/:id', verifyToken, functionController.showById);

// Function by ID Cinema
router.get('/search/:cinema', verifyToken, functionController.search);

// Create function
router.post('/', [verifyToken, isAdmin, verifyBody, ifExistMovie, isAvailableFunction], functionController.store);

// Disable function
router.delete('/:id', [verifyToken, isAdmin], functionController.destroy);

module.exports = router;