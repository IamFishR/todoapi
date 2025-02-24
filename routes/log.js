var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const logController = require('../controllers/logController');

router.get('/', authMiddleware, logController.getLogs);
router.post('/sms', authMiddleware, logController.sendSms);
router.post('/news', authMiddleware, logController.storeNews);

// reminder/notification
router.post('/reminder', authMiddleware, logController.storeReminder);
router.get('/reminder', authMiddleware, logController.getReminders);


module.exports = router;