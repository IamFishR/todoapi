const SentimentOperation = require('../../models/db/stock/sentimentModal');

class StockSentimentAnalyzer {
    constructor() {
        this.sentimentModel = new SentimentOperation();
    }

    analyzeSentiment() {
        const economicIndicators = this.evaluateEconomicIndicators();
        const marketTrends = this.evaluateMarketTrends();
        const companyFactors = this.evaluateCompanyFactors();
        const marketSentiment = this.evaluateMarketSentiment();
        const macroeconomicFactors = this.evaluateMacroeconomicFactors();
        const riskTolerance = this.evaluateRiskTolerance();
        const timeHorizon = this.evaluateTimeHorizon();
        const regulatoryChanges = this.evaluateRegulatoryChanges();
        const newsEvents = this.evaluateNewsEvents();

        return this.makeDecision({
            economicIndicators,
            marketTrends,
            companyFactors,
            marketSentiment,
            macroeconomicFactors,
            riskTolerance,
            timeHorizon,
            regulatoryChanges,
            newsEvents
        });
    }

    evaluateEconomicIndicators() {
        const { interestRates, inflation, gdpGrowth } = this.economicData;
        return { interestRates, inflation, gdpGrowth };
    }

    evaluateMarketTrends() {
        const { marketState, movingAverages } = this.marketData;
        return { marketState, movingAverages };
    }

    evaluateCompanyFactors() {
        const { revenue, profitMargins, debtLevels, dividendPolicies } = this.stockData;
        return { revenue, profitMargins, debtLevels, dividendPolicies };
    }

    evaluateMarketSentiment() {
        const { newsImpact, marketTrends } = this.marketData;
        return { newsImpact, marketTrends };
    }

    evaluateMacroeconomicFactors() {
        const { governmentPolicies, tradeBalances, geopoliticalEvents } = this.economicData;
        return { governmentPolicies, tradeBalances, geopoliticalEvents };
    }

    evaluateRiskTolerance() {
        const { riskPreference } = this.userPreferences;
        return { riskPreference };
    }

    evaluateTimeHorizon() {
        const { investmentStrategy } = this.userPreferences;
        return { investmentStrategy };
    }

    evaluateRegulatoryChanges() {
        const { regulatoryImpact } = this.economicData;
        return { regulatoryImpact };
    }

    evaluateNewsEvents() {
        const { newsEvents } = this.marketData;
        return { newsEvents };
    }

    makeDecision(factors) {
        return "Decision based on combined factors";
    }

    async analyzeFiiDiiActivity(req, res) {
        // https://www.nseindia.com/reports/fii-dii
        const fiiData = req.body.find(data => data.category === "FII/FPI *");
        const diiData = req.body.find(data => data.category === "DII **");
        const result = await this.sentimentModel.analyzeActivity(fiiData, diiData);


        if (result.strength === "unknown") {
            return res.status(400).json({ message: result.message });
        }

        res.status(200).json(result);
    }
    // Controller function in, e.g., fiiController.js
    explainFiiDataStats(req, res) {
        try {
            const data = req.body;

            // Validate input structure
            if (
                !data ||
                !data.Sector ||
                !data["AUC as on January 15, 2025"] ||
                !data["AUC as on January 31, 2025"] ||
                !data["Net Investment January 01-15, 2025"] ||
                !data["Net Investment January 16-31, 2025"]
            ) {
                return res.status(400).json({ error: "Invalid input data" });
            }

            const sector = data.Sector;

            // Extract AUC values
            const startAucINR = data["AUC as on January 15, 2025"]["INR Cr."];
            const endAucINR = data["AUC as on January 31, 2025"]["INR Cr."];
            const startAucUSD = data["AUC as on January 15, 2025"]["USD Mn"];
            const endAucUSD = data["AUC as on January 31, 2025"]["USD Mn"];

            // Calculate differences and percentage changes for AUC
            const diffAucINR = endAucINR - startAucINR;
            const diffAucUSD = endAucUSD - startAucUSD;
            const percentChangeINR = (diffAucINR / startAucINR) * 100;
            const percentChangeUSD = (diffAucUSD / startAucUSD) * 100;

            // Extract net investment values for each period
            const netInvest1INR = data["Net Investment January 01-15, 2025"]["INR Cr."];
            const netInvest1USD = data["Net Investment January 01-15, 2025"]["USD Mn"];
            const netInvest2INR = data["Net Investment January 16-31, 2025"]["INR Cr."];
            const netInvest2USD = data["Net Investment January 16-31, 2025"]["USD Mn"];

            // Build the dynamic explanation text
            let explanation = `For the ${sector} sector:\n\n`;
            explanation += `1. **Assets Under Custody (AUC):**\n`;
            explanation += `   - On January 15, 2025, AUC was INR ${startAucINR} crore and USD ${startAucUSD} million.\n`;
            explanation += `   - By January 31, 2025, AUC changed to INR ${endAucINR} crore and USD ${endAucUSD} million.\n`;
            explanation += `   - This is a ${diffAucINR >= 0 ? "rise" : "decline"} of INR ${Math.abs(diffAucINR)} crore (${Math.abs(percentChangeINR).toFixed(2)}%) `;
            explanation += `and a ${diffAucUSD >= 0 ? "rise" : "decline"} of USD ${Math.abs(diffAucUSD)} million (${Math.abs(percentChangeUSD).toFixed(2)}%).\n\n`;

            explanation += `2. **Net Investments:**\n`;
            explanation += `   - Between January 01-15, 2025, net investment was INR ${netInvest1INR} crore and USD ${netInvest1USD} million, `;
            explanation += `${netInvest1INR < 0 || netInvest1USD < 0 ? "indicating an outflow" : "indicating an inflow"}.\n`;
            explanation += `   - From January 16-31, 2025, net investment was INR ${netInvest2INR} crore and USD ${netInvest2USD} million, `;
            explanation += `${netInvest2INR < 0 || netInvest2USD < 0 ? "showing further outflow" : "showing additional inflow"}.\n\n`;

            explanation += `**Overall Analysis:**\n`;
            // Determine overall sentiment based on net investment data
            if (netInvest1INR < 0 && netInvest2INR < 0) {
                explanation += `The data indicates that FIIs have been withdrawing funds from this sector during January 2025. `;
                explanation += `The decline in AUC along with consecutive negative net investments reflects a bearish sentiment or cautious outlook among foreign investors.`;
            } else if (netInvest1INR > 0 && netInvest2INR > 0) {
                explanation += `The data indicates that FIIs are adding to their investments in this sector, reflecting a bullish or optimistic sentiment.`;
            } else {
                explanation += `The net investment figures are mixed, which may suggest a period of transition or uncertainty among FIIs regarding this sector.`;
            }

            return res.json({ explanation });
        } catch (error) {
            console.error("Error in explainFiiDataStats:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

}

module.exports = StockSentimentAnalyzer;
