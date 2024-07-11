const sequelize = require('../config/database');
const User = require('./User');
const Picture = require('./Picture');
const Like = require('./Like');
const Follow = require('./Follow');

// Set up associations
// A user can have many pictures, but a picture belongs to a single user
User.hasMany(Picture, { foreignKey: 'user', onDelete: 'CASCADE' });
Picture.belongsTo(User, { foreignKey: 'user' });

// A picture can be liked many times, but each like goes to a single picture
Picture.hasMany(Like, { as: 'likedBy', foreignKey: 'picture', onDelete: 'CASCADE' });
Like.belongsTo(Picture, { foreignKey: 'picture' });

// A user can like many pictures, but each like belongs to a single user
User.hasMany(Like, { foreignKey: 'user', onDelete: 'CASCADE' });
Like.belongsTo(User, { foreignKey: 'user' });

// A user may have many followers, and it can also follow many other users
User.hasMany(Follow, { foreignKey: 'follower', onDelete: 'CASCADE', as: 'Following' });
User.hasMany(Follow, { foreignKey: 'following', onDelete: 'CASCADE', as: 'Followers'});

Follow.belongsTo(User, {foreignKey: 'follower', as: 'FollowerUser' });
Follow.belongsTo(User, { foreignKey: 'following', as: 'FollowingUser' });

// Sync models
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

module.exports = {
  sequelize,
  User,
  Picture,
  Like,
  Follow
};
