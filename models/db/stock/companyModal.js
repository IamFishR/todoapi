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
 *   CONSTRAINT `companies_ibfk_1` FOREIGN KEY (`industry_id`) REFERENCES `industry` (`industry_id`)
 * ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_swedish_ci;
 * 
 * @class CompanyModal
 * @classdesc This class provides methods to interact with the `companies` table.
 * @property {object} pool - The database connection pool.
 * @property {string} tbl_stock - The name of the table (`companies`).
 */
// revenue, profitMargins, debtLevels, dividendPolicies

const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery');

class CompanyModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_stock = 'companies';
    }

    addCompany(company) {
        return runQuery(this.pool, `INSERT INTO ${this.tbl_stock} SET ?`, company);
    }

    removeCompany(company) {
        return runQuery(this.pool, `DELETE FROM ${this.tbl_stock} WHERE company_id = ?`, company.company_id);
    }

    getCompanies() {
        return runQuery(this.pool, `SELECT * FROM ${this.tbl_stock}`, []);
    }

    findCompany(name) {
        return runQuery(this.pool, `SELECT * FROM ${this.tbl_stock} WHERE company_name = ?`, name);
    }

    updateCompany(company) {
        return runQuery(this.pool, `UPDATE ${this.tbl_stock} SET ? WHERE company_id = ?`, [company, company.company_id]);
    }

    getCompanyById(company_id) {
        return runQuery(this.pool, `SELECT * FROM ${this.tbl_stock} WHERE company_id = ?`, company_id);
    }
}

module.exports = CompanyModal;