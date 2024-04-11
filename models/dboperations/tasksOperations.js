const dbconnection = require('../../config/db');
const logme = require('../../helper/logme');
const mysql = require('mysql');

class TasksOperations {
    constructor() {
        this.pool = dbconnection;
    }

    getAllTasks() {
        // this.connect();
        return new Promise((resolve, reject) => {
            // select * tasks if status is not deleted
            const query = 'SELECT * FROM tasks WHERE status != \'deleted\''; // status is not deleted
            this.pool.query(query, (err, result, fields) => {
                if (err) {
                    logme.error({
                        message: 'getAllTasks failed',
                        data: { query: query, error: err }
                    });
                    return reject(err);
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
        // this.connect();
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
                        return reject(err);
                    }
                    resolve(result);
                });
        });
    }

    updateTask(id, task) {
        // this.connect();
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
                    let errors = [
                        {
                            code: 'ER_DUP_ENTRY',
                            message: 'Duplicate entry'
                        },
                        {
                            code: 'ER_NO_REFERENCED_ROW_2',
                            message: 'Foreign key constraint fails'
                        },
                        {
                            code: 'ER_NO_DEFAULT_FOR_FIELD',
                            message: 'Field doesn\'t have a default value'
                        },
                        {
                            code: 'ER_DATA_TOO_LONG',
                            message: 'Data too long for column'
                        },
                        {
                            code: 'ER_TRUNCATED_WRONG_VALUE',
                            message: 'Truncated wrong value'
                        },
                        {
                            code: 'ER_NO_DEFAULT_FOR_FIELD',
                            message: 'Field doesn\'t have a default value'
                        },
                        {
                            code: 'ER_CANT_AGGREGATE_2COLLATIONS',
                            message: 'collation mismatch'
                        },
                        {
                            code: 'ER_DUP_FIELDNAME',
                            message: 'Duplicate column name'
                        },
                        {
                            code: 'ER_SP_WRONG_NO_OF_ARGS',
                            message: 'arguments mismatch!'
                        }
                    ]
                    logme.error({
                        message: 'update task failed',
                        data: {
                            query: queryStr,
                            params: inserts,
                            error: err
                        }
                    });
                    let error = errors.find(e => e.code === err.code);
                    if (error) {
                        reject(error);
                    } else {
                        reject(err);
                    }
                }
                resolve(result);
            });
        });
    }
}

module.exports = new TasksOperations();