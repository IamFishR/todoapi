// const TasksOperations = require('../dboperations/tasksOperations');
const dbconnection = require('../../config/db');
const ProjectsModel = require('./projectsModel');
const Common = require('../../helper/common');
const logme = require('../../helper/logme');

class Tasks {
    constructor() {
        this.pool = dbconnection;
    }

    taskModel = {
        task_id: {
            type: 'VARCHAR',
        },
        project_id: {
            type: 'VARCHAR',
        },
        title: {
            type: 'VARCHAR',
        },
        description: {
            type: 'TEXT',
        },
        status: {
            type: 'VARCHAR',
        },
        priority: {
            type: 'VARCHAR',
        },
        due_date: {
            type: 'DATETIME',
        },
        owner: {
            type: 'VARCHAR',
        },
        created_at: {
            type: 'DATETIME',
        },
        updated_at: {
            type: 'DATETIME',
        },
        tags: {
            type: 'VARCHAR',
        },
        assign_to: {
            type: 'VARCHAR',
        },
        assign_by: {
            type: 'VARCHAR',
        },
        assign_at: {
            type: 'DATETIME',
        },
        completed_at: {
            type: 'DATETIME',
        },
        deleted_at: {
            type: 'DATETIME',
        }
    }

    async getAllTasks(id) {
        try {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM tasks WHERE project_id = ?`;
                this.pool.query(sql, [id], (err, result) => {
                    if (err) {
                        logme.error({
                            message: 'getAllTasks failed',
                            data: { query: sql, error: err }
                        });
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getTask(id) {
        try {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM tasks WHERE task_id = ?';
                this.pool.query(sql, [id], (err, result) => {
                    if (err) {
                        logme.error({
                            message: 'getTask failed',
                            data: { query: sql, error: err }
                        });
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async createTask(task) {
        try {
            return new Promise((resolve, reject) => {

                // check if project exists
                ProjectsModel.getProjects(task.project_id).then((result) => {
                    if (result.length === 0) {
                        return reject('Project not found');
                    }
                    const currentDate = new Date();
                    const createdAt = task?.created_at ? Common.convertTimeToGMT(task.created_at) : Common.convertTimeToGMT(currentDate);
                    const newTask = {
                        task_id: Common.generateUniqueId(),
                        project_id: task.project_id,
                        title: task.title,
                        description: task.description,
                        status: task.status || 'todo',
                        priority: task.priority || 'low',
                        due_date: Common.convertTimeToGMT(task.due_date),
                        owner: task.userid,
                        created_at: createdAt,
                        updated_at: Common.convertTimeToGMT(currentDate),
                        tags: task.tags.trim() || null,
                        assign_to: task.assign_to || null,
                        assign_by: task.assign_by || null,
                        assign_at: task.assign_at || null,
                        completed_at: task.completed_at || null,
                        deleted_at: task.deleted_at || null,
                    };
                    const sql = 'INSERT INTO tasks SET ?';
                    this.pool.query(sql, newTask, (err, result) => {
                        if (err) {
                            logme.error({
                                message: 'createTask failed',
                                data: { query: sql, error: err }
                            });
                            return reject(err);
                        }
                        resolve(newTask);
                    });
                }).catch((error) => {
                    return reject(error);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async updateTask(task) {
        try {
            return new Promise((resolve, reject) => {
                const currentDate = new Date();
                const updatedAt = Common.convertTimeToGMT(currentDate);

                let _t = {};
                if (task.title) _t.title = task.title;
                if (task.description) _t.description = task.description;
                if (task.status) _t.status = task.status;
                if (task.priority) _t.priority = task.priority;
                if (task.due_date) _t.due_date = Common.convertTimeToGMT(task.due_date);
                if (task.tags) _t.tags = task.tags;
                if (task.assign_to) _t.assign_to = task.assign_to;
                if (task.assign_by) _t.assign_by = task.assign_by;
                if (task.assign_at) _t.assign_at = task.assign_at;
                if (task.completed_at) _t.completed_at = task.completed_at;

                _t.updated_at = updatedAt;

                const sql = 'UPDATE tasks SET ? WHERE task_id = ?';
                this.pool.query(sql, [_t, task.task_id], (err, result) => {
                    if (err) {
                        logme.error({
                            message: 'updateTask failed',
                            data: { query: sql, error: err }
                        });
                        return reject(err);
                    }
                    resolve(_t);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async deleteTask(id) {
        try {
            return new Promise((resolve, reject) => {
                // only change the status to deleted
                const sql = 'UPDATE tasks SET status = ? WHERE task_id = ?';
                this.pool.query(sql, ['deleted', id], (err, result) => {
                    if (err) {
                        logme.error({
                            message: 'deleteTask failed',
                            data: { query: sql, error: err }
                        });
                        return reject(err);
                    }
                    resolve(id);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async getTasksByUser(owner) {
        try {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM tasks WHERE owner = ?';
                this.pool.query(sql, [owner], (err, result) => {
                    if (err) {
                        logme.error({
                            message: 'getTasksByUser failed',
                            data: { query: sql, error: err }
                        });
                        return reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

}

// const createSubtask = async (subtask) => {
//     try {
//         const newSubtask = await TasksOperations.createSubtask(subtask);
//         if (newSubtask.error) {
//             if (Common.ErrorMessages[newSubtask.error.code]) {
//                 throw new Error(Common.ErrorMessages[newSubtask.error.code]);
//             } else {
//                 throw new Error(newSubtask.error.message);
//             }
//         }
//         if (newSubtask.affectedRows === 0) {
//             throw new Error('Subtask not created');
//         }
//         return subtask;
//     } catch (error) {
//         return {
//             error: error.message
//         }
//     }
// }

// const getSubtask = async (id, subId) => {
//     try {
//         const subtask = await TasksOperations.getSubtask(id, subId);
//         if (subtask.error) {
//             if (Common.ErrorMessages[subtask.error.code]) {
//                 throw new Error(Common.ErrorMessages[subtask.error.code]);
//             } else {
//                 throw new Error(subtask.error.message);
//             }
//         }
//         if (subtask.length === 0) {
//             throw new Error('Subtask not found');
//         }
//         return subtask;
//     } catch (error) {
//         return {
//             error: error.message
//         }
//     }
// }

module.exports = new Tasks();