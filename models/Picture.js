const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Like = require('./Like');

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
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  }
});

Picture.belongsTo(User, { foreignKey: 'user' });
Picture.hasMany(Like, { as: 'likedBy', foreignKey: 'picture' })

Picture.sync();

module.exports = Picture;