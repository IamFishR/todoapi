const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const StockSentimentAnalyzer = require('../controllers/stock/sentimentController');

const sentimentAnalyzer = new StockSentimentAnalyzer();

router.post('/analyzeActivity', authMiddleware, (req, res) => {
    sentimentAnalyzer.analyzeFiiDiiActivity(req, res);
});

router.post('/explainfiidata', authMiddleware, (req, res) => {
    sentimentAnalyzer.explainFiiDataStats(req, res);
});

module.exports = router;