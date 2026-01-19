const { DataTypes } = require('sequelize');

const sequelize = require('../db/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER
});

module.exports = CartItem;