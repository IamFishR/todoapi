const logme = require('../helper/logme');
const User = require('../models/dbOperation');
const Reports = require('../models/db/reportsModel');
const Fees = require('../models/feesModel');
const Common = require('../helper/common');


class Stocks {
    constructor() { }
    async addStock(req, res) {
        //     `stock_id` VARCHAR(100) PRIMARY KEY,
        // `stock_symbol` VARCHAR(255),
        // `stock_name` VARCHAR(255),
        // `display_name` VARCHAR(255),
        // `exchange` VARCHAR(255),
        // `sector` VARCHAR(255),
        // `industry` VARCHAR(255),
        // `stock_currency` VARCHAR(255),
        // `stock_status` VARCHAR(255),
        // `day_rsi_14_current_candle` DECIMAL(10, 2),
        // `day_sma_200_current_candle` DECIMAL(10, 2),
        // `day_sma_50_current_candle` DECIMAL(10, 2),
        // `divident_yeild` DECIMAL(10, 2),
        // `eps` DECIMAL(10, 2),
        // `high_1_year` DECIMAL(10, 2),
        // `industry_pe` DECIMAL(10, 2),
        // `instrument` VARCHAR(255),
        // `isin` VARCHAR(255),
        // `lot_size` INT,
        // `low_1_year` DECIMAL(10, 2),
        // `ltp` DECIMAL(10, 2),
        // `market_cap` DECIMAL(10, 2),
        // `net_profit_margin` DECIMAL(10, 2),
        // `percent_change` DECIMAL(10, 2),
        // `percent_change_1_year` DECIMAL(10, 2),
        // `percent_change_3_year` DECIMAL(10, 2),
        // `percent_change_5_year` DECIMAL(10, 2),
        // `pe` DECIMAL(10, 2),
        // `revenue` DECIMAL(10, 2),
        // `segment` VARCHAR(255),
        // `seo_symbol` VARCHAR(255),
        // `symbol_id` INT,
        // `tick_size` DECIMAL(10, 2),
        // `volume` BIGINT,
        // `year_1_roce` DECIMAL(10, 2),
        // `year_1_roe` DECIMAL(10, 2),
        // `year_1_revenue_growth` DECIMAL(10, 2),
        // `yoy_last_quarterly_profit_growth` DECIMAL(10, 2),
        try {
            const stock = req.body;
            let errors = [];
            const requiredFields = [
                'stock_symbol',
                'stock_name',
                'display_name',
                'exchange',
                'sector',
                'stock_currency',
                'instrument',
                'isin',
            ];
            requiredFields.forEach(field => {
                if (!stock[field]) {
                    errors.push({
                        type: field,
                        message: `${field} is required`
                    });
                }
            });

            if (errors.length) {
                return res.status(400).send({
                    status: 'error',
                    message: errors
                });
            }

            this.getStockBySymbol(stock.stock_symbol).then(async (stockData) => {
                if (stockData.length > 0) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'Stock already exists'
                    });
                }

                const data = {
                    'stock_id': Common.generateId(),
                    "stock_symbol": stock.stock_symbol,
                    "stock_name": stock.stock_name,
                    "display_name": stock.display_name || stock.stock_name.replace(/_/g, ' '),
                    "exchange": stock.exchange || 'NSE',
                    "sector": stock.sector || 'N/A',
                    "industry": stock.industry || 'N/A',
                    "stock_currency": stock.stock_currency || 'INR',
                    "stock_status": stock.stock_status || 'active',
                    "day_rsi_14_current_candle": stock.day_rsi_14_current_candle || 0,
                    "day_sma_200_current_candle": stock.day_sma_200_current_candle || 0,
                    "day_sma_50_current_candle": stock.day_sma_50_current_candle || 0,
                    "divident_yeild": stock.divident_yeild || 0,
                    "eps": stock.eps || 0,
                    "high_1_year": stock.high_1_year || 0,
                    "industry_pe": stock.industry_pe || 0,
                    "instrument": stock.instrument || 'EQ',
                    "isin": stock.isin || 'N/A',
                    "lot_size": stock.lot_size || 1,
                    "low_1_year": stock.low_1_year || 0,
                    "ltp": stock.ltp || 0,
                    "market_cap": stock.market_cap || 0,
                    "net_profit_margin": stock.net_profit_margin || 0,
                    "percent_change": stock.percent_change || 0,
                    "percent_change_1_year": stock.percent_change_1_year || 0,
                    "percent_change_3_year": stock.percent_change_3_year || 0,
                    "percent_change_5_year": stock.percent_change_5_year || 0,
                    "pe": stock.pe || 0,
                    "revenue": stock.revenue || 0,
                    "segment": stock.segment || 'N/A',
                    "seo_symbol": stock.seo_symbol || 'N/A',
                    "symbol_id": stock.symbol_id || 0,
                    "tick_size": stock.tick_size || 0,
                    "volume": stock.volume || 0,
                    "year_1_roce": stock.year_1_roce || 0,
                    "year_1_roe": stock.year_1_roe || 0,
                    "year_1_revenue_growth": stock.year_1_revenue_growth || 0,
                    "yoy_last_quarterly_profit_growth": stock.yoy_last_quarterly_profit_growth || 0
                };

                Reports.stock_listing(data).then((resp) => {
                    if (resp.error) {
                        return res.status(400).send({
                            status: 'error',
                            message: resp
                        });
                    }

                    
                })
            }).catch((error) => { });

        } catch (error) {
            logme("error", error);
            return res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new Stocks();