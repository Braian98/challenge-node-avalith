const express = require('express');

// Middlewares
const { verifyBody } = require('../middlewares');
const { verifyToken, isAdmin } = require('../middlewares/authentication');

// Controller
const movieController = require('../controllers/movieController');

const router = express.Router();

// All movies
router.get('/', verifyToken, movieController.index);

// Movie by ID
router.get('/:id', verifyToken, movieController.showById);

// Search Movies
router.get('/search/:term', verifyToken, movieController.search);

// Create movie
router.post('/', [verifyToken, isAdmin], movieController.store);

// Update movie
router.put('/:id', [verifyToken, isAdmin, verifyBody], movieController.update);

// Disable movie
router.delete('/:id', [verifyToken, isAdmin], movieController.destroy);

module.exports = router;