var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// Route for creating a new user
router.post('/signup', userController.createUser);

// Route for getting all users
router.get('/', userController.getUsers);

// Route for getting a user by ID
router.get('/:id', userController.getUserById);

// Route for updating a user by ID
router.put('/:id', userController.updateUser);

// Route for deleting a user by ID
router.delete('/:id', userController.deleteUser);

router.post('/signin', userController.signIn);

// invalid route
router.get('*', (req, res) => {
    res.status(404).json({ error: "Invalid route" });
});

module.exports = router;
