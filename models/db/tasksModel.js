const runQuery = require('../../helper/dbQuery');
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
    subtaskModel = {
        sub_task_id: {
            type: 'VARCHAR',
        },
        task_id: {
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
        owner: {
            type: 'VARCHAR',
        },
        priority: {
            type: 'VARCHAR',
        },
        due_date: {
            type: 'DATETIME',
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
            const project = await ProjectsModel.getProjects(id);
            if (project.length === 0) {
                throw new Error('Project not found');
            }
            const sql = `SELECT * FROM tasks WHERE project_id = ?`;
            return await runQuery(this.pool, sql, [id]);
        } catch (error) {
            logme.error({
                message: 'getAllTasks failed',
                data: { error }
            });
            return error;
        }
    }

    async getTask(id) {
        try {
            const sql = 'SELECT * FROM tasks WHERE task_id = ?';
            return await runQuery(this.pool, sql, [id]);
        } catch (error) {
            logme.error({
                message: 'getTask failed',
                data: { error }
            });
            return error;
        }
    }

    async createTask(task) {
        try {
            const project = await ProjectsModel.getProjects(task.project_id);
            if (project.length === 0) {
                throw new Error('Project not found');
            }
            const createdAt = task?.created_at ? Common.convertTimeToGMT(task.created_at) : Common.convertTimeToGMT();
            const assign_at = task?.assign_at ? Common.convertTimeToGMT(task.assign_at) : Common.convertTimeToGMT();
            const completed_at = task?.completed_at ? Common.convertTimeToGMT(task.completed_at) : null;
            const deleted_at = task?.deleted_at ? Common.convertTimeToGMT(task.deleted_at) : null;
            const newTask = {
                task_id: task.task_id,
                project_id: task.project_id,
                title: task.title,
                description: task.description,
                status: task.status || 'todo',
                priority: task.priority || 'low',
                due_date: Common.convertTimeToGMT(task.due_date),
                owner: task.userid,
                created_at: createdAt,
                updated_at: Common.convertTimeToGMT(),
                tags: task.tags.trim() || null,
                assign_to: task.assign_to || null,
                assign_by: task?.assign_by ? task.assign_by : task.userid,
                assign_at: assign_at,
                completed_at: completed_at,
                deleted_at: deleted_at
            };
            const sql = 'INSERT INTO tasks SET ?';
            await runQuery(this.pool, sql, newTask);
            return newTask;
        } catch (error) {
            logme.error({
                message: 'createTask failed',
                data: { error }
            });
            return error;
        }
    }

    async updateTask(task) {
        try {
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
            await runQuery(this.pool, sql, [_t, task.task_id]);
            return _t;
        } catch (error) {
            logme.error({
                message: 'updateTask failed',
                data: { error }
            });
            return error;
        }
    }

    async deleteTask(id) {
        try {
            const sql = 'UPDATE tasks SET status = ? WHERE task_id = ?';
            await runQuery(this.pool, sql, ['deleted', id]);
            return id;
        } catch (error) {
            logme.error({
                message: 'deleteTask failed',
                data: { error }
            });
            return error;
        }
    }

    async getTasksByUser(owner) {
        try {
            const sql = 'SELECT * FROM tasks WHERE owner = ?';
            return await runQuery(this.pool, sql, [owner]);
        } catch (error) {
            logme.error({
                message: 'getTasksByUser failed',
                data: { error }
            });
            return error;
        }
    }

    async createSubtask(subtask) {
        try {
            const task = await this.getTask(subtask.task_id);
            if (task.length === 0) {
                throw new Error('Task not found');
            }

            const createdAt = subtask?.created_at ? Common.convertTimeToGMT(subtask.created_at) : Common.convertTimeToGMT();
            const assign_at = subtask?.assign_at ? Common.convertTimeToGMT(subtask.assign_at) : Common.convertTimeToGMT();
            const completed_at = subtask?.completed_at ? Common.convertTimeToGMT(subtask.completed_at) : null;
            const deleted_at = subtask?.deleted_at ? Common.convertTimeToGMT(subtask.deleted_at) : null;
            const newSubtask = {
                subtask_id: subtask.subtask_id,
                task_id: subtask.task_id,
                title: subtask.title,
                description: subtask.description,
                status: subtask.status || 'todo',
                priority: subtask.priority || 'low',
                due_date: Common.convertTimeToGMT(subtask.due_date),
                owner: subtask.owner,
                created_at: createdAt,
                updated_at: Common.convertTimeToGMT(),
                tags: subtask.tags.trim() || null,
                assign_to: subtask.assign_to || null,
                assign_by: subtask.assign_by || subtask.owner,
                assign_at: assign_at,
                completed_at: completed_at,
                deleted_at: deleted_at
            };
            const sql = 'INSERT INTO subtasks SET ?';
            await runQuery(this.pool, sql, newSubtask);
            return newSubtask;
        } catch (error) {
            logme.error({
                message: 'createSubtask failed',
                data: { error }
            });
            return error;
        }
    }

    async getSubtask(id, subId) {
        try {
            const sql = 'SELECT * FROM subtasks WHERE task_id = ? AND subtask_id = ?';
            return await runQuery(this.pool, sql, [id, subId]);
        } catch (error) {
            logme.error({
                message: 'getSubtask failed',
                data: { error }
            });
            return error;
        }
    }

    async getSubtasks(id) {
        try {
            const task = await this.getTask(id);
            if (task.length === 0) {
                throw new Error('Task not found');
            }
            const sql = 'SELECT * FROM subtasks WHERE task_id = ?';
            return await runQuery(this.pool, sql, [id]);
        } catch (error) {
            logme.error({
                message: 'getSubtasks failed',
                data: { error }
            });
            return error;
        }
    }

    async updateSubtask(subtask) {
        try {
            const currentDate = new Date();
            const updatedAt = Common.convertTimeToGMT(currentDate);

            let _t = {};
            if (subtask.title) _t.title = subtask.title;
            if (subtask.description) _t.description = subtask.description;
            if (subtask.status) _t.status = subtask.status;
            if (subtask.priority) _t.priority = subtask.priority;
            if (subtask.due_date) _t.due_date = Common.convertTimeToGMT(subtask.due_date);
            if (subtask.tags) _t.tags = subtask.tags;
            if (subtask.assign_to) _t.assign_to = subtask.assign_to;
            if (subtask.assign_by) _t.assign_by = subtask.assign_by;
            if (subtask.assign_at) _t.assign_at = subtask.assign_at;
            if (subtask.completed_at) _t.completed_at = subtask.completed_at;

            _t.updated_at = updatedAt;

            const sql = 'UPDATE subtasks SET ? WHERE subtask_id = ?';
            await runQuery(this.pool, sql, [_t, subtask.subtask_id]);
            return _t;
        } catch (error) {
            logme.error({
                message: 'updateSubtask failed',
                data: { error }
            });
            return error;
        }
    }

    async deleteSubtask(id) {
        try {
            const sql = 'UPDATE subtasks SET status = ? WHERE subtask_id = ?';
            await runQuery(this.pool, sql, ['deleted', id]);
            return id;
        } catch (error) {
            logme.error({
                message: 'deleteSubtask failed',
                data: { error }
            });
            return error;
        }
    }
}

module.exports = new Tasks();