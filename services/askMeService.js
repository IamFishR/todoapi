const {
    GoogleGenerativeAI,
    ChatSession
} = require("@google/generative-ai");
require('dotenv').config();

class AskMeService {
    constructor() {
        try {
            this.genAI = new GoogleGenerativeAI(process.env.GENERATIVEAI_API_KEY);
            const generationConfig = {
                // stopSequences: ["red"],
                // maxOutputTokens: 100,
                // temperature: 0.9,
                // topP: 0.1,
                // topK: 16,
            };
            this.model = this.genAI.getGenerativeModel({
                model: "gemini-pro",
                // generationConfig: generationConfig
            });
        } catch (error) {
            return {
                error: error.message,
                stack: error.stack,
            }
        }
    }

    async askQuestion(prompt) {
        try {
            const result = await this.model.generateContent(prompt);
            const response = result.response;
            const text = response.text();
            const { totalTokens } = await this.model.countTokens(prompt);
            return {
                question: prompt,
                answer: response,
                text: text,
                totalTokens: totalTokens
            };
        } catch (error) {
            return {
                error: error,
                api_key: process.env.GENERATIVEAI_API_KEY
            }
        }
    }

    async askChatQuestion(chatSession, prompt) {
        try {
            const chat = this.model.startChat();
            const result = await chat.sendMessage(prompt);
            const response = result.response;
            const text = response.text();
            const { totalTokens } = await this.model.countTokens(prompt);
            // const chatSession = chat.getSession();
            const chathistory = await chat.getHistory();
            return {
                question: prompt,
                answer: response,
                text: text,
                totalTokens: totalTokens,
                // chatSession: chatSession,
                chathistory: chathistory
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