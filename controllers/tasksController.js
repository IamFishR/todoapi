const Tasks = require('../models/db/tasksModel');
const Common = require('../helper/common');
const logme = require('../helper/logme');

class TasksController {
    constructor() {

    }
    async getTasks(req, res) {
        try {
            /**
             * Get all tasks from project_id
             */
            const projectId = req.params.projectId;
            if (!projectId) {
                throw new Error('No project id provided');
            }
            Tasks.getAllTasks(projectId).then((tasks) => {
                if (tasks.error) {
                    throw new Error(tasks.error);
                }
                res.status(200).json({
                    status: 'success',
                    tasks: tasks
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getTask(req, res) {
        try {
            if (!req.params.id) throw new Error('No task id provided');
            Tasks.getTask(req.params.id).then((task) => {
                if (task.error) {
                    throw new Error(task.error);
                }
                res.status(200).json({
                    status: 'success',
                    task: task
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async createTask(req, res) {
        try {
            let errors = {};
            if (!req.body.userid) {
                errors.userid = 'user id is required';
            }
            if (!req.body.title) {
                errors.title = 'title is required';
            }
            if (!req.body.description) {
                errors.description = 'description is required';
            }
            if (!req.body.due_date) {
                errors.due_date = 'due date is required';
            }
            if (!req.body.project_id) {
                errors.project_id = 'project id is required';
            }
            if (Object.keys(errors).length > 0) {
                throw new Error(JSON.stringify(errors));
            }
            Tasks.createTask(req.body).then((task) => {
                if (task.error) {
                    throw new Error(task.error);
                }
                res.status(200).json({
                    status: 'success',
                    task: task
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            res.status(400).json({
                status: 'failed to create task',
                message: error.message
            });
        }
    }

    async updateTask(req, res) {
        try {
            let task = req.body;
            let errors = {};
            if (!task.task_id) {
                errors.task_id = 'task id is required';
            }
            if (Object.keys(errors).length > 0) {
                throw new Error(JSON.stringify(errors));
            }

            Tasks.updateTask(task).then((updatedTask) => {
                if (updatedTask.error) {
                    throw new Error(updatedTask.error);
                }
                res.status(200).json({
                    status: 'success',
                    task: updatedTask
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });

        } catch (error) {
            logme.error({ message: 'task update failed', data: error });
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async deleteTask(req, res) {
        try {
            const id = req.body.task_id;
            if (!id) {
                throw new Error('No task id provided');
            }
            Tasks.deleteTask(id).then((deletedTask) => {
                if (deletedTask.error) {
                    throw new Error(deletedTask.error);
                }
                res.status(200).json({
                    status: 'success',
                    task: id
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });

        } catch (error) {
            logme.error({ message: 'task delete failed', data: error });
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async getTasksByUser(req, res) {
        try {
            const userId = req.params.userId;
            if (!userId) {
                throw new Error('No user id provided');
            }
            Tasks.getTasksByUser(userId).then((tasks) => {
                if (tasks.error) {
                    throw new Error(tasks.error);
                }
                res.status(200).json({
                    status: 'success',
                    tasks: tasks
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            logme.error({ message: 'getTasksByUser failed', data: error });
            res.status(400).json({
                status: 'unable to get tasks by user id',
                message: error.message
            });
        }
    }

    async createSubtask(req, res) {
        try {
            let errors = {};
            const data = req.body;
            if (!data.task_id) {
                errors.task_id = 'task id is required';
            }
            if (!data.title) {
                errors.title = 'title is required';
            }
            if (!data.description) {
                errors.description = 'description is required';
            }
            if (!data.due_date) {
                errors.due_date = 'due date is required';
            }

            if (Object.keys(errors).length > 0) {
                throw new Error(JSON.stringify(errors));
            }

            Tasks.createSubtask(data).then((subtask) => {
                if (subtask.error) {
                    throw new Error(subtask.error);
                }
                res.status(200).json({
                    status: 'success',
                    subtask: subtask
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: 'failed to create subtask'
            });
        }
    }

    async getSubtask(req, res) {
        try {
            const taskId = req.params.id;
            const subId = req.params.subId;
            if (!taskId) {
                throw new Error('No task id provided');
            }
            Tasks.getSubtask(taskId, subId).then((subtask) => {
                if (subtask.error) {
                    throw new Error(subtask.error);
                }
                res.status(200).json({
                    status: 'success',
                    subtask: subtask
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: 'failed to get subtask'
            });
        }
    }

    async getSubtasks(req, res) {
        try {
            const taskId = req.params.id;
            if (!taskId) {
                throw new Error('No task id provided');
            }
            Tasks.getSubtasks(taskId).then((subtasks) => {
                if (subtasks.error) {
                    throw new Error(subtasks.error);
                }
                res.status(200).json({
                    status: 'success',
                    subtasks: subtasks
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });
        } catch (error) {
            res.status(400).json({
                error: error.message,
                message: 'failed to get subtasks'
            });
        }
    }

    async updateSubtask(req, res) {
        try {
            let subtask = req.body;
            let errors = {};
            if (!subtask.subtask_id) {
                errors.subtask_id = 'subtask id is required';
            }
            if (Object.keys(errors).length > 0) {
                throw new Error(JSON.stringify(errors));
            }

            Tasks.updateSubtask(subtask).then((updatedSubtask) => {
                if (updatedSubtask.error) {
                    throw new Error(updatedSubtask.error);
                }
                res.status(200).json({
                    status: 'success',
                    subtask: updatedSubtask
                });
            }).catch((error) => {
                res.status(400).json({
                    error: error.message
                });
            });

        } catch (error) {
            logme.error({ message: 'subtask update failed', data: error });
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }
}

module.exports = new TasksController();