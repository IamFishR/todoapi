var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../config/authMiddleware');


router.post('/authenticate', userController.signIn);
router.post('/verifySingnIn', authMiddleware, userController.verifySingnIn);
router.post('/signup', userController.createUser);

// Route for getting all users
router.get('/', authMiddleware, userController.getUsers);

// Route for getting a user by ID
// router.get('/:id', authMiddleware, userController.getUserById);

// Route for updating a user by ID
// router.put('/:id', authMiddleware, userController.updateUser);

// Route for deleting a user by ID
// router.delete('/:id', authMiddleware, userController.deleteUser);
module.exports = router;
