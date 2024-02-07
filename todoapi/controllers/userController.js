const dbOperation = require("../models/dbOperation");


class UserController {
    constructor() {
        // super();
    }

    // Create a new user
    async createUser(req, res) {
        try {
            const data = req.body;
            const user = await dbOperation.createUser(data);
            res.status(201).json(user);
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    // Get all users
    async getUsers(req, res) { }

    // Get a user by ID
    async getUserById(req, res) {
        try {
            const userid = req.params.id;
            const user = await dbOperation.getUserById(userid);
            res.status(200).json(user);
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    // Update a user by ID
    async updateUser(req, res) { }

    // Delete a user by ID
    async deleteUser(req, res) { }

}

module.exports = new UserController();