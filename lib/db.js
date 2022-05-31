// PG database client/connection setup
const { Client, Pool } = require("pg");
const dbParams = {};

if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
  dbParams.ssl = { rejectUnauthorized: false};
} else {
  dbParams.host = process.env.DB_HOST,
  dbParams.port = process.env.DB_PORT,
  dbParams.user = process.env.DB_USER,
  dbParams.password = process.env.DB_PASS,
  dbParams.database = process.env.DB_NAME
}

const db = (process.env.DATABASE_URL)
  ? new Client(dbParams)
  : new Pool(dbParams);

db.connect();

module.exports = db;
