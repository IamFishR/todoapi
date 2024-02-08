var express = require('express');
var router = express.Router();
const askmeController = require('../controllers/askmeController');

router.post('/', askmeController.askMe);

module.exports = router;