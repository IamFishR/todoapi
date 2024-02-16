const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

class AskMeService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GENERATIVEAI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    async askQuestion(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            return {
                question: prompt,
                answer: response,
                text: text
            };
        } catch (error) {
            return {
                error: error.message,
                stack: error.stack
            }
        }
    }
}

module.exports = new AskMeService();