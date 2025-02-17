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

class CompanyModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_stock = 'companies';
    }

    addCompany(company) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`INSERT INTO ${this.tbl_stock} SET ?`, company, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }

    removeCompany(company) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`DELETE FROM ${this.tbl_stock} WHERE company_id = ?`, company.company_id, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }

    getCompanies() {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM ${this.tbl_stock}`, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }

    findCompany(name) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM ${this.tbl_stock} WHERE company_name = ?`, name, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }

    updateCompany(company) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`UPDATE ${this.tbl_stock} SET ? WHERE company_id = ?`, [company, company.company_id], (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }

    getCompanyById(company_id) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                }
                connection.query(`SELECT * FROM ${this.tbl_stock} WHERE company_id = ?`, company_id, (err, result) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        });
    }
}

module.exports = CompanyModal;