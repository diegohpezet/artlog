const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { User, Like } = require('./index')

// Define picture model
const Picture = sequelize.define('Picture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
        return this.getDataValue('tags').split(';')
    },
    set(val) {
       this.setDataValue('tags',val.join(';'));
    },
    defaultValue: ""
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
});

module.exports = Picture;