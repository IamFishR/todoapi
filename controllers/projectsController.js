const Projects = require('../models/db/projectsModel');
const CommentsController = require('./commentsController');

class ProjectsController {
    constructor() {

    }
    async getProjects(req, res) {
        try {
            const projects = await Projects.find();
            res.status(200).json({
                status: 'success',
                data: {
                    projects
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async getProject(req, res) {
        try {
            const project = await Projects.findById(req.params.id);
            const comments = await CommentsController.getComments(req, res);
            res.status(200).json({
                status: 'success',
                data: {
                    project,
                    comments
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async createProject(req, res) {
        try {
            const project = await Projects.create(req.body);
            res.status(201).json({
                status: 'success',
                data: {
                    project
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async updateProject(req, res) {
        try {
            const newProject = {
                title: req.body.title,
                description: req.body.description
            };
            const project = await Projects.findByIdAndUpdate(req.params.id, newProject, {
                new: true,
                runValidators: true
            });
            res.status(200).json({
                status: 'success',
                data: {
                    project
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async deleteProject(req, res) {
        try {
            await Projects.findByIdAndDelete(req.params.id);
            res.status(204).json({
                status: 'success',
                data: null
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }
}

module.exports = new ProjectsController();