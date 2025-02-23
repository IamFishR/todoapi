var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../config/authMiddleware');


router.post('/authenticate', userController.signIn);
router.post('/signup', userController.createUser);
router.post('/verifyToken', authMiddleware, (req, res) => {
    res.status(200).json({ status: 'success', message: 'Token is valid' });
});
router.post('/signout', userController.signOut);
router.post('/copypaste',authMiddleware, userController.copyPaste);

// Route for getting a user by ID
router.get('/:id', authMiddleware, userController.getUserById);

module.exports = router;
