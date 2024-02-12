var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../config/authMiddleware');


router.post('/createRole', authMiddleware, adminController.createRole); // localhost:3000/admins/createRole
router.post('/roles', authMiddleware, adminController.getRoles); // localhost:3000/admins/roles

module.exports = router;