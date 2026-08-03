require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

async function addResetFields() {
  try {
    await sequelize.authenticate();

    await sequelize.getQueryInterface().addColumn('users', 'resetToken', {
      type: DataTypes.STRING,
      allowNull: true
    });

    await sequelize.getQueryInterface().addColumn('users', 'resetTokenExpiry', {
      type: DataTypes.DATE,
      allowNull: true
    });

    console.log('Columns added successfully');

  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await sequelize.close();
  }
}

addResetFields();