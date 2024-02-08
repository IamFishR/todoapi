var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');


router.post('/createRole', adminController.createRole); // localhost:3000/admins/createRole
router.post('/roles', adminController.getRoles); // localhost:3000/admins/roles

module.exports = router;