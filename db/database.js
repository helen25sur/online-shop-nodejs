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

const sequelize = new Sequelize(
  process.env.DB_NAME || 'test', 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, { 
  dialect: 'mysql', 
  host: process.env.DB_HOST,
  port: 4000,
  dialectOptions: {
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true // Для безпеки краще тримати true
    }
  },
  logging: false // щоб не засмічувати консоль SQL-запитами
});

module.exports = sequelize;