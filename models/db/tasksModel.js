// const TasksOperations = require('../dboperations/tasksOperations');
const dbconnection = require('../../config/db');
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
    
}

const getAllTasks = async (params) => {
    try {
        const tasks = await TasksOperations.getAllTasks(params);
        if (tasks.length === 0) {
            throw new Error('No tasks found');
        }
        if (tasks.error) {
            if (Common.ErrorMessages[tasks.error.code]) {
                throw new Error(Common.ErrorMessages[tasks.error.code]);
            } else {
                throw new Error(tasks.error.message);
            }
        }
        return tasks;
    } catch (error) {
        return new Error(error.message);
    }
}

const getTask = async (id) => {
    try {
        const task = await TasksOperations.getTask(id);
        if (task.error) {
            if (Common.ErrorMessages[task.error.code]) {
                throw new Error(Common.ErrorMessages[task.error.code]);
            } else {
                throw new Error(task.error.message);
            }
        }
        if (task.length === 0) {
            throw new Error('Task not found');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const createTask = async (task) => {
    try {
        const newTask = await TasksOperations.createTask(task);
        if (newTask.error) {
            if (Common.ErrorMessages[newTask.error.code]) {
                throw new Error(Common.ErrorMessages[newTask.error.code]);
            } else {
                throw new Error(newTask.error.message);
            }
        }
        if (newTask.affectedRows === 0) {
            throw new Error('Task not created');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const updateTaskWithParams = async (id, task) => {
    try {
        const updatedTask = await TasksOperations.updateTask(id, task);
        if (updatedTask.error) {
            if (Common.ErrorMessages[updatedTask.error.code]) {
                throw new Error(Common.ErrorMessages[updatedTask.error.code]);
            } else {
                throw new Error(updatedTask.error.message);
            }
        }
        if (updatedTask.affectedRows === 0) {
            throw new Error('Task not updated');
        }
        return task;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const createSubtask = async (subtask) => {
    try {
        const newSubtask = await TasksOperations.createSubtask(subtask);
        if (newSubtask.error) {
            if (Common.ErrorMessages[newSubtask.error.code]) {
                throw new Error(Common.ErrorMessages[newSubtask.error.code]);
            } else {
                throw new Error(newSubtask.error.message);
            }
        }
        if (newSubtask.affectedRows === 0) {
            throw new Error('Subtask not created');
        }
        return subtask;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

const getSubtask = async (id, subId) => {
    try {
        const subtask = await TasksOperations.getSubtask(id, subId);
        if (subtask.error) {
            if (Common.ErrorMessages[subtask.error.code]) {
                throw new Error(Common.ErrorMessages[subtask.error.code]);
            } else {
                throw new Error(subtask.error.message);
            }
        }
        if (subtask.length === 0) {
            throw new Error('Subtask not found');
        }
        return subtask;
    } catch (error) {
        return {
            error: error.message
        }
    }
}

module.exports = new Tasks();