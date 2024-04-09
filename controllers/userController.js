const dbOperation = require("../models/dbOperation");
const { generateToken, verifyToken } = require('../config/authMiddleware');

class UserController {
    constructor() {
    }

    // Create a new user
    async createUser(req, res) {
        try {
            const data = req.body;
            const user = await dbOperation.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            const message = error.message;
            res.status(400).json({
                error: message,
                details: error
            });
        }
    }

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await dbOperation.getAllUsers();
            res.status(200).json({
                message: "Users retrieved successfully",
                users: users
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const userid = req.params.id;
            const user = await dbOperation.getUserById(userid);
            if (!user) {
                throw new Error("User not found");
            }
            res.status(200).json(user);
        } catch (error) {
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
            const user = await dbOperation.signIn(data);
            const token = generateToken(user);
            res.status(200).json({
                message: "Sign in successful",
                token: token
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

}

module.exports = new UserController();