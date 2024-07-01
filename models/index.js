const sequelize = require('../config/database');
const User = require('./User');
const Picture = require('./Picture');
const Like = require('./Like');

// Set up associations
User.hasMany(Picture, { foreignKey: 'user', onDelete: 'CASCADE' });
Picture.belongsTo(User, { foreignKey: 'user' });

Picture.hasMany(Like, { as: 'likedBy', foreignKey: 'picture', onDelete: 'CASCADE' });
Like.belongsTo(Picture, { foreignKey: 'picture' });

User.hasMany(Like, { foreignKey: 'user', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'user' });

// Sync models
sequelize.sync({alter: true})
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = {
  sequelize,
  User,
  Picture,
  Like
};
