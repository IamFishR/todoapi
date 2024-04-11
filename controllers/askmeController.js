const AskMeService = require('../services/askMeService');
const Prompts = require('../services/geminiPrompt');

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
            const prompt = `${buildPrompt} ${query} `;
            const answer = await AskMeService.askQuestion(prompt);

            res.status(200).json({
                ...answer,
                ratelimit: req.ratelimit
            });
        } catch (error) {
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
            const prompt = `${buildPrompt} ${query} `;
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