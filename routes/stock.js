var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Stocks = require('../controllers/stockController');

// stock market reporting
router.get('/sectors', authMiddleware, Stocks.getSectors);
router.post('/add', authMiddleware, Stocks.addStock);
router.get('/lists', authMiddleware, Stocks.getStocks);
router.post('/updateStock', authMiddleware, Stocks.updateStock);
router.post('/liveprice', authMiddleware, Stocks.addLivePrice);

// Fees API
router.post('/fees', authMiddleware, Stocks.calculateFees);

module.exports = router;