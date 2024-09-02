const logme = require('../helper/logme');
const User = require('../models/dbOperation');
const Reports = require('../models/db/reportsModel');
const Fees = require('../models/feesModel');
const Common = require('../helper/common');


class ReportsController {
    constructor() { }

    async stockTxn(req, res) {
        try {
            const txn = req.body;
            let errors = [];
            const requiredFields = [
                'user_id',
                'stock_id',
                'exchange_id',
                'broker_id',
                'txn_date',
                'txn_type',
                'stock_name',
                'stock_price',
                'stock_qty',
                // 'txn_fee',
                'txn_net_amount',
                'txn_status',
            ];
            requiredFields.forEach(field => {
                if (txn[field] === undefined || txn[field] === null || txn[field] === '') {
                    errors.push({
                        type: field,
                        message: `${field} is required`
                    });
                }
            });

            if (errors.length > 0) {
                return res.status(400).json({
                    status: "error",
                    errors: errors
                });
            }

            const txn_id = await Common.generateUniqueId();
            // const stock_id = Common.generateUniqueId();
            const fee_id = await Common.generateUniqueId();
            const today = Common.getTodaysDateWithTime();

            let txnData = {
                "txn_id": txn_id,
                "fee_id": fee_id,
                "user_id": txn.user_id,
                "stock_id": txn.stock_id,
                "exchange_id": txn.exchange_id,
                "broker_id": txn.broker_id,
                "txn_type": txn.txn_type,
                "txn_nature": txn.txn_nature || 'buy',
                "market_type": txn.market_type || 'EQ',
                "instrument_type": txn.instrument_type || 'stock',
                "stock_name": txn.stock_name,
                "stock_price": txn.stock_price,
                "stock_qty": txn.stock_qty,
                "txn_date": txn.txn_date,
                "txn_fee": txn.txn_fee || 0,
                "txn_amount": txn.txn_amount || 0,
                "txn_net_amount": txn.txn_net_amount,
                "txn_status": txn.txn_status,
                "txn_order_number": txn.txn_order_number || 0,
                "txn_trade_number": txn.txn_trade_number || 0,
                "contract_note_number": txn.contract_note_number || 0,
                "trade_date": txn.txn_date,
                "settlement_date_nse_eq": txn.settlement_date_nse_eq || today,
                "settlement_date_nse_fno": txn.settlement_date_nse_fno || today,
                "settlement_date_bse_eq": txn.settlement_date_bse_eq || today,
                "settlement_date_bse_fno": txn.settlement_date_bse_fno || today,
                "settlement_number": txn.settlement_number || 0,
                "txn_remakrs": txn.txn_remakrs || '',
                "txn_info": txn.txn_info || '{}',
            }

            Fees.fno_nifty_fees(txnData).then((result) => {
                if (result.error) {
                    return res.status(500).send({
                        status: 'error',
                        message: result.error
                    });
                }

                // save the fees record
                result.fee_id = fee_id;
                result.txn_id = txn_id;
                result.fee_info = JSON.stringify(txnData.txn_info);

                Reports.addFeeRecord(result).then((feeResult) => {
                    if (feeResult.error) {
                        return res.status(500).send({
                            status: 'error',
                            message: feeResult.error
                        });
                    }
                    // save the txn
                    txnData.txn_info = JSON.stringify(txnData.txn_info);
                    Reports.addTxnRecord(txnData).then((txnResult) => {
                        if (txnResult.error) {
                            return res.status(500).send({
                                status: 'error',
                                message: txnResult.error
                            });
                        }

                        Reports.addTraded_stocks({
                            stock_id: txn.stock_id,
                            txn_id: txn_id,
                            user_id: txn.user_id,
                        }).then((tradedResult) => {
                            if (tradedResult.error) {
                                return res.status(500).send({
                                    status: 'error',
                                    message: tradedResult.error
                                });
                            }

                            res.status(200).json({
                                status: 'success',
                                data: {
                                    txn: txnResult,
                                    fees: result
                                }
                            });
                        }).catch((error) => {
                            logme.error({ message: 'failed to save in traded_stock', data: error });
                            res.status(200).json({
                                status: 'success',
                                data: {
                                    txn: txnResult,
                                    fees: result
                                }
                            });
                        });

                    }).catch((error) => {
                        logme.error({ message: 'failed to save txn record', data: error });
                        res.status(400).json({
                            status: 'error',
                            message: error
                        });
                    });
                }).catch((error) => {
                    logme.error({ message: 'failed to save fees record', data: error });
                    res.status(400).json({
                        status: 'error',
                        message: error
                    });
                });
            }).catch((error) => {
                logme.error({ message: 'failed to calculate fees', data: error });
                res.status(400).json({
                    data: error,
                    status: 'error',
                    message: error
                });
            });

        } catch (error) {
            logme.error({ message: 'stockTxn failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    // monthly expense report
    /**
     * id	user_id	category	amount	start_date	expense_source	recurrence_interval	source_sms_id	expense_info	created_at	updated_at	
     */
    async monthlyExpense(req, res) {
        try {
            const expense = req.body;
            let errors = [];
            const requiredFields = [
                'user_id',
                'category',
                'amount',
                'start_date',
                'recurrence_interval',
            ];
            requiredFields.forEach(field => {
                if (expense[field] === undefined || expense[field] === null || expense[field] === '') {
                    errors.push({
                        type: field,
                        message: `${field} is required`
                    });
                }
            });

            if (errors.length > 0) {
                return res.status(400).json({
                    status: "error",
                    errors: errors
                });
            }

            const expense_id = await Common.generateUniqueId();

            let expenseData = {
                "expense_id": expense_id,
                "user_id": expense.user_id,
                "category": expense.category,
                "amount": expense.amount,
                "start_date": expense.start_date,
                "expense_source": expense.expense_source || 'manual',
                "recurrence_interval": expense.recurrence_interval || 'monthly',
                "source_sms_id": expense.source_sms_id || null,
                "expense_info": expense.expense_info || '{}',
            }

            Reports.addmonthlyExpenseRecord(expenseData).then((result) => {
                if (result.error) {
                    return res.status(500).send({
                        status: 'error',
                        message: result.error
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                });
            }).catch((error) => {
                logme.error({ message: 'failed to save expense record', data: error });
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            });

        } catch (error) {
            logme.error({ message: 'dailyExpense failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    // daily expense report
    async dailyExpense(req, res) {
        try {
            const expense = req.body;
            let errors = [];
            const requiredFields = [
                'user_id',
                'category',
                'amount',
                'date',
            ];
            requiredFields.forEach(field => {
                if (expense[field] === undefined || expense[field] === null || expense[field] === '') {
                    errors.push({
                        type: field,
                        message: `${field} is required`
                    });
                }
            });

            if (errors.length > 0) {
                return res.status(400).json({
                    status: "error",
                    errors: errors
                });
            }

            const expense_id = await Common.generateUniqueId();

            let expenseData = {
                "expense_id": expense_id,
                "user_id": expense.user_id,
                "category": expense.category,
                "amount": expense.amount,
                "date": expense.date,
                "expense_source": expense.expense_source || 'manual',
                "source_sms_id": expense.source_sms_id || null,
                "expense_info": expense.expense_info || '{}',
            }

            Reports.adddailyExpenseRecord(expenseData).then((result) => {
                if (result.error) {
                    return res.status(500).send({
                        status: 'error',
                        message: result.error
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                });
            }).catch((error) => {
                logme.error({ message: 'failed to save expense record', data: error });
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            });

        } catch (error) {
            logme.error({ message: 'monthlyExpense failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }

    // income
    async income(req, res) {
        try {
            const income = req.body;
            let errors = [];
            const requiredFields = [
                'user_id',
                'income_source',
                'amount',
                'income_date',
            ];
            requiredFields.forEach(field => {
                if (income[field] === undefined || income[field] === null || income[field] === '') {
                    errors.push({
                        type: field,
                        message: `${field} is required`
                    });
                }
            });

            if (errors.length > 0) {
                return res.status(400).json({
                    status: "error",
                    errors: errors
                });
            }

            const income_id = await Common.generateUniqueId();

            let incomeData = {
                "income_id": income_id,
                "user_id": income.user_id,
                "income_source": income.income_source,
                "amount": income.amount,
                "income_date": income.income_date,
                "income_info": income.income_info || '{}',
                "source_sms_id": income.source_sms_id || null,
            }

            Reports.addIncomeRecord(incomeData).then((result) => {
                if (result.error) {
                    return res.status(500).send({
                        status: 'error',
                        message: result.error
                    });
                }

                res.status(200).json({
                    status: 'success',
                    data: result
                });
            }).catch((error) => {
                logme.error({ message: 'failed to save income record', data: error });
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            });

        } catch (error) {
            logme.error({ message: 'income failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ReportsController();