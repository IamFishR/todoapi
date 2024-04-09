// it should have a function that call the stored procedure tsdev_getall_users

const connection = require('../../config/db');

const getAllUsersProc = async () => {

    return new Promise((resolve, reject) => {
        connection.query('CALL tsdev_getall_users()', (err, result, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });

    })
}

const signInProc = async (data) => {
    const email = data.email;
    const options = {
        sql: 'SELECT * FROM users WHERE email = ' + connection.escape(email),
        nestTables: true
    }

    return new Promise((resolve, reject) => {
        connection.query(options, (err, result, fields) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    })

}

module.exports = {
    getAllUsersProc,
    signInProc
}