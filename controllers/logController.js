const dbOperation = require("../models/dboperations/logOperation");
const logme = require('../helper/logme');

class LogController {
    constructor() {

    }

    async getLogs(req, res) {
        try {
            const date = req.query.date ? req.query.date : new Date();
            const logs = await dbOperation.getLogs(date);
            if(logs.error) {
                throw new Error(logs.error);
            }
            res.status(200).json({ logs });
        } catch (error) {
            logme.error({
                message: error.message,
                method: 'getLogs',
                controller: 'LogController',
                action: 'getLogs'
            });
            res.status(500).json({ error: error.message });
        }
    }

    async sendSms(req, res) {
        try {
            const logs = await dbOperation.writeSMS(date);
            if(logs.error) {
                throw new Error(logs.error);
            }

            res.status(200).json({ message: 'SMS written successfully' });
        } catch (error) {
            logme.error({
                message: error.message,
                method: 'sendSms',
                controller: 'LogController',
                action: 'sendSms'
            });
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LogController();