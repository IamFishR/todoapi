var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const ProjectsController = require('../controllers/projectsController');


// projects
router.get('/:id?', authMiddleware, (req, res) => {
    if (req.params.id === 'project-tasks') {
        return ProjectsController.getProjectsWithTasks(req, res);
    }
    if (req.params.id) {
        return ProjectsController.getProject(req, res);
    }
    return ProjectsController.getProjects(req, res);
});

router.post('/', authMiddleware, (req, res) => {
    return ProjectsController.createProject(req, res);
});

router.put('/', authMiddleware, (req, res) => {
    return ProjectsController.updateProject(req, res);
});

module.exports = router;