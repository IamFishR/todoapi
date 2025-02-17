const dbconnection = require('../../config/db');
const Common = require('../../helper/common');


class ReportsModel {
    constructor() {
        this.pool = dbconnection;
        this.tb_fees_records = 'txn_fees_record';
        this.tb_txn_records = 'stock_txn';
        this.tb_stocks = 'stocks';
        this.tbl_sectors = 'sectors_new';
        this.tbl_industry = 'industry_new';
        this.tbl_liveprice = 'live_prices';

        this.tbl_income = 'income';
        this.tbl_monthly_expense = 'monthly_expense';
        this.tbl_daily_expense = 'daily_expense';
    }

    columns = {
        fee_id: {
            type: 'VARCHAR',
            length: 100,
            primaryKey: true
        },
        txn_id: {
            type: 'VARCHAR',
            length: 255
        },
        total_fees: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        total_tax: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        total_net_amount: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        total_amount: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        brokerage: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        stt: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        stamp_duty: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        exchange_transaction_charge: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        sebi_turnover_charge: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        penalty: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        cgst: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        sgst: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        igst: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        utt: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        ipft: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        regulatory_statutory_charges: {
            type: 'DECIMAL',
            length: '10, 2'
        },
        fee_info: {
            type: 'TEXT'
        }
    }

