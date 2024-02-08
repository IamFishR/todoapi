const dbOperation = require("../models/adminDbOperation");

class AdminController {
    constructor() {
        // super();
    }

    // Create a new role
    async createRole(req, res) {
        try {
            const data = req.body;
            const role = await dbOperation.createRole(data);
            res.status(201).json(role);
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    async getRoles(req, res) {
        try {
            const roles = await dbOperation.getRoles();
            res.status(200).json(roles);
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }
}

module.exports = new AdminController();