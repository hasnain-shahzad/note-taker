const { Sequelize } = require('sequelize');
require('dotenv').config();

/**
 * Initializing connection to databse with sequelize
 */
const sequelize = new Sequelize({
    dialect: process.env.DB_DRIVER,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    logging: false,
    define: {
        timestamps: false
    }
});

module.exports = sequelize;