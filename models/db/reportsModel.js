const dbconnection = require('../../config/db');
const Common = require('../../helper/common');


class ReportsModel {
    constructor() {
        this.pool = dbconnection;
        this.tb_fees_records = 'txn_fees_record';
        this.tb_txn_records = 'stock_txn';
        this.tb_stocks = 'stocks';
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
}

module.exports = new ReportsModel();