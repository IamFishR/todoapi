var express = require('express');
var router = express.Router();
const askmeController = require('../controllers/askmeController');
const { authMiddleware } = require('../config/authMiddleware');

router.post('/', authMiddleware, askmeController.askMe);

module.exports = router;