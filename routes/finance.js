var express = require('express');
var router = express.Router();
const financeController = require('../controllers/financeController');
const { authMiddleware } = require('../config/authMiddleware');


/* GET home page. */
router.get('/calc-allocations', authMiddleware, financeController.calculateAllocations);
router.get('/investmentareas', authMiddleware, financeController.getInvestmentAreas);
module.exports = router;