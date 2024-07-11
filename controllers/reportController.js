const logme = require('../helper/logme');
const User = require('../models/dbOperation');
// const Reports = require('../models/db/reportsModel');
const Common = require('../helper/common');



// -- fee type master table
// CREATE TABLE fee_type_master (
//     fee_id VARCHAR(255) PRIMARY KEY,
//     fee_name VARCHAR(50),
//     fee_type VARCHAR(10),
//     fee_value DECIMAL(10, 2),
//     fee_status VARCHAR(8),
//     fee_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     fee_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// );


// -- stockfees table
// CREATE TABLE stockfees (
//     fee_id VARCHAR(255) PRIMARY KEY,
//     txn_id VARCHAR(255),
//     fee_amount DECIMAL(12, 2),
//     pay_in_out_obligation DECIMAL(12, 2),
//     brokerage DECIMAL(12, 2),
//     exchange_transaction_fee DECIMAL(12, 2),
//     cgst DECIMAL(12, 2),
//     sgst DECIMAL(12, 2),
//     igst DECIMAL(12, 2),
//     utt DECIMAL(12, 2),
//     securities_transaction_tax DECIMAL(12, 2),
//     sebi_turnover_fees DECIMAL(12, 2),
//     stamp_duty DECIMAL(12, 2),
//     ipft_charges DECIMAL(12, 2),
//     net_amount_receivable_payable_by_client DECIMAL(12, 2),
//     gstin_of_trading_member VARCHAR(50),
//     other_charges JSON,
//     fee_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     fee_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// );


// -- stock market transaction report table
// CREATE TABLE stock_market_txn (
//     txn_id VARCHAR(255) PRIMARY KEY,
//     fee_id VARCHAR(255),
//     user_id INT,
//     txn_date DATE,
//     txn_type VARCHAR(4),
//     stock_name VARCHAR(50),
//     stock_price DECIMAL(12, 4),
//     stock_qty INT,
//     txn_fees DECIMAL(12, 2),
//     txn_amount DECIMAL(12, 2),
//     txn_net_amount DECIMAL(12, 2),
//     txn_status VARCHAR(7),
//     txn_source VARCHAR(6),
//     txn_order_number VARCHAR(255),
//     txn_trade_number VARCHAR(255),
//     exchange_name VARCHAR(50),
//     contract_note_number VARCHAR(255),
//     trade_date DATE,
//     settlement_date_nse_eq DATE,
//     settlement_date_bse_eq DATE,
//     settlement_date_nse_fno DATE,
//     settlement_date_bse_fno DATE,
//     settlement_number VARCHAR(255),
//     txn_remarks TEXT,
//     txn_info JSON,
//     txn_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     txn_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     FOREIGN KEY (fee_id) REFERENCES stockfees(fee_id),
//     INDEX idx_usr_id (usr_id),
//     INDEX idx_txn_date (txn_date),
//     INDEX idx_stock_name (stock_name)
// );

// ALTER TABLE `stockfees` ADD CONSTRAINT `transaction_id` FOREIGN KEY (`txn_id`) REFERENCES `stock_market_txn`(`txn_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;



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
                // calculate the fees

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