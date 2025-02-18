const dbconnection = require('../config/db');
const Common = require('../helper/common');
const runQuery = require('../helper/dbQuery');

class DbOperation {
    constructor() {
        this.pool = dbconnection;
        this.tbl_user = 'users';
        this.tbl_cp = 'copy_paste';
        this.tbl_ai = 'ai_chat';
        this.tbl_ss = 'sessions';
        this.tbl_ss_log = 'session_logs';
    }

    async getUserById(userid) {
        try {
            const sql = `SELECT * FROM ${this.tbl_user} WHERE user_id = ?`;
            return await runQuery(this.pool, sql, [userid]);
        } catch (error) {
            return error;
        }
    }

    async signIn(data) {
        try {
            const email = this.pool.escape(data.email);
            const sql = `SELECT * FROM ${this.tbl_user} WHERE email = ${email}`;
            const result = await runQuery(this.pool, sql);
            return result[0];
        } catch (error) {
            return error;
        }
    }

    async signOut(data) {
        try {
            const sql = `SELECT * FROM ${this.tbl_ss} WHERE session_id = ?`;
            const result = await runQuery(this.pool, sql, [data.session_id]);
            if (result.length < 1) {
                throw new Error("Session not found");
            }
            if (result[0].session_status === 'active') {
                const date = new Date();
                const updateSql = `UPDATE ${this.tbl_ss} SET session_status = 'inactive', session_end = ? WHERE session_id = ?`;
                const updateResult = await runQuery(this.pool, updateSql, [date, data.session_id]);
                if (updateResult.affectedRows > 0) {
                    return { message: "Session logged out" };
                } else {
                    throw new Error("Session not updated");
                }
            } else {
                throw new Error("Session not active");
            }
        } catch (error) {
            return error;
        }
    }

    async createSession(data) {
        try {
            const sql = `INSERT INTO ${this.tbl_ss} SET ?`;
            return await runQuery(this.pool, sql, [data]);
        } catch (error) {
            return error;
        }
    }

    async logSession(data) {
        try {
            const querySql = `SELECT * FROM ${this.tbl_ss} WHERE session_id = ?`;
            const result = await runQuery(this.pool, querySql, [data.session_id]);
            if (result.length < 1) {
                throw new Error("Session not found");
            }
            if (result[0].session_status !== 'active') {
                throw new Error("Please login to continue");
            }
            const sql = `INSERT INTO ${this.tbl_ss_log} SET ?`;
            return await runQuery(this.pool, sql, [data]);
        } catch (error) {
            return error;
        }
    }

    async createUser(data) {
        try {
            const sql = `INSERT INTO ${this.tbl_user} SET ?`;
            const result = await runQuery(this.pool, sql, [data]);
            if (result.affectedRows > 0) {
                return this.removeSecrets(data);
            } else {
                throw new Error("User not created");
            }
        } catch (error) {
            return { error: error };
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
            const sql = `INSERT INTO ${this.tbl_cp} SET ?`;
            return await runQuery(this.pool, sql, [data]);
        } catch (error) {
            return { error: error };
        }
    }

    async aichat(data) {
        try {
            const values = {
                chat_id: data.chat_id,
                owner: data.user_id,
                conversation: JSON.stringify(data),
            };
            const sql = `INSERT INTO ${this.tbl_ai} SET ?`;
            return await runQuery(this.pool, sql, [values]);
        } catch (error) {
            return error;
        }
    }
}
module.exports = new DbOperation();