require('dotenv').config();

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'candleaf',
//   password: process.env.DB_PASSWORD
// });

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('candleaf', 'root', process.env.DB_PASSWORD, { 
  dialect: 'mysql', 
  host: 'localhost'
});

module.exports = sequelize;