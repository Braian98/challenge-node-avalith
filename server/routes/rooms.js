const express = require('express');

// Middlewares
const { verifyToken, isAdmin } = require('../middlewares/authentication');
const { ifExistCinema } = require('../middlewares/rooms');
const { verifyBody } = require('../middlewares');

// Controller
const roomController = require('../controllers/roomController');

const router = express.Router();

// All rooms by ID cinema
router.get('/:cinema', verifyToken, roomController.showByCinema);

// Create room
router.post('/', [verifyToken, isAdmin, verifyBody, ifExistCinema], roomController.store);

// Update room
router.put('/:id', [verifyToken, isAdmin, verifyBody], roomController.update);

// Disable room
router.delete('/:id', [verifyToken, isAdmin], roomController.destroy);

module.exports = router;