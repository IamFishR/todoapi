var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminController');
const { authMiddleware } = require('../config/authMiddleware');


// router.post('/createRole', authMiddleware, adminController.createRole);
// router.post('/roles', authMiddleware, adminController.getRoles);

// router.post('/createCategory', authMiddleware, adminController.createCategory);
// router.post('/categories', authMiddleware, adminController.getCategories);


router.post('/file', adminController.uploadFile);

module.exports = router;