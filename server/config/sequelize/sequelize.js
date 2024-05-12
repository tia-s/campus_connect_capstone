require('dotenv').config();

const config = {
  dialect: process.env.DB_DIALECT,
  host: process.env.HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

module.exports = {
  development: { ...config, database: process.env.DB_DEV_NAME },
  test: { ...config, database: process.env.DB_TEST_NAME },
  production: { ...config, database: process.env.DB_PROD_NAME },
};

