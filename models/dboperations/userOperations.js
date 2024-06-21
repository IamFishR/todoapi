const dbconnection = require('../../config/db');

class User {
    constructor() {
        this.pool = dbconnection;
    }

    async getUserById(userid) {
        try {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM users WHERE user_id = ?';
                this.pool.query(sql, [userid], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
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
                        // decode content
                        // data.content = Buffer.from(data.content, 'utf-8').toString('base64');
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