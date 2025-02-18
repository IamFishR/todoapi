// filepath: e:\apps\api\todoapi\helper\dbQuery.js
/**
 * Helper function for obtaining a connection and running a query.
 * @param {object} pool - The database connection pool.
 * @param {string} query - The SQL query to execute.
 * @param {any} params - The parameters for the SQL query.
 * @returns {Promise<any>} A promise that resolves with the result of the query.
 */
function runQuery(pool, query, params) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            connection.query(query, params, (err, result) => {
                connection.release();
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    });
}

module.exports = runQuery;
