const logme = require('../helper/logme');
const User = require('../models/dbOperation');
// const Reports = require('../models/db/reportsModel');
const Fees = require('../models/feesModel');
const Common = require('../helper/common');


class ReportsController {
    constructor() { }
    async stockTxn(req, res) {
        try {
            const txn = req.body;
            let errors = [];
            const requiredFields = ['user_id', 'txn_date', 'txn_type', 'stock_name', 'stock_price', 'stock_qty', 'txn_fees', 'txn_amount', 'txn_net_amount', 'txn_status', 'txn_source', 'exchange_name', 'trade_date', 'settlement_date_nse_eq', 'settlement_date_bse_eq', 'settlement_date_nse_fno'];
            requiredFields.forEach(field => {
                if (!txn[field]) {
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

            User.getUserById(txn.user_id).then((user) => {
                if (user.error) {
                    return res.status(400).send({
                        status: 'error',
                        message: 'User not found'
                    });
                }
                const txn_id = Common.generateUniqueId();
                let txnData = {
                    txn_id: Common.generateUniqueId(),
                    fee_id: 'calculation_in_progress',
                    user_id: txn.user_id,
                    txn_date: txn.txn_date,
                    txn_type: txn.txn_type,
                    stock_name: txn.stock_name,
                    stock_price: txn.stock_price,
                    stock_qty: txn.stock_qty,
                    txn_fees: txn.txn_fees,
                    txn_amount: txn.txn_amount,
                    txn_net_amount: txn.txn_net_amount,
                    txn_status: txn.txn_status,
                    txn_source: txn.txn_source,
                    txn_order_number: txn.txn_order_number,
                    txn_trade_number: txn.txn_trade_number,
                    exchange_name: txn.exchange_name,
                    contract_note_number: txn.contract_note_number,
                    trade_date: txn.trade_date,
                    settlement_date_nse_eq: txn.settlement_date_nse_eq,
                    settlement_date_bse_eq: txn.settlement_date_bse_eq,
                    settlement_date_nse_fno: txn.settlement_date_nse_fno,
                    settlement_date_bse_fno: txn.settlement_date_bse_fno,
                    settlement_number: txn.settlement_number,
                    txn_remarks: txn.txn_remarks,
                    txn_info: txn.txn_info
                };
                // calculate the fees
                Fees.fno_nifty_fees(txnData).then((result) => {
                    return res.status(200).json({
                        status: 'success',
                        result: result
                    });
                }).catch((error) => { });


                Reports.stockTxn(txn).then((result) => {
                    if (result.error) {
                        return res.status(500).send({
                            status: 'error',
                            message: result.error
                        });
                    }
                    res.status(200).json({
                        status: 'success',
                        result: result
                    });
                }).catch((error) => {
                    res.status(400).json({
                        status: 'error',
                        message: error
                    });
                });
            });

        } catch (error) {
            logme.error({ message: 'stockTxn failed', data: error });
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = new ReportsController();