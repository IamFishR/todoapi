
const bcrypt = require('bcryptjs');
const User = require('./dboperations/userOperations');

class DbOperation {
    // async getAllUsers() {
    //     try {
    //         const users = await User.getAllUsersProc();
    //         if (!users[0].length) {
    //             throw new Error("No users found");
    //         }
    //         if (users.error) {
    //             throw new Error(users.error);
    //         }
    //         const finalResult = users[0].map(async (user) => {
    //             return await this.removeSecrets(user);
    //         });
    //         return await Promise.all(finalResult);
    //     } catch (error) {
    //         return {
    //             error: error
    //         }
    //     }
    // }

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
}
module.exports = new DbOperation();