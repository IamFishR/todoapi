const logme = require('../helper/logme');
const User = require('../models/dbOperation');
const Reports = require('../models/db/reportsModel');
const Fees = require('../models/feesModel');
const Common = require('../helper/common');


class Stocks {
    constructor() { }
    async addStock(req, res) {
        try {
            let stock = req.body;
            let errors = [];
            if (Object.prototype.toString.call(stock) == '[object Object]') {
                stock = [stock];
            }
            const requiredFields = [
                'stock_symbol',
                'stock_name',
                // 'exchange',
                // 'sector',
                // 'stock_currency',
                // 'instrument',
                // 'isin',
            ];

            stock.forEach((stock) => {
                requiredFields.forEach((field) => {
                    if (!stock[field]) {
                        errors.push({
                            field: field,
                            message: 'This field is required',
                            count: errors.length + 1
                        });
                    }
                });
            });

            if (errors.length) {
                return res.status(400).send({
                    status: 'error',
                    message: errors
                });
            }

            let alreadyExist = [];
            let results = [];
            stock.forEach(async (stock) => {
                const id = await Common.generateUniqueId();
                let stockData = {
                    'stock_id': id,
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
                    "series": stock.series || 'EQ',
                    "date_of_listing": stock.date_of_listing || 'N/A',
                    "paid_up_value": stock.paid_up_value || 0,
                    "market_lot": stock.market_lot || 0,
                    "face_value": stock.face_value || 0,
                    "symbol_id": stock.symbol_id || 0,
                    "tick_size": stock.tick_size || 0,
                    "volume": stock.volume || 0,
                    "year_1_roce": stock.year_1_roce || 0,
                    "year_1_roe": stock.year_1_roe || 0,
                    "year_1_revenue_growth": stock.year_1_revenue_growth || 0,
                    "yoy_last_quarterly_profit_growth": stock.yoy_last_quarterly_profit_growth || 0
                }

                Reports.stock_listing(stockData).then((result) => {
                    if (result.error) {
                        alreadyExist.push(stock.stock_symbol);
                    }
                    results.push(result);
                    if (results.length == stock.length) {
                        return res.status(200).send({
                            status: 'success',
                            message: 'Stock added successfully',
                            data: results,
                            alreadyExist: alreadyExist
                        });
                    }
                }).catch((error) => {
                    logme("error", error);
                    return res.status(500).send({
                        status: 'error',
                        message: 'Internal server error'
                    });
                });
            });

        } catch (error) {
            logme("error", error);
            return res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }

    async getSectors(req, res) {
        try {
            const sectors = await Reports.get_sectors();
            return res.status(200).send({
                status: 'success',
                data: sectors
            });
        } catch (error) {
            // logme.error(error);
            return res.status(500).send({
                status: 'error',
                message: 'Internal server error'
            });
        }
    }
}

module.exports = new Stocks();