    async addFeeRecord(feeData) {
        const data = feeData;
        try {
            return new Promise((resolve, reject) => {
                const db_data = {
                    "fee_id": data.fee_id,
                    "txn_id": data.txn_id,
                    "total_fees": data.total_fees,
                    "total_tax": data.total_tax,
                    "total_net_amount": data.total_net_amount,
                    "total_amount": data.total_amount,
                    "brokerage": data.breakdown.brokerage,
                    "stt": data.breakdown.stt,
                    "stamp_duty": data.breakdown.stamp_duty,
                    "exchange_transaction_charge": data.breakdown.exchange_transaction_charge,
                    "sebi_turnover_charge": data.breakdown.sebi_turnover_charge,
                    "penalty": data.breakdown.penalty,
                    "cgst": data.breakdown.cgst,
                    "sgst": data.breakdown.sgst,
                    "igst": data.breakdown.igst,
                    "utt": data.breakdown.utt,
                    "ipft": data.breakdown.ipft,
                    "regulatory_statutory_charges": data.breakdown.regulatory_statutory_charges,
                    "fee_info": data.fee_info
                };
                const query = `INSERT INTO ${this.tb_fees_records} SET ?`;
                this.pool.query(query, db_data, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addTxnRecord(txnData) {
        try {
            return new Promise((resolve, reject) => {
                const dt = {
                    "txn_id": txnData.txn_id,
                    "fee_id": txnData.fee_id,
                    "user_id": txnData.user_id,
                    "stock_id": txnData.stock_id,
                    "exchange_id": txnData.exchange_id,
                    "broker_id": txnData.broker_id,
                    "txn_type": txnData.txn_type,
                    "txn_nature": txnData.txn_nature,
                    "market_type": txnData.market_type,
                    "instrument_type": txnData.instrument_type,
                    "stock_name": txnData.stock_name,
                    "stock_price": txnData.stock_price,
                    "stock_qty": txnData.stock_qty,
                    "txn_date": txnData.txn_date,
                    "txn_fee": txnData.txn_fee,
                    "txn_amount": txnData.txn_amount,
                    "txn_net_amount": txnData.txn_net_amount,
                    "txn_status": txnData.txn_status,
                    "txn_order_number": txnData.txn_order_number,
                    "txn_trade_number": txnData.txn_trade_number,
                    "contract_note_number": txnData.contract_note_number,
                    "trade_date": txnData.trade_date,
                    "settlement_date_nse_eq": txnData.settlement_date_nse_eq,
                    "settlement_date_nse_fno": txnData.settlement_date_nse_fno,
                    "settlement_date_bse_eq": txnData.settlement_date_bse_eq,
                    "settlement_date_bse_fno": txnData.settlement_date_bse_fno,
                    "settlement_number": txnData.settlement_number,
                    "txn_remakrs": txnData.txn_remakrs,
                    "txn_info": txnData.txn_info,
                };
                const query = `INSERT INTO ${this.tb_txn_records} SET ?`;
                this.pool.query(query, dt, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async stock_listing(stockData) {
        try {
            return new Promise((resolve, reject) => {

                // check if stock is already listed with symbol
                this.getStockBySymbol(stockData.stock_symbol).then((stockExist) => {
                    if (stockExist.length) {
                        reject({
                            error: 'Stock already listed',
                            message: 'Stock already listed'
                        });
                    }
                    const query = `INSERT INTO ${this.tb_stocks} SET ?`;
                    this.pool.query(query, stockData, (err, result) => {
                        if (err) {
                            if (Common.ErrorMessages[err.code]) {
                                reject({
                                    error: Common.ErrorMessages[err.code],
                                    message: err.message
                                });
                            } else {
                                reject(err.message);
                            }
                        }

                        resolve(result);
                    });
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (error) {
            return error
        }
    }

    async getStockBySymbol(symbol) {
        try {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM ${this.tb_stocks} WHERE stock_symbol = ?`;
                this.pool.query(query, symbol, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addTraded_stocks(txnData) {
        try {
            return new Promise((resolve, reject) => {
                const dt = {
                    "stock_id": txnData.stock_id,
                    "txn_id": txnData.txn_id,
                    "user_id": txnData.user_id,
                };
                const query = `INSERT INTO traded_stock SET ?`;
                this.pool.query(query, dt, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async get_sectors() {
        try {
            return new Promise((resolve, reject) => {
                const query = `SELECT 
                        s.sector_name AS sector,
                        JSON_OBJECTAGG(i.industry_id, i.industry_name) AS industries
                    FROM 
                        sectors_new s
                    JOIN 
                        industry i ON s.id = i.sector
                    GROUP BY 
                        s.sector_name;`;
                this.pool.query(query, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async get_stocks() {
        try {
            return new Promise((resolve, reject) => {
                const query = `SELECT * FROM ${this.tb_stocks}`;
                this.pool.query(query, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async update_stock(stock_symbol, stockData) {
        try {
            return new Promise((resolve, reject) => {
                const query = `UPDATE ${this.tb_stocks} SET ? WHERE stock_symbol = ?`;
                this.pool.query(query, [stockData, stock_symbol], (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addmonthlyExpenseRecord(expenseData) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO ${this.tbl_monthly_expense} SET ?`;
                this.pool.query(query, expenseData, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async adddailyExpenseRecord(expenseData) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO ${this.tbl_daily_expense} SET ?`;
                this.pool.query(query, expenseData, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    // addIncomeRecord
    async addIncomeRecord(incomeData) {
        try {
            return new Promise((resolve, reject) => {
                const query = `INSERT INTO ${this.tbl_income} SET ?`;
                this.pool.query(query, incomeData, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }

                    resolve(result);
                });
            });
        } catch (error) {
            return error;
        }
    }

    async addLivePrice(stockData, totalStockInfo) {
        try {
            // Check if stock exists
            const stockExist = await this.getStockBySymbol(totalStockInfo.livePriceDto.symbol);
            let resp = {
                is_industry_updated: false,
            }

            if (!stockExist.length) {
                throw {
                    error: 'Stock not listed',
                    message: 'Stock not listed'
                };
            }

            const stock = stockExist[0];

            // Update empty fields in stock table
            if (stock.stock_id) {
                const fieldsToUpdate = [];
                const values = [];

                if (!stock.industry || stock.industry === '') {
                    fieldsToUpdate.push('industry = ?');
                    values.push(totalStockInfo.industryCode);
                }
                if (!stock.high_1_year || stock.high_1_year === '') {
                    fieldsToUpdate.push('high_1_year = ?');
                    values.push(totalStockInfo.yearlyHighPrice);
                }
                if (!stock.low_1_year || stock.low_1_year === '') {
                    fieldsToUpdate.push('low_1_year = ?');
                    values.push(totalStockInfo.yearlyLowPrice);
                }
                if (!stock.market_cap || stock.market_cap === '') {
                    fieldsToUpdate.push('market_cap = ?');
                    values.push(totalStockInfo.marketCap);
                }

                if (fieldsToUpdate.length > 0) {
                    const updateQuery = `UPDATE ${this.tb_stocks} SET ${fieldsToUpdate.join(', ')} WHERE stock_id = ?`;
                    values.push(stock.stock_id);

                    await new Promise((resolve, reject) => {
                        this.pool.query(updateQuery, values, (err, result) => {
                            if (err) {
                                if (Common.ErrorMessages[err.code]) {
                                    reject({
                                        error: Common.ErrorMessages[err.code],
                                        message: err.message
                                    });
                                } else {
                                    reject(err.message);
                                }
                            }
                            resp.is_fields_updated = true;
                            resolve(result);
                        });
                    });
                }
            }

            // Insert live price data
            const insertQuery = `INSERT INTO ${this.tbl_liveprice} SET ?`;
            return await new Promise((resolve, reject) => {
                this.pool.query(insertQuery, stockData, (err, result) => {
                    if (err) {
                        if (Common.ErrorMessages[err.code]) {
                            reject({
                                error: Common.ErrorMessages[err.code],
                                message: err.message
                            });
                        } else {
                            reject(err.message);
                        }
                    }
                    result.is_industry_updated = resp.is_industry_updated;
                    resolve(result);
                });
            });

        } catch (error) {
            throw error; // Propagate error to caller
        }
    }

}

module.exports = new ReportsModel();