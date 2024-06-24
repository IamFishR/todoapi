


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

    async chat(query) {
        try {
            return new Promise(async (resolve, reject) => {
                const model = this.models.phi3;
                const url = `${model.base_url}/${model.endpoints.generate_completion.url}`;
                const body = {
                    "model": model.model,
                    "prompt": query,
                    "format": "json",
                    "stream": true,
                    "options": {
                        "temperature": 0.5,
                        "max_tokens": 100,
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
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let result = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    result += decoder.decode(value, { stream: true });
                }

                const parsedResponse = JSON.parse(result);
                tokensUsed = parsedResponse.eval_count;
                timeTaken = parsedResponse.eval_duration;

                const responseObj = {
                    ...parsedResponse,
                    token_per_second: tokensUsed / timeTaken * 10 ** 9,
                };

                resolve(responseObj);
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
        }
    }
}

module.exports = new AiModel();