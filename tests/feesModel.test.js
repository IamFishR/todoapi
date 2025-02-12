const Fees = require('../models/feesModel');
const assert = require('assert');

describe('Fees Model', function() {
    let fees;

    before(function() {
        fees = new Fees();
    });

    describe('fno_nifty_fees', function() {
        it('should calculate Nifty FNO fees correctly for buy transactions', async function() {
            const txnData = {
                txn_type: 'buy',
                instrument_type: 'futures',
                txn_nature: 'intraday',
                stock_qty: 100,
                stock_price: 1500,
                market_type: 'NSE',
                exchange_name: 'nse'
            };

            const result = await fees.fno_nifty_fees(txnData);
            console.log(result);
            assert(result.total_fees > 0, 'Total fees should be greater than 0');
            assert(result.total_net_amount > 0, 'Total net amount should be greater than 0');
        });

        it('should calculate Nifty FNO fees correctly for sell transactions', async function() {
            const txnData = {
                txn_type: 'sell',
                instrument_type: 'futures',
                txn_nature: 'intraday',
                stock_qty: 100,
                stock_price: 1500,
                market_type: 'NSE',
                exchange_name: 'nse'
            };

            const result = await fees.fno_nifty_fees(txnData);
            assert(result.total_fees > 0, 'Total fees should be greater than 0');
            assert(result.total_net_amount > 0, 'Total net amount should be greater than 0');
        });
    });
});
