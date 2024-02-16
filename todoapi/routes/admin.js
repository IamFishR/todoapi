var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../config/authMiddleware');

// localhost:3000/admins/createRole
router.post('/createRole', authMiddleware, adminController.createRole);
router.post('/roles', authMiddleware, adminController.getRoles);

router.post('/createCategory', authMiddleware, adminController.createCategory);
router.post('/categories', authMiddleware, adminController.getCategories);

module.exports = router;