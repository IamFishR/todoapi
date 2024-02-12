var express = require('express');
var router = express.Router();
const TasksController = require('../controllers/tasksController');
const ProjectsController = require('../controllers/projectsController');
const { authMiddleware } = require('../config/authMiddleware');

// tasks
// router.get('/tasks', TasksController.getTasks);
// router.get('/tasks/:id', TasksController.getTask);
// router.post('/tasks', TasksController.createTask);
// router.patch('/tasks/:id', TasksController.updateTask);
// router.delete('/tasks/:id', TasksController.deleteTask);
// // router.get('/tasks/:id/comments', TasksController.getComments);

// // subtasks
// router.get('/tasks/:id/subtasks', TasksController.getSubtasks);
// router.get('/tasks/:id/subtasks/:subId', TasksController.getSubtask);
// router.post('/tasks/:id/subtasks', TasksController.createSubtask);
// router.patch('/tasks/:id/subtasks/:subId', TasksController.updateSubtask);
// router.delete('/tasks/:id/subtasks/:subId', TasksController.deleteSubtask);
// // router.get('/tasks/:id/subtasks/:subId/comments', TasksController.getSubtaskComments);

// // projects
// router.get('/projects', ProjectsController.getProjects);
// router.get('/projects/:id', ProjectsController.getProject);
// router.post('/projects', ProjectsController.createProject);
// router.patch('/projects/:id', ProjectsController.updateProject);
// router.delete('/projects/:id', ProjectsController.deleteProject);
// // router.get('/projects/:id/tasks', ProjectsController.getProjectTasks);

// tasks
router.get('/tasks', authMiddleware, TasksController.getTasks);
router.get('/tasks/:id', authMiddleware, TasksController.getTask);
router.post('/tasks', authMiddleware, TasksController.createTask);
router.patch('/tasks/:id', authMiddleware, TasksController.updateTask);
router.delete('/tasks/:id', authMiddleware, TasksController.deleteTask);
// router.get('/tasks/:id/comments', authMiddleware, TasksController.getComments);

// subtasks
router.get('/tasks/:id/subtasks', authMiddleware, TasksController.getSubtasks);
router.get('/tasks/:id/subtasks/:subId', authMiddleware, TasksController.getSubtask);
router.post('/tasks/:id/subtasks', authMiddleware, TasksController.createSubtask);
router.patch('/tasks/:id/subtasks/:subId', authMiddleware, TasksController.updateSubtask);
router.delete('/tasks/:id/subtasks/:subId', authMiddleware, TasksController.deleteSubtask);
// router.get('/tasks/:id/subtasks/:subId/comments', authMiddleware, TasksController.getSubtaskComments);

// projects
router.get('/projects', authMiddleware, ProjectsController.getProjects);
router.get('/projects/:id', authMiddleware, ProjectsController.getProject);
router.post('/projects', authMiddleware, ProjectsController.createProject);
router.patch('/projects/:id', authMiddleware, ProjectsController.updateProject);
router.delete('/projects/:id', authMiddleware, ProjectsController.deleteProject);
// router.get('/projects/:id/tasks', authMiddleware, ProjectsController.getProjectTasks);

// we need to have comments api too


module.exports = router;