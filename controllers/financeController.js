// const Prompts = require('../services/geminiPrompt');
const logme = require('../helper/logme');
const Common = require('../helper/common');


class InvestmentAllocator {
    constructor(totalInvestment, years) {
        this.totalInvestment = totalInvestment;
        this.years = years;
    }

    investmentAreas() {
        return [
            {
                "name": "Indian Equities",
                "allocationPercentage": {
                    "min": 40,
                    "max": 50
                },
                "investmentRange": {
                    "minProfit": 5,
                    "max": 12
                },
                "description": "Invest in stocks of companies listed on Indian stock exchanges (BSE & NSE). Offers high growth potential, but also carries higher risk.",
                "subtypes": {
                    "Large-Cap": {
                        "description": "Focuses on well-established Indian companies with large market capitalization. May offer lower volatility compared to mid-cap and small-cap stocks.",
                        "risk_priority": "Medium"
                    },
                    "Mid-Cap": {
                        "description": "Invests in companies with a medium market capitalization. May offer higher growth potential than large-cap but also carries greater risk.",
                        "risk_priority": "Medium to High"
                    },
                    "Small-Cap": {
                        "description": "Invests in companies with a smaller market capitalization. Offers the potential for high returns, but also carries the highest risk due to factors like lower liquidity and higher growth potential.",
                        "risk_priority": "High"
                    },
                    "Sector-Specific ETFs": {
                        "description": "Exchange-Traded Funds that focus on specific sectors like IT, infrastructure, or banking. Offers targeted exposure to a particular industry segment.",
                        "risk_priority": "Varies depending on the chosen sector (usually Medium to High)"
                    }
                }
            },
            {
                "name": "Real Estate",
                "allocationPercentage": {
                    "min": 20,
                    "max": 30
                },
                "investmentRange": {
                    "minProfit": 3,
                    "max": 5
                },
                "description": "Invest in properties like land, buildings, etc. in India. Offers potential for rental income and long-term appreciation, but can be illiquid and require significant upfront capital.",
                "risk_priority": "Medium to High (Depends on property type and location)"
            },
            {
                "name": "Real Estate Sub-categories",
                "allocationPercentage": {
                    "min": 5,
                    "max": 10
                },
                "investmentRange": {
                    "minProfit": 3,
                    "max": 5
                },
                "description": "Offer diversification within the real estate sector.",
                "subtypes": {
                    "REITs (Real Estate Investment Trusts)": {
                        "description": "Invest in income-generating real estate properties without directly owning them. Offers liquidity and diversification compared to directly owning property.",
                        "risk_priority": "Medium"
                    }
                }
            },
            {
                "name": "Bonds",
                "allocationPercentage": {
                    "min": 10,
                    "max": 20
                },
                "investmentRange": {
                    "minProfit": 2,
                    "max": 4
                },
                "description": "Invest in government or corporate bonds issued in India. Provides regular income and lower risk compared to stocks, but also offers lower potential returns.",
                "risk_priority": "Low (Depends on creditworthiness of issuer)"
            },
            {
                "name": "Debt Instruments",
                "allocationPercentage": {
                    "min": 5,
                    "max": 10
                },
                "investmentRange": {
                    "minProfit": 3,
                    "max": 5
                },
                "description": "Offer fixed income and potential tax benefits.",
                "subtypes": {
                    "Public Provident Fund (PPF)": {
                        "description": "A long-term government savings scheme offering tax benefits and guaranteed returns.",
                        "risk_priority": "Very Low"
                    },
                    "National Pension System (NPS)": {
                        "description": "A voluntary pension scheme offering tax benefits and professionally managed investments.",
                        "risk_priority": "Low to Medium (Depends on chosen investment option within NPS)"
                    }
                }
            },
            {
                "name": "Gold",
                "allocationPercentage": {
                    "min": 5,
                    "max": 10
                },
                "investmentRange": {
                    "minProfit": 2,
                    "max": 5
                },
                "description": "Invest in physical gold or gold ETFs (traded like stocks). Can act as a hedge against inflation but can be less volatile than some other commodities.",
                "risk_priority": "Low to Medium"
            },
            {

                "name": "Alternative Investments",
                "allocationPercentage": {
                    "min": 5,
                    "max": 10
                },
                "investmentRange": {
                    "minProfit": 5,
                    "max": 15
                },
                "description": "Offer potentially higher returns but also carry higher risk.",
                "subtypes": {
                    "Peer-to-Peer (P2P) Lending": {
                        "description": "Invest in loans to individuals or businesses through online platforms. Offers the potential for high returns but also carries the risk of default.",
                        "risk_priority": "High",
                        "how_to_invest": "Several RBI-regulated P2P lending platforms operate in India. Research the platform's track record, interest rates, and risk assessment processes before investing.",
                        "where_to_invest": "Examples of Indian P2P lending platforms include [Bajaj Finserv P2P](https://p2p.bajajfinserv.in/), [Faircent](https://www.faircent.com/), and [LenDenClub](https://www.lenddenclub.com/)."
                    },
                    "Cryptocurrencies": {
                        "description": "Invest in digital currencies like Bitcoin or Ethereum. Offers high growth potential but also carries high volatility and regulatory risks. **Cryptocurrencies are not currently regulated in India**.",
                        "risk_priority": "Very High",
                        "how_to_invest": "Cryptocurrency exchanges allow buying and selling cryptocurrencies. However, due to the unregulated nature in India, exercise extreme caution and only invest what you can afford to lose.",
                        "where_to_invest": "**Use with caution:** Some cryptocurrency exchanges operating in India include [WazirX](https://wazirx.com/) and [CoinDCX](https://coindcx.com/)."
                    },
                    "Startups":
                    {
                        "description": "Invest in early-stage companies. Offers the potential for high returns but also carries the risk of business failure.",
                        "risk_priority": "Very High",
                        "how_to_invest": "Angel investor networks or venture capital firms can connect you with startups. Thorough due diligence and understanding the startup ecosystem are crucial.",
                        "where_to_invest": "Examples of Indian Angel Investor networks include [Indian Angel Network](https://www.indianangelnetwork.com/) and [Mumbai Angels](https://mumbaiangels.com/)."
                    },
                    "Commodities": {
                        "description": "Invest in physical goods like oil, metals, or agricultural products. Offers diversification but can be volatile.",
                        "risk_priority": "Medium to High",
                        "how_to_invest": "Commodities can be indirectly accessed through commodity futures contracts or Exchange Traded Funds (ETFs) traded on Indian stock exchanges.",
                        "where_to_invest": "Indian stock exchanges like NSE and BSE offer commodity derivatives trading."
                    },
                    "Art and Collectibles": {
                        "description": "Invest in art, antiques, or other collectible items. Offers the potential for appreciation but can be illiquid and require expertise.",
                        "risk_priority": "Medium to High",
                        "how_to_invest": "In-depth knowledge and experience are recommended. Consider auctions, reputable galleries, or consulting art advisors.",
                        "where_to_invest": "Auction houses like Sotheby's or Christie's may hold auctions in India. Consulting art galleries or advisors can be helpful."
                    },
                    "Real Assets": {
                        "description": "Invest in tangible assets like farmland, timberland, or infrastructure. Offers diversification and potential inflation protection.",
                        "risk_priority": "Medium",
                        "how_to_invest": "Investing directly can be complex. Consider specialized funds or Alternative Investment Funds (AIFs) that focus on real assets.",
                        "where_to_invest": "Some Indian AIFs may offer exposure to real assets. Consult a financial advisor for suitable options."
                    },
                    "Private Equity": {
                        "description": "Invest in private companies or projects. Offers the potential for high returns but also carries illiquidity and business risk.",
                        "risk_priority": "Very High",
                        "how_to_invest": "Private equity investments are typically available only to high net-worth individuals or institutions. Consider investing through AIFs that focus on private equity.",
                        "where_to_invest": "AIFs managed by reputable firms may offer private equity exposure. Consult a financial advisor familiar with AIFs."
                    },
                    "Venture Capital": {
                        "description": "Invest in early-stage startups. Offers the potential for high returns but also carries high risk due to business failure.",
                        "risk_priority": "Very High",
                        "how_to_invest": "Venture capital investments are typically available only to accredited investors. Consider investing through venture capital firms or angel networks.",
                        "where_to_invest": "Venture capital firms and angel networks can connect you with startups. Due diligence and understanding the startup ecosystem are crucial."
                    },
                    "Hedge Funds": {
                        "description": "Invest in pooled funds that use various strategies to generate returns. Offers diversification but can be complex and illiquid.",
                        "risk_priority": "Medium to High",
                        "how_to_invest": "Hedge funds are typically not accessible to retail investors due to high minimum investment requirements. Consider funds of hedge funds (FOFs) that offer broader exposure.",
                        "where_to_invest": "Some mutual funds in India may offer FOF options investing in a basket of hedge funds. Consult a financial advisor for suitable choices."
                    },
                    "Structured Products": {
                        "description": "Invest in complex financial products with customized risk-return profiles. Offers tailored exposure but can be difficult to understand.",
                        "risk_priority": "Medium to High",
                        "how_to_invest": "Structured products are complex and may not be suitable for all investors. Consult a qualified financial advisor with expertise in structured products before investing.",
                        "where_to_invest": "Not all investment houses offer structured products in India. It's advisable to consult a financial advisor for suitable options."
                    }
                }

            }
        ];
    }

