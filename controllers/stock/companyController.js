const Company = require('../../models/db/stock/companyModal');

class Companies {
    constructor() {
        this.companies = [];
        this.company = new Company();
    }

    addCompany(req, res) {
        const company = req.body;
        const requiredFields = [
            'company_name',
            'symbol',
            'company_description'
        ];

        for (const field of requiredFields) {
            if (!company[field]) {
                res.status(400).json({
                    message: `${field} is required`
                });
                return;
            }
        }

        this.company.addCompany(company)
            .then(result => {
                if(result.error) {
                    return res.status(400).json(result);
                }
                res.status(201).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    getCompanies(req, res) {
        this.company.getCompanies()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    removeCompany(req, res) {
        const company = req.body;
        this.company.removeCompany(company)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    updateCompany(req, res) {
        const company = req.body;
        this.company.updateCompany(company)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    getCompany(req, res) {
        const company = req.body;
        this.company.getCompanyById(company.company_id) // Updated method name to getCompanyById
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    findCompany(req, res) {
        const name = req.params.name;
        this.company.findCompany(name)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    // Removed getCompanyStocks method as it is not defined in companyModal.js
}

module.exports = Companies;