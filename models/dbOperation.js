// const User = require('./db/userModel');
// const connectDB = require('../config/db');
// const dbvalidation = require('./dbValidation');
const bcrypt = require('bcryptjs');
const { getAllUsersProc, signInProc } = require('./procedures/getAllUsers');
const logme = require('../helper/logme');

// // create a class to handle all the database operations
// class DbOperation {
//     constructor() {
//         // connect to the database
//         connectDB();
//     }
//     generateResponse(data, message) {
//         const response = {
//             name: data.name,
//             email: data.email,
//             createdAt: data.createdAt,
//             updatedAt: data.updatedAt,
//             additionalInfo: data.additionalInfo,
//             roleids: data.roleids,
//         };

//         return {
//             message: message,
//             user: response
//         };
//     }
//     // Create a new user
//     async createUser(data) {
//         try {
//             const user = await User.create(data);
//             return this.generateResponse(user, "User created successfully");
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }

//     // Get all users
//     async getUsers() {
//         try {
//             const users = await User.find();
//             return {
//                 message: "Users retrieved successfully",
//                 users: users
//             }
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }

//     // Get a user by ID
//     async getUserById(id) {
//         try {
//             const isValidId = dbvalidation.validateId(id);
//             if (!isValidId) {
//                 throw new Error("Invalid ID");
//             }
//             const user = await User.findById(id);
//             if (!user) {
//                 throw new Error("User not found");
//             }
//             return this.generateResponse(user, "User retrieved successfully");
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }

//     // Update a user by ID
//     async updateUser(id, data) {
//         try {
//             const isValidId = mongoose.Types.ObjectId.isValid(id);
//             if (!isValidId) {
//                 throw new Error("Invalid ID");
//             }
//             const user = await User.findByIdAndUpdate(id, data, {
//                 new: true,
//                 runValidators: true
//             });
//             return this.generateResponse(user, "User updated successfully");
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }

//     // Delete a user by ID
//     async deleteUser(id) {
//         try {
//             const isValidId = mongoose.Types.ObjectId.isValid(id);
//             if (!isValidId) {
//                 throw new Error("Invalid ID");
//             }
//             const user = await User.findByIdAndDelete(id);
//             return this.generateResponse(user, "User deleted successfully");
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }

//     // signin
//     async signIn(data) {
//         try {
//             const user = await User.findOne({
//                 email: data.email
//             }).where('email').equals(data.email);
//             if (!user) {
//                 throw new Error("User not found");
//             } else {
//                 if (data?.password) {
//                     const compare = await bcrypt.compare(data.password, user.password);
//                     if (compare) {
//                         return this.generateResponse(user, "User retrieved successfully");
//                     } else {
//                         throw new Error("Incorrect credentials");
//                     }
//                 } else {
//                     throw new Error("Incorrect credentials");
//                 }
//             }
//         } catch (error) {
//             return dbvalidation.generateErrorResp(error, '');
//         }
//     }
// }



class DbOperation {
    async getAllUsers() {
        try {
            const users = await getAllUsersProc();
            if (!users[0].length) {
                throw new Error("No users found");
            }
            const finalResult = users[0].map(async (user) => {
                return await this.removeSecrets(user);
            });
            return await Promise.all(finalResult);
        } catch (error) {

        }
    }

    async signIn(data) {
        try {
            const user = await signInProc(data);
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
}
module.exports = new DbOperation();