var express = require('express');
var router = express.Router();
const financeController = require('../controllers/financeController');


/* GET home page. */
router.get('/calc-allocations', authMiddleware, financeController.calculateAllocations);
module.exports = router;