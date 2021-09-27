const mysql = require("mysql2/promise");
if(!process.env.PRODUCTION) dotenv = require('dotenv').config()

const pool = mysql.createPool({
  connectionLimit : process.env.DB_CONLIMIT,
  host            : process.env.QOVERY_MYSQL_Z375F32C8_HOST,
  user            : process.env.QOVERY_MYSQL_Z375F32C8_LOGIN,
  password        : process.env.QOVERY_MYSQL_Z375F32C8_PASSWORD ,
  database        :process.env.QOVERY_MYSQL_Z375F32C8_DEFAULT_DATABASE ,
  port: process.env.QOVERY_MYSQL_Z375F32C8_PORT
})




let connection = {};

async function startConnection() {
  connection = await pool.getConnection((error, connect) => {
    if (error) throw error;
    return connect;
  });
}
async function query(query, params) {
  const [results] = await connection.execute(query, params);
  return results;
}

function dropConnection() {
  connection.release();
}

module.exports = {
  startConnection,
  query,
  dropConnection
};
