var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Stocks = require('../controllers/stockController');
const StockDetails = require('../controllers/stock/stockController');

const stockDt = new StockDetails();

// stock market reporting
router.get('/sectors', authMiddleware, Stocks.getSectors);
router.post('/add', authMiddleware, Stocks.addStock);
router.get('/lists', authMiddleware, Stocks.getStocks);
router.post('/updateStock', authMiddleware, Stocks.updateStock);
router.post('/liveprice', authMiddleware, Stocks.addLivePrice);

// details of stock
router.get('/listall', authMiddleware, (req, res) => {
    stockDt.getCompanyStocksWithIndustry(req, res);
});

// Fees API
router.post('/fees', authMiddleware, Stocks.calculateFees);

module.exports = router;