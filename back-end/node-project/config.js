const mysql = require('mysql2');
const config = {
  user: 'admin',
  password: 'admiN@123',
  host: 'localhost',
  database: 'ecommerce',
  port: 3306,
  options: {
    trustServerCertificate: true,
  },
};
const pool = mysql.createPool(config);
module.exports = pool;