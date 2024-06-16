const logme = require('../helper/logme');
const { getAllTasks, getTask, createTask, updateTaskWithParams, createSubtask, getSubtask } = require('../models/db/tasksModel');
const Common = require('../helper/common');

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
                message: error.message
            });
        }
    }

    async createTask(req, res) {
        try {
            if (!req.body.userid) {
                throw new Error('No user id provided');
            }
            if (!req.body.title) {
                throw new Error('No title provided');
            }
            if (!req.body.description) {
                throw new Error('No description provided');
            }
            if (!req.body.due_date) {
                throw new Error('No due date provided');
            }
            const currentDate = new Date();
            // get unix timestamp
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            let dueDate = new Date(req.body.due_date);
            // get unix timestamp
            dueDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');


            let createdAt = req.body.created_at ? new Date(req.body.created_at) : currentDate;
            createdAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');

            let updatedAt = formattedDate;

            const newTask = {
                task_id: Common.generateUniqueId(),
                user_id: req.body.userid,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || 'todo',
                priority: req.body.priority || 'low',
                due_date: dueDate || null,
                created_at: createdAt,
                updated_at: updatedAt,
                tags: req.body.tags.trim() || null,
                assign_to: req.body.assign_to || null,
                assign_by: req.body.assign_by || null,
                assign_at: req.body.assign_at || null,
                completed_at: req.body.completed_at || null,
                deleted_at: req.body.deleted_at || null,
                attachment_id: req.body.attachment_id || null,
                comment_id: req.body.comment_id || null,
            };
            const task = await createTask(newTask);
            if (task.error) {
                throw new Error(task.error);
            }
            res.status(201).json({
                status: 'success',
                task: task
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async updateTask(req, res) {
        try {
            if (!req.body.id) {
                throw new Error('No task id provided');
            }
            const task = await getTask(req.body.id);
            if (task.error) {
                throw new Error(task.error);
            }
            const currentDate = new Date();
            // get unix timestamp
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            if (req.body.due_date) {
                let dueDate = req.body.due_date ? new Date(req.body.due_date) : new Date(task.due_date);
                // get unix timestamp
                dueDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');
            }
            if (req.body.completed_at) {
                let createdAt = req.body.created_at ? new Date(req.body.created_at) : new Date(task.created_at);
                createdAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');
            }
            let updatedAt = formattedDate;

            const updatedTask = {
                updated_at: updatedAt,
            };
            if (req.body.title) updatedTask.title = req.body.title;
            if (req.body.description) updatedTask.description = req.body.description;
            if (req.body.status) updatedTask.status = req.body.status;
            if (req.body.priority) updatedTask.priority = req.body.priority;
            if (req.body.due_date) updatedTask.due_date = dueDate;
            if (req.body.tags) updatedTask.tags = req.body.tags;
            if (req.body.assign_to) updatedTask.assign_to = req.body.assign_to;
            if (req.body.assign_by) updatedTask.assign_by = req.body.assign_by;
            if (req.body.assign_at) updatedTask.assign_at = req.body.assign_at;
            if (req.body.completed_at) updatedTask.completed_at = req.body.completed_at;
            if (req.body.attachment_id) updatedTask.attachment_id = req.body.attachment_id;
            if (req.body.comment_id) updatedTask.comment_id = req.body.comment_id;

            const updated = await updateTaskWithParams(req.body.id, updatedTask);
            if (updated.error) {
                throw new Error(updated.error);
            }
            res.status(200).json({
                status: 'success',
                task: updated
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async deleteTask(req, res) {
        try {
            if (!req.body.id) {
                throw new Error('No task id provided');
            }
            const task = await getTask(req.body.id);
            if (task.error) {
                throw new Error(task.error);
            }
            const currentDate = new Date();
            // get unix timestamp
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
            const deletedTask = await updateTaskWithParams(req.body.id, { deleted_at: formattedDate, status: 'deleted', updated_at: formattedDate });
            if (deletedTask.error) {
                throw new Error(deletedTask.error);
            }
            res.status(200).json({
                status: 'success',
                task: null
            });

        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async getTasksByUser(req, res) {
        try {
            if (!req.params.userId) {
                throw new Error('No user id provided');
            }
            const tasks = await getAllTasks({
                u: req.params.userId
            });
            if (tasks.message) {
                throw new Error(tasks.message);
            }
            res.status(200).json({
                status: 'success',
                tasks: tasks
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'unable to get tasks by user id',
                message: {
                    error: error.message
                }
            });
        }
    }

    async createSubtask(req, res) {
        try {
            if (!req.body.task_id) {
                throw new Error('No task id provided');
            }
            if (!req.body.title) {
                throw new Error('No title provided');
            }
            if (!req.body.description) {
                throw new Error('No description provided');
            }
            if (!req.body.due_date) {
                throw new Error('No due date provided');
            }
            const currentDate = new Date();
            // get unix timestamp
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            let dueDate = new Date(req.body.due_date);
            // get unix timestamp
            dueDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');

            let createdAt = req.body.created_at ? new Date(req.body.created_at) : currentDate;
            createdAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');

            let updatedAt = formattedDate;

            const newSubTask = {
                subtask_id: Common.generateUniqueId(),
                task_id: req.body.task_id,
                user_id: req.body.userid,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status || 'todo',
                priority: req.body.priority || 'low',
                due_date: dueDate || null,
                created_at: createdAt,
                updated_at: updatedAt,
                tags: req.body.tags.trim() || null,
                assign_to: req.body.assign_to || null,
                assign_by: req.body.assign_by || null,
                assign_at: req.body.assign_at || null,
                completed_at: req.body.completed_at || null,
                deleted_at: req.body.deleted_at || null,
                attachment_id: req.body.attachment_id || null,
                comment_id: req.body.comment_id || null,
            };
            const subtask = await createSubtask(newSubTask);
            if (subtask.error) {
                throw new Error(subtask.error);
            }
            res.status(201).json({
                status: 'success',
                subtask: subtask
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async getSubtask(req, res) {
        try {
            if (!req.params.subId) {
                throw new Error('No subtask id provided');
            }
            if (!req.params.id) {
                throw new Error('No task id provided');
            }
            const subtask = await getSubtask(req.params.id, req.params.subId);
            if (subtask.error) {
                throw new Error(subtask.error);
            }
            res.status(200).json({
                status: 'success',
                subtask: subtask
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async getSubtasks(req, res) {
        try {
            if (!req.params.id) {
                throw new Error('No task id provided');
            }
            const subtasks = await getSubtask(req.params.id);
            if (subtasks.error) {
                throw new Error(subtasks.error);
            }
            res.status(200).json({
                status: 'success',
                subtasks: subtasks
            });
        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

    async updateSubtask(req, res) {
        try {
            if (!req.body.id) {
                throw new Error('No subtask id provided');
            }
            const subtask = await getTask(req.body.id);
            if (subtask.error) {
                throw new Error(subtask.error);
            }
            const currentDate = new Date();
            // get unix timestamp
            const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

            if (req.body.due_date) {
                let dueDate = req.body.due_date ? new Date(req.body.due_date) : new Date(subtask.due_date);
                // get unix timestamp
                dueDate = dueDate.toISOString().slice(0, 19).replace('T', ' ');
            }
            if (req.body.completed_at) {
                let createdAt = req.body.created_at ? new Date(req.body.created_at) : new Date(subtask.created_at);
                createdAt = createdAt.toISOString().slice(0, 19).replace('T', ' ');
            }
            let updatedAt = formattedDate;

            const updatedSubTask = {
                updated_at: updatedAt,
            };
            if (req.body.title) updatedSubTask.title = req.body.title;
            if (req.body.description) updatedSubTask.description = req.body.description;
            if (req.body.status) updatedSubTask.status = req.body.status;
            if (req.body.priority) updatedSubTask.priority = req.body.priority;
            if (req.body.due_date) updatedSubTask.due_date = dueDate;
            if (req.body.tags) updatedSubTask.tags = req.body.tags;
            if (req.body.assign_to) updatedSubTask.assign_to = req.body.assign_to;
            if (req.body.assign_by) updatedSubTask.assign_by = req.body.assign_by;
            if (req.body.assign_at) updatedSubTask.assign_at = req.body.assign_at;
            if (req.body.completed_at) updatedSubTask.completed_at = req.body.completed_at;
            if (req.body.attachment_id) updatedSubTask.attachment_id = req.body.attachment_id;
            if (req.body.comment_id) updatedSubTask.comment_id = req.body.comment_id;

            const updated = await updateTaskWithParams(req.body.id, updatedSubTask);
            if (updated.error) {
                throw new Error(updated.error);
            }
            res.status(200).json({
                status: 'success',
                subtask: updated
            });

        } catch (error) {
            logme.error(error.message);
            res.status(400).json({
                status: 'fail',
                message: error.message
            });
        }
    }

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