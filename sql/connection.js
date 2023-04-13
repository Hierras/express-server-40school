// unificate for any desktop
const os = require('os');
require('dotenv').config();

const sqlConfig = {
  user: process.env.DB_LOGIN, // DB username
  password: process.env.DB_PASSWORD, // DB user password
  database: process.env.DB_NAME, // DB's name
  server: os.hostname() + '\\SQLEXPRESS', // server name
  options: {
    trustServerCertificate: true // change to true for local dev / self-signed certs
  } 
}

module.exports = sqlConfig;