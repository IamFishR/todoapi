var express = require('express');
var router = express.Router();
const Common = require('../helper/common');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome To API' });
});

router.get('/ping', function (req, res, next) {
  res.status(200).json({
    status: 'success',
    message: 'pong'
  });
});

router.get('/unique', async (req, res, next) => {
  const uniqueId = await Common.generateUniqueId();
  res.status(200).json({
    status: 'success',
    uniqueId: uniqueId
  });
});

module.exports = router;
