const dbconnection = require('../config/db');
const Common = require('../helper/common');


class DbOperation {
    constructor() {
        this.pool = dbconnection;
        this.tbl_user = 'users';
        this.tbl_cp = 'copy_paste';
        this.tbl_ai = 'ai_chat';
        this.tbl_ss = 'sessions';
        this.tbl_ss_log = 'session_logs';
    }
    columns = {
        user_id: {
            type: 'string',
            required: true,
            unique: true
        },
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true,
            unique: true
        },
        password: {
            type: 'string',
            required: true
        },
        role: 'user',
        avatar: {
            type: 'string',
            required: false
        },
        bio: {
            type: 'string',
            required: false
        },
        facebook: {
            type: 'string',
            required: false
        },
        twitter: {
            type: 'string',
            required: false
        },
        linkedin: {
            type: 'string',
            required: false
        },
        github: {
            type: 'string',
            required: false
        },
        website: {
            type: 'string',
            required: false
        },
        google: {
            type: 'string',
            required: false
        },
        created_at: new Date(),
        updated_at: new Date()
    }

    async getUserById(userid) {
        try {
            return new Promise((resolve, reject) => {
                const sql = `SELECT * FROM ${this.tbl_user} WHERE user_id = ?`;
                this.pool.query(sql, [userid], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async signIn(data) {
        try {

            return new Promise((resolve, reject) => {
                const email = this.pool.escape(data.email);
                const query = `SELECT * FROM ${this.tbl_user} WHERE email = ${email}`;
                this.pool.query(query, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.length < 1) {
                        reject("User not found");
                    }
                    resolve(result[0]);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async signOut(data) {
        try {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM ${this.tbl_ss} WHERE session_id = ?`;
                this.pool.query(query, [data.session_id], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.length < 1) {
                        reject("Session not found");
                    }

                    if (result[0].session_status === 'active') {
                        const date = new Date();
                        let sql = `UPDATE ${this.tbl_ss} SET session_status = 'inactive' WHERE session_id = ? AND session_end= ?`;
                        this.pool.query(sql, [data.session_id, date], (err, result) => {
                            if (err) {
                                if (Common.ErrorMessages[err.code]) {
                                    reject(Common.ErrorMessages[err.code]);
                                } else {
                                    reject(err.message);
                                }
                            }
                            if (result.affectedRows > 0) {
                                resolve({
                                    message: "Session logged out"
                                });
                            } else {
                                reject("Session not updated");
                            }
                        });
                    } else {
                        reject("Session not active");
                    }
                });
            });
        } catch (error) {
            return error;
        }
    }

    async createSession(data) {
        try {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.tbl_ss} SET ?`;
                this.pool.query(sql, data, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.affectedRows > 0) {
                        resolve(result);
                    } else {
                        reject("Session not created");
                    }
                });
            });
        } catch (error) {
            return error;
        }
    }

    async logSession(data) {
        try {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.tbl_ss_log} SET ?`;
                let query = `SELECT * FROM ${this.tbl_ss} WHERE session_id = ?`;
                this.pool.query(query, [data.session_id], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.length < 1) {
                        reject("Session not found");
                    }
                    if (result[0].session_status !== 'active') {
                        reject("Please login to continue");
                    } else {
                        this.pool.query(sql, data, (err, result) => {
                            if (err) {
                                if (Common.ErrorMessages[err.code]) {
                                    reject(Common.ErrorMessages[err.code]);
                                } else {
                                    reject(err.message);
                                }
                            }
                            if (result.affectedRows > 0) {
                                resolve(result);
                            } else {
                                reject("Session log not created");
                            }
                        });
                    }
                });
            });
        } catch (error) {
            return error;
        }
    }

    async createUser(data) {
        try {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.tbl_user} SET ?`;
                this.pool.query(sql, data, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.affectedRows > 0) {
                        resolve(this.removeSecrets(data));
                    } else {
                        reject("User not created");
                    }
                });
            });

        } catch (error) {
            return {
                error: error
            }
        }
    }

    async removeSecrets(data) {
        delete data.password;
        delete data.salt;
        delete data.remember_token;
        delete data.email_verified_at;
        return data;
    }

    async copyPaste(data) {
        try {
            return new Promise((resolve, reject) => {
                let sql = `INSERT INTO ${this.tbl_cp} SET ?`;
                this.pool.query(sql, data, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject(Common.ErrorMessages[err.code]);
                        } else {
                            reject(err.message);
                        }
                    }
                    if (result.affectedRows > 0) {
                        resolve(result);
                    } else {
                        reject("Data not saved");
                    }
                });
            });
        } catch (error) {
            return {
                error: error
            }
        }
    }

    async aichat(data) {
        try {
            /**
             * chat_id
             * owner
             * conversation : [[question, answer]]
             */
            const values = {
                chat_id: data.chat_id,
                owner: data.user_id,
                conversation: JSON.stringify(data),
            };
            let sql = `INSERT INTO ${this.tbl_ai} SET ?`;
            return new Promise((resolve, reject) => {
                this.pool.query(sql, values, (err, result) => {
                    if (err) {
                        reject({
                            error: err.message
                        });
                    }
                    resolve({
                        message: "Chat saved successfully"
                    });
                });
            });

        } catch (error) {
            return error;
        }
    }
}
module.exports = new DbOperation();