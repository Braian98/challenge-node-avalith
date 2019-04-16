const express = require('express');

// Middlewares
const { verifyBody } = require('../middlewares');
const { verifyToken, isAdmin } = require('../middlewares/authentication');
const { availableTickets, availableFunction } = require('../middlewares/purchases');

// Controller
const purchaseController = require('../controllers/purchaseController');

const router = express.Router();

// All purchases by authenticated user
router.get('/', verifyToken, purchaseController.index)

router.get('/all', [verifyToken, isAdmin], purchaseController.showAll);

// Create purchase
router.post('/', [verifyToken, verifyBody, availableFunction, availableTickets], purchaseController.store);

module.exports = router;