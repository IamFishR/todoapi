var express = require('express');
var router = express.Router();
const crypto = require('crypto');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome To API' });
});

router.get('/unique', function (req, res, next) {

  function generateUniqueId() {
    return crypto.randomBytes(12).toString('hex');
  }

  res.status(200).json({
    uniqueId: generateUniqueId()
  });
});

module.exports = router;
