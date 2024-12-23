var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../config/authMiddleware');


router.post('/authenticate', userController.signIn);
router.post('/signup', userController.createUser);
router.post('/verifySingnIn', authMiddleware, userController.verifySingnIn);
router.post('/signout', authMiddleware, userController.signOut);
router.post('/copypaste',authMiddleware, userController.copyPaste);

// Route for getting a user by ID
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
