const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
  user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  picture: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Pictures',
      key: 'id'
    }
  }
}, {
  timestamps: false,
})

Like.sync({alter: true});

module.exports = Like;