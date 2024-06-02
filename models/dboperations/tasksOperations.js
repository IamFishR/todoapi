const dbconnection = require('../../config/db');
const logme = require('../../helper/logme');
const mysql = require('mysql');

class TasksOperations {
    constructor() {
        this.pool = dbconnection;
    }

    getAllTasks(params) {
        // this.connect();
        return new Promise((resolve, reject) => {
            // select * tasks if status is not deleted
            // const query = 'SELECT * FROM tasks WHERE status != \'deleted\''; // status is not deleted
            let query = 'SELECT * FROM tasks'; // status is not deleted
            if (params && params?.u) {
                query += ` WHERE user_id = ${params.u}`;
            }

            // not deleted
            query += ' AND status != \'deleted\'';

            this.pool.query(query, (err, result, fields) => {
                if (err) {
                    logme.error({
                        message: 'getAllTasks failed',
                        data: { query: query, error: err }
                    });
                    resolve({ error: err });
                }
                resolve(result);
            });
        });
    }

    getTask(id) {
        // this.connect();
        return new Promise((resolve, reject) => {
            // get the task if status is not deleted
            const query = 'SELECT * FROM tasks WHERE task_id = ? AND status != \'deleted\''; // status is not deleted
            const inserts = [id];
            const queryStr = mysql.format(query, inserts);
            this.pool.query(queryStr, (err, result, fields) => {
                if (err) {
                    logme.error({
                        message: 'getTask failed',
                        data: { query: queryStr, error: err }
                    });
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    createTask(task) {
        return new Promise((resolve, reject) => {
            this.pool.query(
                'CALL tsdev_create_task(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [
                    task.task_id,
                    task.user_id,
                    task.title,
                    task.description,
                    task.status,
                    task.priority,
                    task.due_date,
                    task.created_at,
                    task.updated_at,
                    task.tags,
                    task.assign_to,
                    task.assign_by,
                    task.assign_at,
                    task.completed_at,
                    task.deleted_at,
                    task.attachment_id,
                    task.comment_id
                ], (err, result, fields) => {
                    logme.info('createTask', {
                        task_id: task.task_id,
                        query: 'CALL tsdev_create_task(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        params: [
                            task.task_id,
                            task.user_id,
                            task.title,
                            task.description,
                            task.status,
                            task.priority,
                            task.due_date,
                            task.created_at,
                            task.updated_at,
                            task.tags,
                            task.assign_to,
                            task.assign_by,
                            task.assign_at,
                            task.completed_at,
                            task.deleted_at,
                            task.attachment_id,
                            task.comment_id
                        ]
                    });
                    if (err) {
                        resolve({ error: err });
                    }
                    resolve(result);
                });
        });
    }

    updateTask(id, task) {
        return new Promise((resolve, reject) => {
            const query = 'CALL tsdev_update_task(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
            const inserts = [id,
                task.title,
                task.description,
                task.status,
                task.priority,
                task.due_date,
                task.updated_at,
                task.tags,
                task.assign_to,
                task.assign_by,
                task.assign_at,
                task.completed_at,
                task.deleted_at,
                task.attachment_id,
                task.comment_id,
            ];

            const queryStr = mysql.format(query, inserts);

            this.pool.query(queryStr, (err, result, fields) => {
                if (err) {
                    logme.error({
                        message: 'update task failed',
                        data: {
                            query: queryStr,
                            params: inserts,
                            error: err
                        }
                    });
                    resolve({ error: err });
                }
                resolve(result);
            });
        });
    }

    createSubtask(subtask) {
        return new Promise((resolve, reject) => {
            let query = 'INSERT INTO subtasks SET ?';
            this.pool.query(query, subtask, (err, result, fields) => {
                if (err) {
                    logme.error({
                        message: 'createSubtask failed',
                        data: { query: query, error: err }
                    });
                    resolve({ error: err });
                }
                resolve(result);
            });
        });
    }
}

module.exports = new TasksOperations();