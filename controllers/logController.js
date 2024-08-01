const dbOperation = require("../models/dboperations/logOperation");
const logme = require('../helper/logme');
const Common = require('../helper/common');

class LogController {
    constructor() {

    }

    async getLogs(req, res) {
        try {
            const date = req.query.date ? req.query.date : new Date();
            const logs = await dbOperation.getLogs(date);
            if (logs.error) {
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
            if (logs.error) {
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

    async storeNews(req, res) {
        try {
            let dt = req.body;
            const id = await Common.generateUniqueId();
            dt['id'] = id;
            const logs = await dbOperation.writeNews({
                id: id,
                title: dt.title,
                summary: dt.summary,
                url: dt.url,
                contifyImageUrl: dt.contifyImageUrl,
                pubDate: dt.pubDate,
                source: dt.source,
                companies: dt.companies,
                topics: dt.topics,
                hidden: dt.hidden
            });
            if (logs.error) {
                throw new Error(logs.error);
            }

            res.status(200).json({
                'status': 'success',
                'data': logs
            });
        } catch (error) {
            logme.error({
                message: error,
                method: 'storeNews',
                controller: 'LogController',
                action: 'storeNews'
            });
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new LogController();