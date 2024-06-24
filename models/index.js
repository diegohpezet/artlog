const sequelize = require('../config/database');
const User = require('./User');
const Picture = require('./Picture');
const Like = require('./Like');

// Set up associations
User.hasMany(Picture, { foreignKey: 'user' });
Picture.belongsTo(User, { foreignKey: 'user' });

Picture.hasMany(Like, { as: 'likedBy', foreignKey: 'picture' });
Like.belongsTo(Picture, { foreignKey: 'picture' });

User.hasMany(Like, { foreignKey: 'user' });
Like.belongsTo(User, { foreignKey: 'user' });

// Sync models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = {
  sequelize,
  User,
  Picture,
  Like
};
