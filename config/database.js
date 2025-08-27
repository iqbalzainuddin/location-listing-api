const fs = require("fs");
const path = require("path");

const { database } = require("./environment");

const databaseConfig = {
  username: database.username,
  password: database.password,
  database: database.name,
  host: database.host,
  port: database.port,
  dialect: "mysql",
  migrationStorageTableName: "migrations",
  dialectOptions: {
    ...(database.is_ssl && {
      ssl: {
        ca: fs.readFileSync(path.resolve(__dirname, "ssl", database.ca_cert))
      }
    })
  }
}

module.exports = {
  development: databaseConfig,
  test: databaseConfig,
  production: databaseConfig
}
