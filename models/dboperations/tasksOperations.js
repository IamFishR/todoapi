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
}

module.exports = new TasksOperations();