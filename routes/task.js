var express = require('express');
var router = express.Router();
const TasksController = require('../controllers/tasksController');
// const ProjectsController = require('../controllers/projectsController');
const { authMiddleware } = require('../config/authMiddleware');

// tasks
router.get('/:id?', authMiddleware, (req, res) => {
    if (req.params.id) {
        return TasksController.getTask(req, res);
    }
    return TasksController.getTasks(req, res);
});
router.post('/', authMiddleware, TasksController.createTask);
// router.patch('/tasks/:id', authMiddleware, TasksController.updateTask);
// router.delete('/tasks/:id', authMiddleware, TasksController.deleteTask);

// // subtasks
// router.get('/tasks/:id/subtasks/:subId?', authMiddleware, (req, res) => {
//     if (req.params.subId) {
//         return TasksController.getSubtask(req, res);
//     }
//     return TasksController.getSubtasks(req, res);
// });
// router.post('/tasks/:id/subtasks', authMiddleware, TasksController.createSubtask);
// router.patch('/tasks/:id/subtasks/:subId', authMiddleware, TasksController.updateSubtask);
// router.delete('/tasks/:id/subtasks/:subId', authMiddleware, TasksController.deleteSubtask);

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