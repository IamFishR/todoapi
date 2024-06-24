
const bcrypt = require('bcryptjs');
const User = require('./dboperations/userOperations');
const dbconnection = require('../config/db');

class DbOperation {
    constructor() {
        this.pool = dbconnection;
    }
    async getUserById(userid) {
        try {
            return new Promise((resolve, reject) => {
                User.getUserById(userid).then((user) => {
                    if (user.error) {
                        throw new Error(user.error);
                    }
                    if (user.length < 1) {
                        throw new Error("User not found");
                    }
                    this.removeSecrets(user[0]).then((result) => {
                        resolve(result);
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async signIn(data) {
        try {
            const user = await User.signInProc(data);
            if (user.error) {
                throw new Error(user.error);
            }
            if (user.length < 1) {
                throw new Error("User not found");
            }
            const usr = user[0].users;
            const compare = await bcrypt.compare(data.password, usr.password);
            if (compare) {
                return await this.removeSecrets(usr);
            } else {
                throw new Error("Incorrect credentials");
            }
        } catch (error) {
            return error;
        }
    }

    async createUser(data) {
        try {
            let db_columns_val = {
                // user_id: null,
                // name: data.name,
                // email: data.email,
                // password: data.password,
                // role: data.role || 'user',
                // avatar: data.avatar || null,
                // bio: data.bio || null,
                // facebook: data.facebook || null,
                // twitter: data.twitter || null,
                // linkedin: data.linkedin || null,
                // github: data.github || null,
                // website: data.website || null,
                // google: data.google || null,
                // created_at: new Date(),
                // updated_at: new Date()
            };



            const user = await User.createUserProc(db_columns_val);
            if (user.error) {
                throw new Error(user.error);
            }
            return await this.removeSecrets(user[0]);
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
            const user = await User.copyPaste(data);
            if (user.error) {
                throw new Error(user.error);
            }
            return user;
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
             * created_at
             * updated_at
             */
            const values = {
                chat_id: data.chat_id,
                owner: data.user_id,
                conversation: JSON.stringify(data),
                created_at: new Date(),
                updated_at: new Date()
            };
            let sql = `INSERT INTO ai_chat SET ?`;
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