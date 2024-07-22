const DbOperation = require('../dbOperation');


class AiModel {
    constructor() {
    }

    options = {
        "num_keep": 5,
        "seed": 42,
        "num_predict": 100,
        "top_k": 20,
        "top_p": 0.9,
        "tfs_z": 0.5,
        "typical_p": 0.7,
        "repeat_last_n": 33,
        "temperature": 0.8,
        "repeat_penalty": 1.2,
        "presence_penalty": 1.5,
        "frequency_penalty": 1.0,
        "mirostat": 1,
        "mirostat_tau": 0.8,
        "mirostat_eta": 0.6,
        "penalize_newline": true,
        "stop": ["\n", "user:"],
        "numa": false,
        "num_ctx": 1024,
        "num_batch": 2,
        "num_gpu": 1,
        "main_gpu": 0,
        "low_vram": false,
        "f16_kv": true,
        "vocab_only": false,
        "use_mmap": true,
        "use_mlock": false,
        "num_thread": 8
    }

    async chat(data) {
        const _this = this;
        try {
            return new Promise(async (resolve, reject) => {
                const model = this.models;
                const url = `${model.base_url}/${model.endpoints.generate_completion.url}`;
                const body = {
                    "model": model.model,
                    "prompt": `${data.query}`,
                    // "format": "json",
                    "stream": false,
                    "options": {
                        "temperature": 0.8,
                        "max_tokens": 10000,
                        // "top_p": 1,
                        // "frequency_penalty": 0,
                        // "presence_penalty": 0,
                        // ...this.options
                    },
                    "raw": false,
                    // "images": [],
                    // "system": null,
                    // "template": null,
                };

                let tokensUsed = 0;
                let timeTaken = 0;

                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(body),
                });

                const themedResponse = await response.json();
                resolve(themedResponse);

                // const reader = response.body.getReader();
                // const decoder = new TextDecoder();
                // let themedResponse = {};
                // let text = '';

                // while (true) {
                //     const { done, value } = await reader.read();
                //     const _d = decoder.decode(value, { stream: true }).slice(0, -1); // remove trailing newline

                //     if (done) {
                //         break;
                //     }
                //     let _p = JSON.parse(_d);
                //     if (_p?.done) {
                //         themedResponse = _p;
                //     }
                //     text += _p?.response || '';
                // }

                // tokensUsed = themedResponse.eval_count;
                // timeTaken = themedResponse.eval_duration;
                // if (timeTaken != 0 || tokensUsed != 0) {
                //     themedResponse.token_per_second = (tokensUsed / timeTaken * 10 ** 9).toFixed(2);
                //     // convert time taken to seconds
                //     themedResponse.eval_duration = (timeTaken / 10 ** 9).toFixed(2);
                //     themedResponse.prompt_eval_duration = (themedResponse.prompt_eval_duration / 10 ** 9).toFixed(2);
                // }

                // // remove context from response
                // delete themedResponse.context;

                // themedResponse["user_id"] = data.owner;
                // themedResponse["chat_id"] = data.chat_id;
                // themedResponse["question"] = data.query;
                // themedResponse["answer"] = text;
                // resolve(themedResponse);
            });
        } catch (error) {
            return error;
        }
    }

    

    async saveChat(data) {
        try {
            return new Promise(async (resolve, reject) => {
                DbOperation.aichat(data).then((result) => {
                    if (result.error) {
                        reject(result);
                    }
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (error) {
            return error;
        }
    }

    models = {
        "base_url": "http://localhost:11434",
        "model": "llama3:latest",
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
                },
            },
        }
    }
}

module.exports = new AiModel();