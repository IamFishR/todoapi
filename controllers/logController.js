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
            const data = req.body;
            const requiredFields = ['user_id', 'sms_body'];
            const missingFields = Common.checkRequiredFields(data, requiredFields);
            if (missingFields.length) {
                res.status(400).json({
                    status: 'error',
                    message: 'Missing required fields',
                    missing_fields: missingFields
                })
            }
            const id = await Common.generateUniqueId();
            const logs = await dbOperation.writeSMS({
                id: id,
                user_id: data.user_id,
                sms_type: data.sms_type || '', // transaction, otp, promotional, reminder
                sms_source: data.sms_source || '',
                sms_body: data.sms_body,
                sms_date: data.sms_date || '',
                sms_info: data.sms_info || '',
                ai: data.ai || ''
            });
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
            let newsArr = [];
            if (dt.length) {
                newsArr = dt;
            } else {
                newsArr.push(dt);
            }

            // {
            //     id: id,
            //     title: news.title,
            //     summary: news.summary,
            //     url: news.url,
            //     contifyImageUrl: news.contifyImageUrl,
            //     pubDate: news.pubDate,
            //     source: news.source,
            //     companies: JSON.stringify(news.companies),
            //     topics: JSON.stringify(news.topics),
            //     hidden: news.hidden
            // }

            let errors = [];
            let logs = [];

            for (let i = 0; i < newsArr.length; i++) {
                const news = newsArr[i];
                const id = await Common.generateUniqueId();
                const result = await dbOperation.writeNews({
                    id: id,
                    user_id: news.user_id,
                    title: news.title,
                    summary: news.summary,
                    url: news.url,
                    contifyImageUrl: news.contifyImageUrl,
                    pubDate: news.pubDate,
                    source: news.source,
                    companies: JSON.stringify(news.companies),
                    topics: JSON.stringify(news.topics),
                    hidden: news.hidden
                });
                if (result.error) {
                    errors.push({
                        news: news,
                        error: result.error
                    });
                } else {
                    logs.push({
                        news: news,
                    });
                }
            }

            // if (errors.length) {
            //     throw new Error(errors.join(', '));
            // }

            res.status(200).json({
                message: 'News written successfully',
                logs,
                success: logs.length,
                errors: errors.length,
                not_inserted: errors
            });

        } catch (error) {
            const msg = error?.message || error;
            logme.error({
                message: msg,
                method: 'storeNews',
                controller: 'LogController',
                action: 'storeNews'
            });
            res.status(500).json({ error: msg });
        }
    }
}

module.exports = new LogController();