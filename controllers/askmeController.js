const AskMeService = require('../services/askMeService');
const Prompts = require('../services/geminiPrompt');
const logme = require('../helper/logme');
const GenerativeOperation = require('../models/dboperations/generativeOperation');
const Common = require('../helper/common');

class AskMeController {
    constructor() {

    }

    async askMe(req, res) {
        try {
            const query = req.body.query;
            if (!query) {
                throw new Error("Query is required");
            }

            const buildPrompt = await Prompts.getPromt({
                name: req.body.prompt ? req.body.prompt : 'logical'
            });
            const prompt = `${buildPrompt} Text: ${query} `;
            const answer = await AskMeService.askQuestion(prompt);
            if (answer.error) {
                throw new Error(JSON.stringify({
                    message: answer.error.message,
                    prompt: prompt,
                    query: query,
                }));
            }

            GenerativeOperation.saveResponse({
                "response": {
                    "question": answer.question,
                    "answer": answer.text,
                },
                "user_id": req.user.id,
                "type": "logical",
                "status": "one_time_chat",
                "created_at": "Common.getTodaysDateWithTime()",
                "updated_at": "Common.getTodaysDateWithTime()",
                "deleted_at": null,
            }).then((result) => {
                res.status(200).json({
                    ...answer,
                    ratelimit: req.ratelimit
                });
            }).catch((error) => {
                logme.error({
                    message: 'Unable to save response in database.',
                    data: {
                        query: req.body.query,
                        prompt: req.body.prompt,
                    }
                });
                res.status(200).json({
                    message: 'Unable to save response in database.',
                    ...answer,
                    ratelimit: req.ratelimit
                });
            });
        } catch (error) {
            const err = JSON.parse(error.message);
            logme.error({
                message: error.message,
                data: err
            });
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    async askChatMe(req, res) {
        try {
            const query = req.body.query;
            if (!query) {
                throw new Error("Query is required");
            }

            // const chatSession = await AskMeService.createChatSession();
            const buildPrompt = await Prompts.getPromt({
                name: req.body.prompt ? req.body.prompt : 'chat'
            });
            const prompt = `${buildPrompt} Text:${query} `;
            const answer = await AskMeService.askChatQuestion('', prompt);

            res.status(200).json({
                ...answer,
                ratelimit: req.ratelimit
            });
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }

    async askHdfcBankSmsAnalysis(req, res) {
        try {
            const query = req.body.query;
            if (!query) {
                throw new Error("Query is required");
            }

            const buildPrompt = await Prompts.getPromt({
                name: 'hdfcBankSms'
            });
            if (buildPrompt.error) {
                throw new Error(buildPrompt.error);
            }
            const prompt = `${buildPrompt} Message: ${query} `;
            let answer = await AskMeService.askQuestion(prompt);
            if (answer.error) {
                throw new Error(JSON.stringify({
                    message: answer.error.message,
                    prompt: prompt,
                    query: query,
                }));
            }
            answer.text = JSON.parse(answer.text.trim().replaceAll('--', '').replaceAll('\n', ''));
            if (answer.error) {
                throw new Error(JSON.stringify({
                    message: answer.error.message,
                    prompt: prompt,
                    query: query,
                }));
            }
            GenerativeOperation.saveResponse({
                "response": {
                    "question": answer.question,
                    "answer": answer.text,
                },
                "user_id": req.user.id,
                "type": "hdfcBankSms",
                "status": "one_time_chat",
                "created_at": "Common.getTodaysDateWithTime()",
                "updated_at": "Common.getTodaysDateWithTime()",
                "deleted_at": null,
            }).then((result) => {
                res.status(200).json({
                    ...answer,
                    ratelimit: req.ratelimit
                });
            }).catch((error) => {
                res.status(200).json({
                    message: 'Unable to save response in database.',
                    ...answer,
                });
            });
        } catch (error) {
            logme.error({
                message: error.message,
                data: {
                    query: req.body.query,
                    prompt: req.body.prompt,
                }
            });
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }
}

module.exports = new AskMeController();