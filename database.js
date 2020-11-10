const mysql = require('mysql');
const pool  = mysql.createPool({
  connectionLimit : process.env.connectionLimit,
  host            : process.env.host,
  user            : process.env.user,
  password        : process.env.password,
  database        : process.env.database
});

module.exports = pool;