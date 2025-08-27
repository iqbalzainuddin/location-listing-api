const path = require("path");

require("dotenv").config();

const config = {
  app: {
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || "development"
  },
  database: {
    name: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    is_ssl: process.env.DB_IS_SSL && process.env.DB_IS_SSL.toLowerCase() === "true",
    ca_cert: process.env.DB_CA_CERT
  },
  redis: {
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  jwt: {
    secret_key: process.env.JWT_SECRET_KEY
  }
}

module.exports = config;