const SentimentDBOperations = require('./sentimentDbOperations');

class SentimentOperation {
    constructor() {
        this.sentimentDb = new SentimentDBOperations();

        this.logic = {
            "sentimentAnalysisPoints": [
                {
                    "point": "FII vs. DII Activity",
                    "url": "https://www.cdslindia.com/Publications/ForeignPortInvestor.html",
                    "description": "Monitor the buying and selling activity of Foreign Institutional Investors (FIIs) and Domestic Institutional Investors (DIIs). A scenario where DIIs are buying more than FIIs are selling but the market is still declining could indicate underlying negative sentiment or external pressures.",
                    "implementation": "Track daily or weekly net buying/selling by FIIs and DIIs. Use this data to assess sentiment, where a higher DII buying with a falling market might suggest a contrarian opportunity or increased risk."
                },
                {
                    "point": "Impact of Large Cap Selling",
                    "description": "Pay attention to which stocks FIIs are selling, particularly index heavyweights like HDFC Bank, ICICI Bank. Their selling can directly influence market indices.",
                    "implementation": "Integrate data on FII transactions in large-cap stocks with their weight in indices like Nifty or Sensex. Significant selling might signal bearish market sentiment."
                },
                {
                    "point": "Speed of Buying/Selling",
                    "description": "Consider the speed at which FIIs are selling versus the gradual buying by DIIs. Aggressive selling by FIIs can trigger liquidity issues, whereas slow DII buying might not counteract this immediately.",
                    "implementation": "Analyze transaction frequency and volume changes to gauge the urgency of market movements. Adjust sentiment scores where rapid FII selling might lower sentiment."
                },
                {
                    "point": "Global Economic Factors",
                    "description": "Evaluate how global economic indicators like the US Dollar Index (DXY), US bond yields, and geopolitical events might influence FII outflows from India.",
                    "implementation": "Incorporate real-time data feeds for global economic indicators and geopolitical news. Use these to adjust sentiment based on potential capital outflows."
                },
                {
                    "point": "Valuation of Mid & Small Caps",
                    "description": "The correction in mid and small caps due to overheated valuations and regulatory crackdowns can provide insights into market health.",
                    "implementation": "Monitor PE ratios of mid and small-cap indices against historical averages. A significant deviation might suggest a sentiment shift."
                },
                {
                    "point": "Economic Indicators",
                    "description": "Consider India's economic health through GDP growth, inflation rates, and RBI's monetary policies. Economic slowdown or inflation changes can affect investor confidence.",
                    "implementation": "Use economic data APIs to fetch latest figures and adjust sentiment based on trends like declining GDP growth."
                },
                {
                    "point": "Market Technicals",
                    "description": "Technical breakdowns like breaking key support levels in indices indicate a shift in market structure and sentiment.",
                    "implementation": "Integrate technical analysis tools to alert on key level breaches, which can directly influence sentiment."
                },
                {
                    "point": "Reversal Triggers",
                    "description": "Look for signs of market bottoming out or recovery through indicators like slowing down of FII selling, stabilization of US bond yields, Dollar Index cooling off, INR stabilization, and shifts in DII buying patterns.",
                    "implementation": "Set up algorithms to detect these conditions, signaling a potential positive sentiment shift."
                },
                {
                    "point": "Retail Investor Behavior",
                    "description": "Retail investor reactions, especially through SIP inflows or cancellations, reflect broader market sentiment among individual investors.",
                    "implementation": "Track retail investment trends via mutual fund data or brokerage platforms. An increase in SIP inflows could signal returning confidence."
                },
                {
                    "point": "Overall Market Sentiment",
                    "description": "Aggregate all these factors to provide a composite sentiment score, considering that market sentiment is a complex amalgamation of various influences.",
                    "implementation": "Develop a scoring system or machine learning model that weights these factors based on historical impact, providing a nuanced view for decision-making."
                }
            ]
        };
    }
    async analyzeActivity(fiiData, diiData) {
        if (!fiiData || !diiData) {
            return { strength: "unknown", message: "FII/DII data not found" };
        }
        const fiiStrength = this.evaluateFiiStrength(fiiData);
        const diiStrength = this.evaluateDiiStrength(diiData);

        // who is stronger
        const stronger = this.compareStrengths(fiiStrength, diiStrength);
        const result =  {
            fii: fiiStrength,
            dii: diiStrength,
            stronger: stronger,
            message: "FII/DII activity analyzed"
        };

        // Save to database
        // enum('DII', 'FII/FPI')
        // enum('positive', 'negative', 'neutral')
        let data = {
            date: new Date(fiiData.date),
            dii_buy_value: parseFloat(diiData.buyValue),
            dii_sell_value: parseFloat(diiData.sellValue),
            dii_net_value: parseFloat(diiData.netValue),
            dii_strength: diiStrength.strength,
            fii_buy_value: parseFloat(fiiData.buyValue),
            fii_sell_value: parseFloat(fiiData.sellValue),
            fii_net_value: parseFloat(fiiData.netValue),
            fii_strength: fiiStrength.strength,
            stronger_entity: result.stronger.stronger === 'fii' ? 'FII/FPI' : 'DII',
            stronger_message: stronger.message
        };


        if (!data.date || !data.dii_buy_value || !data.dii_sell_value || 
            !data.dii_net_value || !data.fii_buy_value || !data.fii_sell_value || 
            !data.fii_net_value) {
            // throw new Error("Missing required data fields for market activity.");
            return { strength: "unknown", message: "Missing required data fields for market activity." };
        }


        const _dt = await this.sentimentDb.insertMarketActivity(data);
        if(_dt.affectedRows > 0) {
            return {
                ...result,
                message: "FII/DII activity analyzed and saved"
            }
        } else {
            return {
                ...result,
                message: "FII/DII activity analyzed but not saved"
            };
        }
    }

