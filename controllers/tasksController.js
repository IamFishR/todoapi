const logme = require('../helper/logme');
const { getAllTasks, getTask } = require('../models/db/tasksModel');
// const CommentsController = require('./commentsController');
// const subTasksModel = require('../models/db/subTasksModel');

class TasksController {
    constructor() {

    }
    async getTasks(req, res) {
        try {
            const tasks = await getAllTasks();
            if (tasks.error) {
                throw new Error(tasks.error);
            }
            res.status(200).json({
                status: 'success',
                tasks: tasks
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    async getTask(req, res) {
        try {
            if (!req.params.id) throw new Error('No task id provided');
            const task = await getTask(req.params.id);
            if (task.error) {
                throw new Error(task.error);
            }
            res.status(200).json({
                status: 'success',
                task: task
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error
            });
        }
    }

    // async createTask(req, res) {
    //     try {
    //         const task = await Tasks.create(req.body);
    //         res.status(201).json({
    //             status: 'success',
    //             data: {
    //                 task
    //             }
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async updateTask(req, res) {
    //     try {
    //         const newTask = {
    //             title: req.body.title,
    //             description: req.body.description,
    //             dueDate: req.body.dueDate,
    //             priority: req.body.priority,
    //             status: req.body.status,
    //             relate: req.body.relate,
    //             tags: req.body.tags,
    //             userId: req.body.userId
    //         };
    //         const task = await Tasks.findByIdAndUpdate(req.params.id, newTask, {
    //             new: true,
    //             runValidators: true
    //         });
    //         res.status(200).json({
    //             status: 'success',
    //             data: {
    //                 task
    //             }
    //         });

    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async deleteTask(req, res) {
    //     try {
    //         await Tasks.findByIdAndDelete(req.params.id);
    //         res.status(204).json({
    //             status: 'success',
    //             data: null
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async getSubtasks(req, res) {
    //     try {
    //         const subTasks = await subTasksModel.find();
    //         res.status(200).json({
    //             status: 'success',
    //             data: {
    //                 subTasks
    //             }
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async getSubtask(req, res) {
    //     try {
    //         const subtask = await subTasksModel.findById(req.params.subId);
    //         const comments = await CommentsController.getComments(req, res);
    //         res.status(200).json({
    //             status: 'success',
    //             data: {
    //                 subtask,
    //                 comments
    //             }
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async createSubtask(req, res) {
    //     try {
    //         const subtask = await subTasksModel.create(req.body);
    //         res.status(201).json({
    //             status: 'success',
    //             data: {
    //                 subtask
    //             }
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async updateSubtask(req, res) {
    //     try {
    //         const subtask = await subTasksModel.findByIdAndUpdate(req.params.subId, req.body, {
    //             new: true,
    //             runValidators: true
    //         });

    //         res.status(200).json({
    //             status: 'success',
    //             data: {
    //                 subtask
    //             }
    //         });

    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }

    // async deleteSubtask(req, res) {
    //     try {
    //         await subTasksModel.findByIdAndDelete(req.params.subId);
    //         res.status(204).json({
    //             status: 'success',
    //             data: null
    //         });
    //     } catch (error) {
    //         res.status(400).json({
    //             status: 'fail',
    //             message: error
    //         });
    //     }
    // }
}

module.exports = new TasksController();