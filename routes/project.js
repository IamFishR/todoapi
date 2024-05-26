var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../config/authMiddleware');
const ProjectsController = require('../controllers/projectsController');


// projects
router.get('/:id?', authMiddleware, (req, res) => {
    if (req.params.id) {
        return ProjectsController.getProject(req, res);
    }
    return ProjectsController.getProjects(req, res);
});

module.exports = router;