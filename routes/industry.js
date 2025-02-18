var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const Industries = require('../controllers/stock/industrysectorController');

const industries = new Industries();

router.get('/sectors', authMiddleware, (req, res) => {
    industries.getAllIndustries(req, res);
});

// addbulkIndustry
router.post('/addbulk', authMiddleware, (req, res) => {
    industries.addbulkIndustry(req, res);
});
module.exports = router;