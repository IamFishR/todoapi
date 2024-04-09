// Used for: User operations
// Purpose: To perform database operations for the user
// procedure: tsdev_getall_users
const connection = require('../../config/db');
const Connection = require('./connection');

class User extends Connection {
    constructor() {
        super();
        this.connection = connection;
    }

    async getAllUsersProc() {
        await this.connect();
        return new Promise((resolve, reject) => {
            this.connection.query('CALL tsdev_getall_users()', (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                this.disconnect();
                resolve(result);
            });
        });
    }

    async signInProc(data) {
        const email = data.email;
        const options = {
            sql: 'SELECT * FROM users WHERE email = ' + this.connection.escape(email),
            nestTables: true
        }

        await this.connect();
        return new Promise((resolve, reject) => {
            this.connection.query(options, (err, result, fields) => {
                if (err) {
                    return reject(err);
                }
                this.disconnect();
                resolve(result);
            });
        });
    }
}

module.exports = new User();