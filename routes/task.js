var express = require('express');
var router = express.Router();
const TasksController = require('../controllers/tasksController');
const { authMiddleware } = require('../config/authMiddleware');

// url: /tasks/:id
router.get('/:id?', authMiddleware, TasksController.getTask);
// url: /tasks/project/:projectId - get all tasks for a project
router.get('/project/:projectId?', authMiddleware, TasksController.getTasks);

// url: /tasks/user/:userId
router.get('/user/:userId?', authMiddleware, TasksController.getTasksByUser);
router.post('/', authMiddleware, TasksController.createTask);
router.patch('/', authMiddleware, TasksController.updateTask);
router.delete('/', authMiddleware, TasksController.deleteTask);

// subtasks
router.post('/subtasks', authMiddleware, TasksController.createSubtask);
router.patch('/subtasks', authMiddleware, TasksController.updateSubtask);
router.delete('/subtasks', authMiddleware, TasksController.deleteSubtask);
router.get('/subtasks/:taskId?', authMiddleware, TasksController.getSubtasks);

module.exports = router;