const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;