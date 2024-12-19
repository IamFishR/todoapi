const dbOperation = require("../models/dbOperation");
const { generateToken, verifyToken } = require('../config/authMiddleware');
const logme = require('../helper/logme');
const common = require('../helper/common');
const bcrypt = require('bcryptjs');

class UserController {
    constructor() {
    }

    // Create a new user
    async createUser(req, res) {
        try {
            const data = req.body;
            if (data.password !== data.confirmPassword) {
                throw new Error("Passwords & confirm password does not match");
            }

            if (data.password.length < 6) {
                throw new Error("Password must be at least 6 characters long");
            }

            if (data.emmail === "" || data.password === "") {
                throw new Error("Email and password are required fields");
            }

            data.password = await bcrypt.hash(data.password, 10);
            const id = await common.generateUniqueId();
            let dt = {
                user_id: id,
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role || 'user',
                avatar: data.avatar || null,
                bio: data.bio || null,
                facebook: data.facebook || null,
                twitter: data.twitter || null,
                linkedin: data.linkedin || null,
                github: data.github || null,
                website: data.website || null,
                google: data.google || null,
            };
            dbOperation.createUser(dt).then((user) => {
                if (user.error) {
                    throw new Error(user.error);
                }
                res.status(200).json({
                    message: "User created successfully",
                    user: user
                });
            }).catch((error) => {
                throw new Error(error.message);
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const userid = req.params.id;
            if (!userid) {
                throw new Error("User ID is required");
            }
            dbOperation.getUserById(userid).then((user) => {
                if (!user) {
                    throw new Error("User not found");
                }
                res.status(200).json({
                    status: 'success',
                    user: user
                });
            }).catch((error) => {
                res.status(400).json({ error: error.message });
            });
        } catch (error) {
            logme.error({
                message: "getUserById failed",
                data: error
            });
            res.status(400).json({ error: error.message });
        }
    }

    // Update a user by ID
    async updateUser(req, res) { }

    // Delete a user by ID
    async deleteUser(req, res) {
        try {
            const userid = req.params.id;
            const user = await dbOperation.deleteUser(userid);
            res.status(200).json({
                message: "User deleted successfully",
                user: user
            });
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    // signin
    async signIn(req, res) {
        try {
            const data = req.body;
            const session_id = await common.generateUniqueId();
            dbOperation.signIn(data).then((user) => {
                if (!user) {
                    res.status(400).json({ error: "User not found" });
                } else {
                    bcrypt.compare(data.password, user.password, (err, result) => {
                        if (!result) {
                            res.status(400).json({ error: "Invalid password" });
                        } else {
                            // remove password from user object
                            dbOperation.removeSecrets(user).then((user_dt) => {
                                user_dt['session_id'] = session_id; // add session id to user object
                                generateToken(user_dt).then((token) => {
                                    dbOperation.createSession({
                                        session_id: session_id,
                                        user_id: user.user_id,
                                        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                                        user_agent: req.headers['user-agent'],
                                        last_activity: 'login',
                                        session_token: token,
                                        session_status: 'active',
                                    }).then((result) => {
                                        if (result.error) {
                                            res.status(400).json({ error: result.error });
                                        }
                                        res.status(200).json({
                                            message: "Sign in successful",
                                            token: token,
                                            user: {
                                                user_id: user.user_id,
                                                name: user.name,
                                                email: user.email,
                                                role: user.role,
                                                avatar: user.avatar,
                                                bio: user.bio,
                                                facebook: user.facebook,
                                                twitter: user.twitter,
                                                linkedin: user.linkedin,
                                                github: user.github,
                                                website: user.website,
                                                google: user.google,
                                                created_at: user.created_at,
                                            }
                                        });
                                    }).catch((error) => {
                                        res.status(400).json({ error: error.message });
                                    });
                                }).catch((error) => {
                                    res.status(400).json({ error: error.message });
                                });
                            }).catch((error) => {
                                res.status(400).json({ error: error.message });
                            });
                        }
    
                    });
                }
            }).catch((error) => {
                res.status(400).json({ error: error.message });
            });

        } catch (error) {
            logme.error(error.message);
            res.status(400).json({ error: error.message });
        }
    }

    async signOut(req, res) {
        try {
            const token = req.headers['authorization'].replace('Bearer ', '');
            const decoded = verifyToken(token);
            if (!decoded) {
                throw new Error("Invalid token");
            }
            dbOperation.signOut({
                session_id: decoded.session_id,
            }).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200).json({ message: "Sign out successful" });
            }).catch((error) => {
                throw new Error(error.message);
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async verifySingnIn(req, res) {
        try {
            const token = req.body.token;
            const decoded = verifyToken(token);
            if (!decoded) {
                throw new Error("Invalid token");
            }
            if (decoded.exp < new Date()) {
                throw new Error("Token expired");
            }
            res.status(200).json({ message: "Authentication successful", decoded: decoded });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async copyPaste(req, res) {
        try {
            const data = req.body;
            if (!data.content) {
                throw new Error("Content is required");
            }

            // convert content to Text
            // data.content = Buffer.from(data.content, 'base64').toString('utf-8');
            if (typeof data.content === 'object') {
                data.content = JSON.stringify(data.content);
            } else {
                data.content = data.content.toString();
            }


            if (data.user_id) {
                data.user_id = data.user_id.trim();
            } else {
                throw new Error("User ID is required");
            }
            data['copy_paste_id'] = await common.generateUniqueId();
            data['created_at'] = new Date();

            dbOperation.copyPaste({
                copy_paste_id: data.copy_paste_id,
                owner: data.user_id,
                content: data.content,
                created_at: data.created_at
            }).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200).json({
                    message: "Copy paste successful",
                    user: data
                });
            }).catch((error) => {
                throw new Error(error.message);
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new UserController();