const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define user model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  defaultScope: {
    attributes: { exclude: ['password', 'email', 'createdAt', 'updatedAt'] }
  },
  scopes: {
    withPassword: {
      attributes: { }
    }
  }
});

User.sync();

module.exports = User;