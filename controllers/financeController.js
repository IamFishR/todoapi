// const Prompts = require('../services/geminiPrompt');
const logme = require('../helper/logme');
const Common = require('../helper/common');


class InvestmentAllocator {
    constructor(totalInvestment, investmentAreas, years) {
        this.totalInvestment = totalInvestment;
        this.investmentAreas = investmentAreas;
        this.years = years;
    }

    calculateInvestmentAllocation() {
        const allocation = {};
        const investmentPerYear = this.totalInvestment / this.years;

        // Calculate investment amounts for each area
        this.investmentAreas.forEach(area => {
            const allocationPercentage = area.allocationPercentage;
            const minInvestment = (allocationPercentage.min / 100) * investmentPerYear;
            const maxInvestment = (allocationPercentage.max / 100) * investmentPerYear;
            allocation[area.name] = {
                minInvestment,
                maxInvestment
            };
        });

        return allocation;
    }

    calculatePotentialProfit() {
        const potentialProfit = {};

        // Calculate potential profit for each area
        this.investmentAreas.forEach(area => {
            const investmentRange = area.investmentRange;
            const minProfit = (investmentRange.minProfit / 100) * this.totalInvestment;
            const maxProfit = (investmentRange.maxProfit / 100) * this.totalInvestment;
            potentialProfit[area.name] = {
                minProfit,
                maxProfit
            };
        });

        return potentialProfit;
    }
}

class FinanceController {
    constructor() {

    }

    async calculateAllocations(req, res) {
        try {
            const totalInvestment = req.body.totalInvestment;
            const investmentAreas = req.body.investmentAreas;
            const years = req.body.years;

            if (!totalInvestment || !investmentAreas || !years) {
                throw new Error("Total investment, investment areas, and years are required");
            }

            const allocator = new InvestmentAllocator(totalInvestment, investmentAreas, years);
            const allocation = allocator.calculateInvestmentAllocation();
            const potentialProfit = allocator.calculatePotentialProfit();

            res.status(200).json({
                allocation,
                potentialProfit
            });
        } catch (error) {
            logme.error({
                message: error.message
            });
            res.status(400).json({
                error: error.message
            });
        }
    }
}

module.exports = new FinanceController();

// // Example usage:
// const totalInvestment = 40000; // Total investment amount in rupees per month
// const investmentAreas = [
//     {
//         name: 'Equities',
//         allocationPercentage: { min: 40, max: 50 }, // Allocation percentage range for equities
//         investmentRange: { minProfit: 6, maxProfit: 10 } // Potential profit range for equities
//     },
//     // Add other investment areas as needed
// ];
// const years = 3; // Number of years for investment

// const allocator = new InvestmentAllocator(totalInvestment, investmentAreas, years);
// const allocation = allocator.calculateInvestmentAllocation();
// const potentialProfit = allocator.calculatePotentialProfit();

// console.log('Investment Allocation:', allocation);
// console.log('Potential Profit:', potentialProfit);
