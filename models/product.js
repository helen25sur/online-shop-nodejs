const { Sequelize, DataTypes } = require('sequelize');

const sequelize = require('../db/database');

const Product = sequelize.define('product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Product;
