var express = require('express');
var router = express.Router();
const aiController = require('../controllers/aiController');
const { authMiddleware } = require('../config/authMiddleware');

router.post('/', authMiddleware, aiController.chat);
// router.post('/chat', authMiddleware, askmeController.askChatMe);
// router.post('/hdfcsms', authMiddleware, askmeController.askHdfcBankSmsAnalysis);

module.exports = router;