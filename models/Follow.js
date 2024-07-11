const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User')

const Follow = sequelize.define('Follow', {
  follower: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  following: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: false,
})

module.exports = Follow;