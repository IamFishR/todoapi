const AskMeService = require('../services/askMeService');

class AskMeController {
    constructor() {

    }

    async askMe(req, res) {
        try {
            const query = req.body.query;
            const answer = await AskMeService.askQuestion(query);
            res.status(200).json(answer);
        } catch (error) {
            const message = error.message;
            res.status(400).json({ error: message });
        }
    }
}

module.exports = new AskMeController();