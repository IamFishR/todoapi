const logme = require('../helper/logme');
// const axios = require('axios');
const { Readable } = require('stream');



class AiController {
    constructor() {
    }

    async chat(req, res) {
        const url = 'http://localhost:1234/v1/chat/completions';
        const stream = new Readable();
        stream.push(JSON.stringify({
            "model": "lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF",
            "messages": [
                { "role": "system", "content": "You are an AI" },
                { "role": "user", "content": req.body.message || "Hello" }
            ],
            "temperature": "0.7",
            "max_tokens": "-1",
            "stream": "true"
        }));
        stream.push(null);

        // post request to ai server
        const modelUrl = 'http://localhost:1234/v1/chat/completions'
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