var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const logController = require('../controllers/logController');

router.get('/', authMiddleware, logController.getLogs);


module.exports = router;