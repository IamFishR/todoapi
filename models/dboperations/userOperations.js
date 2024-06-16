const dbconnection = require('../../config/db');

class User {
    constructor() {
        this.pool = dbconnection;
    }

    async getAllUsersProc() {
        return new Promise((resolve, reject) => {
            this.pool.query('CALL tsdev_getall_users()', (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    async signInProc(data) {
        const email = data.email;
        const options = {
            sql: 'SELECT * FROM users WHERE email = ' + this.pool.escape(email),
            nestTables: true
        }

        return new Promise((resolve, reject) => {
            this.pool.query(options, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    async createUserProc(data) {
        const options = {
            sql: 'INSERT INTO users SET ?',
            values: data
        }

        return new Promise((resolve, reject) => {
            this.pool.query(options, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    async copyPaste(data) {
        try {
            const options = {
                sql: 'INSERT INTO copy_paste SET ?',
                values: data
            }

            return new Promise((resolve, reject) => {
                this.pool.query(options, (err, result, fields) => {
                    if (err) {
                        return reject(err);
                    }
                    if (result.affectedRows < 1) {
                        return reject(new Error("Copy paste failed"));
                    } else {
                        resolve({ message: "Copy paste successful", user: data });
                    }
                });
            });
        } catch (error) {
            return {
                error: error
            }
        }
    }
}

module.exports = new User();