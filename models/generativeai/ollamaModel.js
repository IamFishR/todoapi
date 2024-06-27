const DbOperation = require('../dbOperation');


class AiModel {
    constructor() {
        this.modelType = {
            "chat": {
                "model": "phi3",
            }
        }
        // params:
        // model <string> The name of the model to use for the chat.
        // prompt <string>: The prompt to send to the model.
        // system <string>: (Optional) Override the model system prompt.
        // template <string>: (Optional) Override the model template.
        // raw <boolean>: (Optional) Bypass the prompt template and pass the prompt directly to the model.
        // images <Uint8Array[] | string[]>: (Optional) Images to be included, either as Uint8Array or base64 encoded strings.
        // format <string>: (Optional) Set the expected format of the response (json).
        // stream <boolean>: (Optional) When true an AsyncGenerator is returned.
        // keep_alive <string | number>: (Optional) How long to keep the model loaded.
        // options <Options>: (Optional) Options to configure the runtime.
    }

    // async predict(data) {
    //     return ;
    // }

    // async train(data) {
    //     return this.model.train(data);
    // }

    async chat(data) {
        const _this = this;
        try {
            return new Promise(async (resolve, reject) => {
                const model = this.models['gemma:2b'];
                const url = `${model.base_url}/${model.endpoints.generate_completion.url}`;
                const body = {
                    "model": model.model,
                    // "prompt": data.query,
                    "prompt": `technical chat: ${data.query}`,
                    // "format": "json",
                    "stream": true,
                    "options": {
                        "temperature": 1,
                        "max_tokens": 1000,
                        "top_p": 1,
                        "frequency_penalty": 0,
                        "presence_penalty": 0,
                        "stop_sequence": null,
                    },
                    "raw": false,
                    "images": [],
                    // "system": null,
                    // "template": null,
                };

                let tokensUsed = 0;
                let timeTaken = 0;

                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(body),
                });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let themedResponse = {};
                let text = '';

                while (true) {
                    const { done, value } = await reader.read();
                    const _d = decoder.decode(value, { stream: true }).slice(0, -1); // remove trailing newline

                    if (done) {
                        break;
                    }
                    let _p = JSON.parse(_d);
                    if (_p?.done) {
                        themedResponse = _p;
                    }
                    text += _p?.response || '';
                }

                tokensUsed = themedResponse.eval_count;
                timeTaken = themedResponse.eval_duration;
                if (timeTaken != 0 || tokensUsed != 0) {
                    themedResponse.token_per_second = (tokensUsed / timeTaken * 10 ** 9).toFixed(2);
                    // convert time taken to seconds
                    themedResponse.eval_duration = (timeTaken / 10 ** 9).toFixed(2);
                    themedResponse.prompt_eval_duration = (themedResponse.prompt_eval_duration / 10 ** 9).toFixed(2);
                }

                // remove context from response
                delete themedResponse.context;

                themedResponse["user_id"] = data.owner;
                themedResponse["chat_id"] = data.chat_id;
                themedResponse["question"] = data.query;
                themedResponse["answer"] = text;
                resolve(themedResponse);
            }).then((result) => {
                return new Promise(async (resolve, reject) => {
                    _this.saveChat(result).then((response) => {
                        if (response.error) {
                            reject(response.error);
                        }
                        resolve(result);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }).catch((error) => {
                return {
                    error: error.message
                }
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
                    },
                },
            }
        },
        'gemma:2b': {
            "base_url": "http://localhost:11434",
            "model": "gemma:2b",
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
}

module.exports = new AiModel();