const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection pool to the database
const connection = mysql.createPool({
  connectionLimit: 150,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;