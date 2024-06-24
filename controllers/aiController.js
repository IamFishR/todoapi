const AiModel = require("../models/generativeai/ollamaModel");

class AiController {
    constructor() {
        this.models = {
            "phi3": {
                "base_url": "http://localhost:11434",
                "model": "phi3",
                "endpoints": {
                    "generate_completion": {
                        "url": "api/generate",
                        "response": {
                            "model": "phi3",
                            "created_at": "2023-08-04T08:52:19.385406455-07:00",
                            "response": "The",
                            "done": false,
                            "total_duration": "time spent generating the response",
                            "load_duration": "time spent in nanoseconds loading the model",
                            "prompt_eval_count": "number of tokens in the prompt",
                            "prompt_eval_duration": "time spent in nanoseconds evaluating the prompt",
                            "eval_count": "number of tokens in the response",
                            "eval_duration": "time in nanoseconds spent generating the response",
                            "context": "an encoding of the conversation used in this response, this can be sent in the next request to keep a conversational memory",
                            "response": "empty if the response was streamed, if not streamed, this will contain the full response",
                        },
                        "token_per_second": {
                            "info": "To calculate how fast the response is generated in tokens per second (token/s), divide eval_count / eval_duration * 10^9.",
                            "formula": "eval_count / eval_duration * 10^9",
                        }
                    },
                }
            },
        }
    }

    async chat(req, res) {
        try {
            const data = req.body;
            if (!data.query) {
                throw new Error("Query is required");
            }
            if (!data.user_id) {
                throw new Error("User id is required");
            }
            if (!data.chat_id) {
                throw new Error("Chat id is required");
            }
            AiModel.chat({
                query: data.query,
                owner: data.user_id,
                chat_id: data.chat_id,
            }).then((aiResponse) => {
                res.status(200).send(aiResponse);
            }).catch((error) => {
                res.status(400).json({
                    message: error.message,
                });
            });

        } catch (error) {
            res.status(400).json({
                message: error.message,
            });
        }
    }

    async generateImage(req, res) {
        const url = 'http://localhost:1234/v1/images';
        const stream = new Readable();
        stream.push(JSON.stringify({
            "model": "flax-community/BigGAN-deep-256",
            "stream": "true"
        }));
        stream.push(null);

        // post request to ai server
        const modelUrl = 'http://localhost:1234/v1/images'
        const response = await fetch(modelUrl, {
            method: 'POST',
            body: stream,
            headers: { 'Content-Type': 'application/json' },
            duplex: 'half'
        });
        // wait for all chunks to be received
        const chunks = [];
        for await (const chunk of response.body) {
            chunks.push(chunk);
        }

        // combine all chunks and send to client
        const responseText = Buffer.concat(chunks).toString('utf8');

        // // send response to client
        res.json(JSON.parse(responseText));
    }
}

module.exports = new AiController();