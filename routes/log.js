var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const logController = require('../controllers/logController');

router.get('/', authMiddleware, logController.getLogs);
router.post('/sms', authMiddleware, logController.sendSms);
router.post('/news', authMiddleware, logController.storeNews);


module.exports = router;