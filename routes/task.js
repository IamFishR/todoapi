var express = require('express');
var router = express.Router();
const TasksController = require('../controllers/tasksController');
// const ProjectsController = require('../controllers/projectsController');
const { authMiddleware } = require('../config/authMiddleware');

// tasks
// url: /tasks/:id
// router.get('/:id', authMiddleware, (req, res) => {
//     return TasksController.getTask(req, res);
//     // if (req.params.id) {
//     // }
//     // return TasksController.getTasks(req, res);
// });

// url: /tasks/:id
router.get('/:id?', authMiddleware, TasksController.getTask);

// url: /tasks/project/:projectId
router.get('/project/:projectId?', authMiddleware, TasksController.getTasks);

// url: /tasks/user/:userId
router.get('/user/:userId?', authMiddleware, TasksController.getTasksByUser);
router.post('/', authMiddleware, TasksController.createTask);
router.patch('/', authMiddleware, TasksController.updateTask);
router.delete('/', authMiddleware, TasksController.deleteTask);

// subtasks
// router.get('/:id/subtasks/:subId?', authMiddleware, (req, res) => {
//     if (req.params.subId) {
//         return TasksController.getSubtask(req, res);
//     }
//     return TasksController.getSubtasks(req, res);
// });
// router.post('/:id/subtasks', authMiddleware, TasksController.createSubtask);

// projects
// router.get('/projects/:id?', authMiddleware, (req, res) => {
//     if (req.params.id) {
//         return ProjectsController.getProject(req, res);
//     }
//     return ProjectsController.getProjects(req, res);
// });
// router.post('/projects', authMiddleware, ProjectsController.createProject);
// router.patch('/projects/:id', authMiddleware, ProjectsController.updateProject);
// router.delete('/projects/:id', authMiddleware, ProjectsController.deleteProject);

module.exports = router;