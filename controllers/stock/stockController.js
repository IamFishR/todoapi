const StockModal = require('../../models/db/stock/stockModal');

class Stock {
    constructor() {
        this.StockModal = new StockModal();
    }

    async getCompanyInfo(req, res) {
        // https://www.nseindia.com/api/equity-meta-info?symbol=EXIDEIND
        const symbol = req.body.symbol;
        if (!symbol) {
            return res.status(400).json({
                status: false,
                message: 'Error: Symbol is required'
            });
        }
        const url = `https://www.nseindia.com/api/equity-meta-info?symbol=${symbol}`;
        const options = {
            method: 'GET',
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "priority": "u=0, i",
                "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Microsoft Edge\";v=\"133\", \"Chromium\";v=\"133\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "upgrade-insecure-requests": "1",
                "cookie": "_ga=GA1.1.631773423.1739851200; AKA_A2=A; nsit=7j2prgrxP_t04aljDr8JIAu-; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTc0MDMyMTU4MywiZXhwIjoxNzQwMzI4NzgzfQ.yZmg33GG3-e_p1XE7Tq7FPb4qzx5XQl6Z3xqAsFZ9k4; bm_mi=1BC0433748A7655C854E4B88921C478A~YAAQpwxSt+AOTwGVAQAAb/U/MxpWYTc3sh3XtNVDGg1u0SS/5VqozHGclSlcAX6Gf9I7dvqQ8VqEEBMr5nubPMF+Eam436UNA57CNfWW+hVUx7fL1xH8sTOMNyqjOke1z3G/2dWwqHswIhDej3tteAtx53AYGBju1ph3zC+zE48ppRAqKRLfBtmIhNwWhJ0a+BdhIOdz5jds+f5KgndBuRxzYwwec86JXXL67x2t16GmcrRdDxFglE2iYA3635nzMqiOEKr2m66yseQdjA29wfH+cqkTEVc0hjsLEfEYbNBnc14w7Sbz8awDLUOiu+SV~1; _abck=A8609AAE4A52C85ADB0F1C9DA59FA1AB~0~YAAQpwxSt+YOTwGVAQAAi/c/Mw2ljqmpeRXPk/WnTtZwDZW+jTh5qwryniaFuXCSgRKue/e/9SQ7/JgA2fAg56twTPUpP0IrZcv0+bInShOeliqC1GdfbIwQ5q1sZdQqDQIfXf8++jL44SJUpU/wKTylYy13rThMam/WPt5v/JLPMTjwpRx0KRkC468hM7rqHB3bllsmXKmgQz3415fTo7ahfLX7cicUXA79A/IrGpa2PkqWF0Oj1fOQ/cu/z9pwi2uT3jNqDNiemOK1+5hEiwze6I8DELc/Z/rf1GKb8+55y5Uw6IwRNxJzzcR+2vJ4wEw1GJ9GDEoJb3WEAz2hj6CZTlLGMFH2YS5E+zHsNXSlBUstdfQwg4NGvISyKVPogYzIvAdhA6NwFDvwqwNp1RYM8UWNpDzHfkt07cTuTtjw583cTkoZb9J+M4X6mffPAIT7njIAE3Hl1gBuqFWdI6ubkO0VWX3yrn+/zKpPa5UlRjAQm3NomYAZsbXVKA==~-1~-1~-1; _ga_87M7PJ3R97=GS1.1.1740321590.10.1.1740321590.60.0.0; _ga_WM2NSQKJEK=GS1.1.1740321590.10.0.1740321590.0.0.0; ak_bmsc=0EBCE4C4A680E3D31EE99427A3C16BDD~000000000000000000000000000000~YAAQpwxStwoPTwGVAQAAVfw/Mxpw3NL1+/W1laVlp2xrfgAJUhmrbklzOeVOQWTLukDRdivNrpU2aMp+EUf1JXZf14gwLNh2xjnfQE/8+ly0octAMhkVTbzwCWf+Kk2wNLWmxWkOa6MHkVjlhBleJgaJk4SjT6XeR+IQMZZJ3eFEdkPxtLaHhpbaQ05+CkV2wXLnm/Jr9FpWUCBEVbU0/27GbHabl7TJ+cpqwsOPeMLfZ9RkmVdGSEtjpjUR+a2Bs1Ga4qV60oZhcghT5rEAOpXgmyV7hUZppCYu1iuKepjr80trYdAH9qImFenBajjwHSQ5q7zXQMkgLGlYiUviZhf8qP97gk0jBECV46nimgfHb+0o3yCXhc5YxAViMqLI/nA4N4O/QAwoHI1dtApqGc+OzkHssRghu9pu5NnwmDdCxHZkFCCz2a5XT5SWIf3Bsv/qKf4L18hRA2TK4psn4SxzPFUhHHUiA+Z7UhdJLg==; RT=\"z=1&dm=nseindia.com&si=9bfbe328-78bd-467c-9e98-c7d2d0021339&ss=m7hqjfe7&sl=1&se=8c&tt=2et&bcn=%2F%2F684d0d46.akstat.io%2F&ld=36w\"; bm_sz=BF536E77A2B971C6941F92DE7B8C8635~YAAQpwxSt/MUTwGVAQAA0VNBMxoYB7tYEjk7q7Tm0G19DuJqwUpL4GKdbJWZVELKhYLuh7mWNFh7rFFDVcX6LomeSmFXEvqBn/tigkUViQmfSuRlTTFr896RTRrYekoDr88qMvx2Yv4/coT4dIvLJP1gCZ7xVrNyfz49MB1mhonV4IhpLtWQoAOOvASH++US59W2joa2yrHuoqIxPvGvSLLbRQmqkf2OU7Znu1tykVgGK+VPdZUfbQbrszlgGswfnSEI7AxxD3YlbkvY1K60foBkARCQxGIlAJ17yV9VzcaXvhSajsNBW4kINfAiQR+HZPtDmGKMrnQKSFEk0TEOl+21uj/TOwH/EHQs+uM2ZeLd4MRKn8hYWBE9hyEcAvX0nbKFW9McQdE9MDTqDmQ6a4FkKnInAPiOlFbV5U+MkXaVs4E=~3556665~3747894; bm_sv=AC589C24A37B4463E61DA3C0C14356EB~YAAQpwxStw4fTwGVAQAAhCFEMxpQ95XuCW96/7zj6cT76LCWhFwnHHsPEu947xky5+ymOlve/TTexCFs1HT4NvCSnlESTD9TM/AgpQHhk1k/pxtLxIF9sF6ahnZRDktNUiXHAbiotAHmxCr72J6X0LlB1PtQ06LWiWG03DiGFhms/HEZNVNrEe32dsNvIwdSUtviczm4GHjo6CQShsfZU5Ecf0r/WvaiIZI5iwcAW9s35j6vkBu3aXghitW7eGH65fb1~1",
                "Referer": "https://www.nseindia.com/api/equity-meta-info?symbol=EXIDEIND",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Company information',
                    data: result
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Error: No company information found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: {
                    error: 'Internal server error',
                    message: error
                }
            });
        }
    }

    async getCompanyStocksWithIndustry(req, res) {
        try {
            const result = await this.StockModal.getCompanyStocksWithIndustry();
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Company stock with industry details',
                    data: result
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Error in getCompanyStocksWithIndustry'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }

    async getdb(req, res) {
        try {
            const result = await this.StockModal.getdb();
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Database details',
                    data: result
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Error: No database details found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = Stock;