    calculateInvestmentAllocation() {
        const investmentAreas = this.investmentAreas();
        const allocation = {};

        // Calculate the allocation for each area based on the total investment amount
        investmentAreas.forEach(area => {
            const minAllocation = (this.totalInvestment * area.allocationPercentage.min) / 100;
            const maxAllocation = (this.totalInvestment * area.allocationPercentage.max) / 100;

            allocation[area.name] = {
                min: minAllocation,
                max: maxAllocation
            };
        });

        // calculate total investment
        let totalInvestmentc = {}
        for (const area in allocation) {
            // minTotalInvestment += (allocation[area].min * 12) * this.years;
            // maxTotalInvestment += (allocation[area].max * 12) * this.years;
            const min = (allocation[area].min * 12) * this.years;
            const max = (allocation[area].max * 12) * this.years;
            totalInvestmentc[area] = {
                min: min,
                max: max
            }
        }

        return {
            years: this.years,
            totalInvestment: totalInvestmentc,
            allocationPerMonth: allocation,
            // yearlyAllocation,
            // investmentPrediction
        };
    }
}

class FinanceController {
    constructor() {

    }

    async calculateAllocations(req, res) {
        try {
            const totalInvestment = req.body.investmentpermonth;
            const years = req.body.years;

            if (!totalInvestment || !years) {
                throw new Error("Total investment, investment areas, and years are required");
            }

            const allocator = new InvestmentAllocator(totalInvestment, years);
            const allocation = allocator.calculateInvestmentAllocation();
            // const potentialProfit = allocator.calculatePotentialProfit();

            res.status(200).json(allocation);
        } catch (error) {
            logme.error({
                message: error.message
            });
            res.status(400).json({
                error: error.message
            });
        }
    }

    async getInvestmentAreas(req, res) {
        try {
            const allocator = new InvestmentAllocator();
            const investmentAreas = allocator.investmentAreas();

            res.status(200).json(investmentAreas);
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