var express = require('express');
var router = express.Router();
const askmeController = require('../controllers/askmeController');
const { authMiddleware } = require('../config/authMiddleware');

router.post('/', authMiddleware, askmeController.askMe);
router.post('/chat', authMiddleware, askmeController.askChatMe);
router.post('/hdfcsms', authMiddleware, askmeController.askHdfcBankSmsAnalysis)

module.exports = router;