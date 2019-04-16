const express = require('express');

// Midllewares
const { verifyBody } = require('../middlewares');
const { verifyToken, isAdmin } = require('../middlewares/authentication');

// Controller
const userController = require('../controllers/userController');

const router = express.Router();

// All users
router.get('/', verifyToken, userController.index);

// User by ID
router.get('/:id', verifyToken, userController.showById);

// Create user
router.post('/', [verifyToken, isAdmin, verifyBody], userController.store);

// Update user
router.put('/:id', [verifyToken, isAdmin, verifyBody], userController.update);

// Disable user
router.delete('/:id', [verifyToken, isAdmin], userController.destroy);

module.exports = router;