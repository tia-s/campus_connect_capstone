const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DEV_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.HOSTNAME,
  dialect: process.env.DB_DIALECT,
});

module.exports = sequelize;