var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Reports = require('../controllers/reportController');


// stock market reporting
router.post('/stock/txn', authMiddleware, Reports.stockTxn);


// daily expense report
router.post('/expense', authMiddleware, Reports.dailyExpense);

module.exports = router;