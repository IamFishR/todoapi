var express = require('express');
var router = express.Router();
const Common = require('../helper/common');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Welcome To API' });
});

router.get('/unique', function (req, res, next) {

  res.status(200).json({
    status: 'success',
    uniqueId: Common.generateUniqueId()
  });
});

module.exports = router;
