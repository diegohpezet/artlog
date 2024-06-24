const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Picture = require('./Picture');
const User = require('./User')

const Like = sequelize.define('Like', {
  user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  picture: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Picture,
      key: 'id'
    }
  }
}, {
  timestamps: false,
})

module.exports = Like;