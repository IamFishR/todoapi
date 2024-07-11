var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Reports = require('../controllers/reportController');


// stock market reporting
router.post('/stock/txn', authMiddleware, (req, res) => {
    return Reports.stockTxn(req, res);
});

module.exports = router;