const express = require('express');

// Middlewares
const { verifyBody } = require('../middlewares');
const { verifyToken, isAdmin } = require('../middlewares/authentication');

// Controller
const cinemaController = require('../controllers/cinemaController');

const router = express.Router();

// All users
router.get('/', verifyToken, cinemaController.index);

// User by ID
router.get('/:id', verifyToken, cinemaController.showById);

// Create User
router.post('/', [verifyToken, isAdmin, verifyBody], cinemaController.store);

// Update User
router.put('/:id', [verifyToken, isAdmin, verifyBody], cinemaController.update);

// Disable User
router.delete('/:id', [verifyToken, isAdmin], cinemaController.destroy);

module.exports = router;