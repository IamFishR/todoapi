const StockModal = require('../../models/db/stock/stockModal');

class Stock {
    constructor() {
        this.StockModal = new StockModal();
    }

    async getCompanyStocksWithIndustry(req, res) {
        try {
            const result = await this.StockModal.getCompanyStocksWithIndustry();
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Company stock with industry details',
                    data: result
                });
            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Error in getCompanyStocksWithIndustry'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }

    async getdb(req, res) {
        try {
            const result = await this.StockModal.getdb();
            if (result) {
                return res.status(200).json({
                    status: true,
                    message: 'Database details',
                    data: result
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: 'Error: No database details found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error'
            });
        }
    }
}

module.exports = Stock;