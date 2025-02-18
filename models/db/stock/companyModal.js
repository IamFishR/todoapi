/**
 * @file companyModal.js
 * @description Model for interacting with the `companies` table in the database.
 * 
 * CREATE TABLE `companies` (
 *   `company_id` int NOT NULL AUTO_INCREMENT,
 *   `company_name` varchar(255) COLLATE utf8mb4_swedish_ci NOT NULL,
 *   `stock_id` varchar(100) COLLATE utf8mb4_swedish_ci NOT NULL,
 *   `industry_id` int NOT NULL,
 *   `company_description` text COLLATE utf8mb4_swedish_ci,
 *   `company_website` varchar(255) COLLATE utf8mb4_swedish_ci DEFAULT NULL,
 *   `company_logo` varchar(255) COLLATE utf8mb4_swedish_ci DEFAULT NULL,
 *   `notes` json DEFAULT NULL,
 *   PRIMARY KEY (`company_id`),
 *   KEY `industry_id` (`industry_id`),
 *   CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`industry_id`)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;
 * 
 * @class CompanyModal
 * @classdesc This class provides methods to interact with the `companies` table.
 * @property {object} pool - The database connection pool.
 * @property {string} tbl_company - The name of the table (`companies`).
 */
// revenue, profitMargins, debtLevels, dividendPolicies

const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery');

class CompanyModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_company = 'companies';
        this.tbl_industry = 'industries';
    }

    async addCompany(company) {
        try {
            const companyExists = await this.findCompany(company.company_name);
            if (companyExists.length) {
                return Common.error('Company already exists');
            }

            // if stock_id is exists then do not insert the record in the stock table
            let stockExists = await runQuery(this.pool, `SELECT * FROM stocks WHERE stock_symbol = ?`, company.symbol);
            if (!stockExists.length) {
                if(!company.isin) {
                    return Common.error('ISIN is required');
                }

                stockExists = await runQuery(this.pool, `INSERT INTO stocks SET ?`, {
                    stock_symbol: company.symbol,
                    stock_name: company.company_name,
                    display_name: company.company_name,
                    isin: company.isin
                });
            }
            company.stock_id = stockExists[0].stock_id;

            let company_data = {
                company_name: company.company_name,
                stock_id: company.stock_id,
                industry_id: company.industry_id,
                company_description: company.company_description,
                company_website: company.company_website,
                company_logo: company.company_logo,
                notes: JSON.stringify(company.notes)
            };

            // check if the industry_id exists if not return error
            const industryExists = await runQuery(this.pool, `SELECT * FROM ${this.tbl_industry} WHERE industry_id = ?`, company.industry_id);
            if (!industryExists.length) {
                return Common.error('Industry does not exist');
            }
            const result = await runQuery(this.pool, `INSERT INTO ${this.tbl_company} SET ?`, company_data);
            if(result.affectedRows) {
                return Common.success('Company added successfully');
            }
            return Common.error('Failed to add company');
        } catch (error) {
            return Common.error(error);
        }
    }

    async removeCompany(company) {
        const result = await runQuery(this.pool, `DELETE FROM ${this.tbl_company} WHERE company_id = ?`, company.company_id);
        return result;
    }

    async getCompanies() {
        const result = await runQuery(this.pool, `SELECT * FROM ${this.tbl_company}`, []);
        return result;
    }

    async findCompany(name) {
        const result = await runQuery(this.pool, `SELECT * FROM ${this.tbl_company} WHERE company_name = ?`, name);
        return result;
    }

    async updateCompany(company) {
        const result = await runQuery(this.pool, `UPDATE ${this.tbl_company} SET ? WHERE company_id = ?`, [company, company.company_id]);
        return result;
    }

    async getCompanyById(company_id) {
        const result = await runQuery(this.pool, `SELECT * FROM ${this.tbl_company} WHERE company_id = ?`, company_id);
        return result;
    }

    async getCompaniesByIndustry(industry_id) {
        const result = await runQuery(this.pool, `SELECT * FROM ${this.tbl_company} WHERE industry_id = ?`, industry_id);
        return result;
    }

    async getCompanyWithDetails(company_id) {
        const result = await runQuery(this.pool, `SELECT * FROM ${this.tbl_company} WHERE company_id = ?`, company_id);
        return result;
    }

    async getCompanyWithFullDetails(company_id) {
        const company = await this.getCompanyWithDetails(company_id);
        if (!company.length) {
            return Common.error('Company not found');
        }

        const industryId = company[0].industry_id;
        const industry = await runQuery(this.pool, `SELECT * FROM ${this.tbl_industry} WHERE industry_id = ?`, industryId);
        company[0].industry_details = industry[0] || null;

        return company;
    }
}

module.exports = CompanyModal;