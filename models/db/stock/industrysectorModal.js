const dbconnection = require('../../../config/db');
const Common = require('../../../helper/common');
const runQuery = require('../../../helper/dbQuery'); // added helper

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
                // Use helper runQuery for sector lookup
                const sectorResult = await runQuery(this.pool, `SELECT sector_id FROM ${this.tbl_sectors} WHERE sector_name = ?`, industry.sector);
                if (sectorResult.length === 0) {
                    unknownSectors.push(industry.sector);
                    continue;
                }
                const sector_id = sectorResult[0].sector_id;

                // Industry lookup using helper runQuery
                for (const key of Object.keys(industry.industries)) {
                    const industryResult = await runQuery(this.pool, `SELECT industry_id FROM ${this.tbl_industries} WHERE industry_id = ?`, key);
                    if (industryResult.length > 0) {
                        existingIndustries.push(industry.industries[key]);
                    } else {
                        insertData.push([key, industry.industries[key], sector_id]);
                    }
                }
            }
            // Bulk insert using runQuery
            if (insertData.length > 0) {
                const insertQuery = `INSERT INTO ${this.tbl_industries} (industry_id, industry_name, sector_id) VALUES ?`;
                await runQuery(this.pool, insertQuery, [insertData]);
            }
            return { message: 'Industries added successfully', existingIndustries, unknownSectors };
        } catch (err) {
            throw err;
        }
    }

    async getAllIndustries() {
        try {
            const sectors = await runQuery(this.pool, `SELECT sector_id, sector_name FROM ${this.tbl_sectors}`, []);
            const industries = await runQuery(this.pool, `SELECT industry_id, industry_name, sector_id FROM ${this.tbl_industries}`, []);

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