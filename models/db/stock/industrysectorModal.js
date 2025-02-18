const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');

class IndustryModal {
    constructor() {
        this.pool = dbconnection;
        this.tbl_industries = 'industries';
        this.tbl_sectors = 'Sectors';
    }

    // industries table
    /**
     * industry_id
     * industry_name
     * sector_id
     */

    /**
     * Add Industry
     *  1. before adding check if sector exists
     *  2. if sector exists then add industry
     *  3. if sector does not exists then add sector and then add industry
     * @param {Object} industry
     */
    async addbulkIndustry(industries) {
        let unknownSectors = [];
        let existingIndustries = [];

        try {
            const insertData = [];

            for (const industry of industries) {
                // 1. Promisify the pool.query call for sector lookup
                const sectorResult = await new Promise((resolve, reject) => {
                    this.pool.query(
                        `SELECT sector_id FROM ${this.tbl_sectors} WHERE sector_name = ?`,
                        industry.sector,
                        (err, result) => {
                            if (err) {
                                reject(err); // Reject the Promise on error
                            } else {
                                resolve(result); // Resolve the Promise with the result
                            }
                        }
                    );
                });

                if (sectorResult.length === 0) {
                    unknownSectors.push(industry.sector);
                    continue;
                }

                const sector_id = sectorResult[0].sector_id;

                // 2. Promisify the pool.query call for industry lookup
                for (const key of Object.keys(industry.industries)) {
                    const industryResult = await new Promise((resolve, reject) => {
                        this.pool.query(
                            `SELECT industry_id FROM ${this.tbl_industries} WHERE industry_id = ?`,
                            key,
                            (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            }
                        );
                    });

                    if (industryResult.length > 0) {
                        existingIndustries.push(industry.industries[key]);
                    } else {
                        insertData.push([key, industry.industries[key], sector_id]);
                    }
                }
            }

            // 3. Promisify the bulk insert
            if (insertData.length > 0) {
                const insertQuery = `INSERT INTO ${this.tbl_industries} (industry_id, industry_name, sector_id) VALUES ?`;
                await new Promise((resolve, reject) => {
                    this.pool.query(insertQuery, [insertData], (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }

            return { message: 'Industries added successfully', existingIndustries, unknownSectors };
        } catch (err) {
            throw err;
        }
    }

    async getAllIndustries() {
        try {
            const sectors = await new Promise((resolve, reject) => {
                this.pool.query(`SELECT sector_id, sector_name FROM ${this.tbl_sectors}`, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            const industries = await new Promise((resolve, reject) => {
                this.pool.query(`SELECT industry_id, industry_name, sector_id FROM ${this.tbl_industries}`, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            const response = sectors.map(sector => {
                const sectorIndustries = industries.filter(industry => industry.sector_id === sector.sector_id);
                const industriesMap = sectorIndustries.reduce((acc, industry) => {
                    acc[industry.industry_id] = industry.industry_name;
                    return acc;
                }, {});
                return {
                    sector: sector.sector_name,
                    industries: industriesMap
                };
            });

            return response;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = IndustryModal;