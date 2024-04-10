const Connection = require('./connection');
const dbconnection = require('../../config/db');

class TasksOperations extends Connection {
    constructor() {
        super();
        this.connection = dbconnection;
    }

    async getAllTasks() {
        await this.connect();
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * from tasks', (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                this.disconnect();
                resolve(result);
            });
        });
    }

    async getTask(id) {
        await this.connect();
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * from tasks where taskid = ?', [id], (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                this.disconnect();
                resolve(result);
            });
        });
    }

    async createTask(task) {
        await this.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(
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
                    if (err) {
                        return reject(err);
                    }
                    this.disconnect();
                    resolve(result);
                });
        });
    }
}

module.exports = new TasksOperations();