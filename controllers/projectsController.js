const Projects = require('../models/db/projectsModel');
// const CommentsController = require('./commentsController');
const logme = require('../helper/logme');
const Common = require('../helper/common');
class ProjectsController {
    constructor() {

    }

    async getProjects(req, res) {
        try {
            Projects.getProjects().then((projects) => {
                if (projects.error) {
                    return res.status(500).send(projects.error);
                }
                res.status(200).json({
                    status: 'success',
                    projects: projects,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getProjects failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async getProject(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).send('Project ID is required');
            }
            Projects.getProjects(id).then((project) => {
                if (project.error) {
                    return res.status(500).send(project.error);
                }
    
                res.status(200).json({
                    status: 'success',
                    project: project,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'getProject failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async createProject(req, res) {
        try {
            const project = req.body;
            if (!project) {
                return res.status(400).send('Project data is required');
            }
            Projects.createProject(project).then((newProject) => {
                if (newProject?.error) {
                    return res.status(400).send({
                        error: newProject.error
                    });
                }
                res.status(201).json({
                    status: 'success',
                    project: newProject,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'createProject failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async updateProject(req, res) {
        try {
            const project = req.body;
            const id = project.id;
            if (!id) {
                return res.status(400).send('Project ID is required');
            }
            if (!project) {
                return res.status(400).send('Project data is required');
            }
            Projects.updateProject(id, project).then((updatedProject) => {
                if (updatedProject.error) {
                    return res.status(400).send(updatedProject.error);
                }

                res.status(200).json({
                    status: 'success',
                    project: updatedProject,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });

        } catch (error) {
            logme.error({ message: 'updateProject failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteProject(req, res) {
        try {
            /**
             * tasks:
             * 1. set every tasks, comments, attachments, etc to deleted
             */
            const id = req.params.id;
            if (!id) {
                return res.status(400).send('Project ID is required');
            }
            Projects.deleteProject(id).then((deletedProject) => {
                if (deletedProject.error) {
                    return res.status(400).send(deletedProject.error);
                }

                res.status(200).json({
                    status: 'success',
                    project: deletedProject,
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
        } catch (error) {
            logme.error({ message: 'deleteProject failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ProjectsController();