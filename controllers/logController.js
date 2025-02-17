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
            const requiredFields = ['user_id'];
            for (let i = 0; i < requiredFields.length; i++) {
                if (!data[requiredFields[i]]) {
                    throw new Error(`${requiredFields[i]} is required`);
                }
            }

            let smsArr = [];
            if (data?.sms.length) {
                smsArr = data.sms;
            } else {
                smsArr.push(data.sms);
            }

            let errors = [];
            let logs = [];

            for (let i = 0; i < smsArr.length; i++) {
                const sms = smsArr[i];
                const id = await Common.generateUniqueId();
                logme.info({
                    message: `Writing sms with id: ${id}`,
                    method: 'sendSms',
                    controller: 'LogController',
                    action: 'sendSms'
                });
                const time = Common.convertTimeToGMT(sms.sms_date);
                logme.info({
                    message: `Converted time to GMT: ${time}`,
                    method: 'sendSms',
                    controller: 'LogController',
                    action: 'sendSms'
                });
                const result = await dbOperation.writeSMS({
                    id: id,
                    user_id: sms.user_id,
                    sms_type: sms.sms_type || '', // transaction, otp, promotional, reminder
                    sms_source: sms.sms_source || '',
                    sms_body: sms.sms_body,
                    sms_date: time,
                    sms_info: sms.sms_info || '',
                    ai: sms.ai || ''
                });
                if (result.error) {
                    errors.push({
                        sms: sms,
                        error: result.error
                    });
                } else {
                    logs.push({
                        sms: sms,
                    });
                }
            }

            res.status(200).json({
                message: 'SMS written successfully',
                logs,
                success: logs.length,
                errors: errors.length,
                not_inserted: errors
            });
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

    async storeReminder(req, res) {
        try {
            const data = req.body;
            const requiredFields = ['user_id', 'title', 'date', 'time'];
            for (let i = 0; i < requiredFields.length; i++) {
                if (!data[requiredFields[i]]) {
                    throw new Error(`${requiredFields[i]} is required`);
                }
            }

            const id = await Common.generateUniqueId();
            dbOperation.writeReminder({
                id: id,
                user_id: data.user_id,
                title: data.title,
                description: data.description || '',
                action: data.action || '',
                date: data.date,
                time: data.time
            }).then(result => {
                res.status(200).json({
                    message: 'Reminder written successfully',
                    id: id
                });
            }).catch(error => { });
        } catch (error) {
            logme.error({
                message: error.message,
                method: 'storeReminder',
                controller: 'LogController',
                action: 'storeReminder'
            });
            res.status(500).json({ error: error.message });
        }
    }

    async getReminders(req, res) {
        try {
            const user_id = req.query.user_id;
            const reminders = await dbOperation.getReminders(user_id);
            if (reminders.error) {
                throw new Error(reminders.error);
            }
            res.status(200).json({ reminders });
        } catch (error) {
            logme.error({
                message: error.message,
                method: 'getReminders',
                controller: 'LogController',
                action: 'getReminders'
            });
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new LogController();