    evaluateFiiStrength(fiiData) {
        if (!fiiData) {
            return { strength: "unknown", message: "FII data not found" };
        }
        const netValue = parseFloat(fiiData.netValue);
        return {
            date: fiiData.date,
            netValue: netValue,
            strength: this.calculateStrength(netValue)
        };
    }

    evaluateDiiStrength(diiData) {
        if (!diiData) {
            return { strength: "unknown", message: "DII data not found" };
        }
        const netValue = parseFloat(diiData.netValue);
        return {
            date: diiData.date,
            netValue: netValue,
            strength: this.calculateStrength(netValue)
        };
    }

    calculateStrength(netAmount) {
        if (netAmount > 0) {
            return 'positive';
        } else if (netAmount < 0) {
            return 'negative';
        } else {
            return 'neutral';
        }
    }

    compareStrengths(fiiStrength, diiStrength) {
        if (fiiStrength.strength === 'unknown' || diiStrength.strength === 'unknown') {
            return { stronger: 'unknown', difference: 'unknown' };
        }

        const totalNetValue = Math.abs(fiiStrength.netValue) + Math.abs(diiStrength.netValue);
        const differencePercentage = ((Math.abs(fiiStrength.netValue - diiStrength.netValue) / totalNetValue) * 100).toFixed(2);

        let stronger;
        if (fiiStrength.strength === 'positive' && diiStrength.strength === 'positive') {
            stronger = fiiStrength.netValue > diiStrength.netValue ? 'fii' : 'dii';
        } else if (fiiStrength.strength === 'negative' && diiStrength.strength === 'negative') {
            stronger = fiiStrength.netValue < diiStrength.netValue ? 'fii' : 'dii';
        } else {
            stronger = fiiStrength.strength === 'positive' ? 'fii' : 'dii';
        }

        // it should form a sentence which says who is buying more or selling more and by how much percentage
        let message = `${stronger} is ${fiiStrength.netValue > diiStrength.netValue ? 'buying' : 'selling'} more by ${differencePercentage}%`;
        return { stronger: stronger, message: message };
    }
}

module.exports = SentimentOperation;