var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Stocks = require('../controllers/stockController');


// stock market reporting
router.post('/add', authMiddleware, Stocks.addStock);
router.get('/sectors', authMiddleware, Stocks.getSectors);

module.exports = router;