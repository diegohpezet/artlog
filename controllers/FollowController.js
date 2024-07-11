const { Follow, User } = require('../models');


/**
 * Handles follow functionality
 */
const FollowController = {
  getFollowers: async (req, res) => {
    try {
      const { id } = req.params
      const followers = await Follow.findAll({
        where: { following: id },
        attributes: [],
        include: [{
          model: User,
          as: "FollowerUser",
        }],
      });

      return res.status(200).json(followers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error getting followers!" })
    }
  },

  getFollowing: async (req, res) => {
    try {
      const { id } = req.params
      const following = await Follow.findAll({
        where: { follower: id },
        attributes: [],
        include: [{
          model: User,
          as: 'FollowingUser',
        }]
      });

      return res.status(200).json(following);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Error getting followers!" })
    }
  },

  follow: async (req, res) => {
    const user = req.user;
    const { userToFollow } = req.params
    try {
      if (!user) {
        return res.status(403);
      }

      await Follow.create({ follower: user.id, following: userToFollow });
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" })
    }
  },

  unfollow: async (req, res) => {
    const user = req.user;
    const { userToUnfollow } = req.params
    try {
      if (!user) {
        return res.status(403);
      }

      await Follow.destroy({ where: { follower: user.id, following: userToUnfollow } });
      return res.status(200);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

module.exports = FollowController;