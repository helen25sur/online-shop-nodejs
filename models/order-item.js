const { DataTypes } = require('sequelize');

const sequelize = require('../db/database');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER
});

module.exports = OrderItem;