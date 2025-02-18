const e = require('express');
const IndustryModal = require('../../models/db/stock/industrysectorModal');

class IndustrySector {
    constructor() {
        this.industrySector = new IndustryModal();
    }

    addbulkIndustry(req, res) {
        const industries = req.body;
        this.industrySector.addbulkIndustry(industries)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    getAllIndustries(req, res) {
        this.industrySector.getAllIndustries()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }
}

module.exports = IndustrySector;