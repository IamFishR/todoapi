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
}

module.exports = new User();