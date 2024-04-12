const AskMeService = require('../services/askMeService');
const Prompts = require('../services/geminiPrompt');
const logme = require('../helper/logme');

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
            if(answer.error) {
                throw new Error(JSON.stringify({
                    message: answer.error.message,
                    prompt: prompt,
                    query: query,
                    api_key: process.env.GENERATIVEAI_API_KEY
                }));
            }

            res.status(200).json({
                ...answer,
                ratelimit: req.ratelimit
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
}

module.exports = new AskMeController();