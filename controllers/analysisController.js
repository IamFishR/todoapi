/**
 * Analyzes stock data and provides a recommendation.
 * Includes functions to calculate financial ratios.
 *
 * @param {object} stockData - An object containing the stock's financial data.
 * @param {number} stockData.marketPrice - Current market price per share.
 * @param {number} stockData.earningsPerShare - Earnings per share (EPS).
 * @param {number} stockData.earningsGrowthRate - Earnings growth rate (percentage).
 * @param {number} stockData.netIncome - Net income.
 * @param {number} stockData.shareholdersEquity - Shareholder's equity.
 * @param {number} stockData.currentAssets - Current assets.
 * @param {number} stockData.inventory - Inventory value.
 * @param {number} stockData.currentLiabilities - Current liabilities.
 *
 * @returns {string} - A recommendation string.
 */
class StockAnalyzer {
    constructor(stockData) {
        this.stockData = stockData;
    }

    analyzeStock() {
        const {
            marketPrice, earningsPerShare, earningsGrowthRate,
            netIncome, shareholdersEquity, currentAssets,
            inventory, currentLiabilities, revenueGrowth
        } = this.stockData;

        // Calculate ratios
        const peRatio = this.calculatePERatio(marketPrice, earningsPerShare);
        const pegRatio = this.calculatePEGRatio(peRatio, earningsGrowthRate);
        const roe = this.calculateROE(netIncome, shareholdersEquity);
        const quickRatio = this.calculateQuickRatio(currentAssets, inventory, currentLiabilities);

        // Check for revenue growth
        if (revenueGrowth < 10) {
            return "Low Revenues Growth";
        }

        // Now use the calculated ratios in your analysis:
        if (peRatio >= 25) {
            return "Likely Overvalued";
        }

        if (pegRatio >= 2) {
            return "Low Profit Growth";
        }

        if (roe < 5) {
            return "Weak Profitability";
        }

        if (quickRatio < 1.5) {
            return "Liquidity Issues";
        }

        return "Invest!";
    }

    calculatePERatio(marketPrice, earningsPerShare) {
        return marketPrice / earningsPerShare;
    }

    calculatePEGRatio(peRatio, earningsGrowthRate) {
        return peRatio / earningsGrowthRate;
    }

    calculateROE(netIncome, shareholdersEquity) {
        return (netIncome / shareholdersEquity) * 100; // Express as a percentage
    }

    calculateQuickRatio(currentAssets, inventory, currentLiabilities) {
        return (currentAssets - inventory) / currentLiabilities;
    }
}

// Example usage:
// const analyzer = new StockAnalyzer(stockData);
// const recommendation = analyzer.analyzeStock();

module.exports = StockAnalyzer;