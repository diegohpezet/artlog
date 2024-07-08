const { Like } = require('../models');

const LikeController = {
  getUserLikedPictures: async (req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(403).json({error: "Error getting user"})
    }

    try {
      const likes = await Like.findAll({where: {
        user: user.id
      }})

      return res.status(200).json(likes);
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Error getting current user liked pictures"})
    }
  },
  like: async (req, res) => {
    const user = req.user;
    const { picture } = req.query;

    if (!user) {
      return res.status(403)
    }

    try {
      await Like.create({ user: user.id, picture, date: Date.now() });

      res.status(200)
    } catch (error) {
      res.json({error: `Error liking picture: ${error}`})
    }
  },
  unlike: async (req, res) => {
    const user = req.user;
    const { picture } = req.query;
    
    if (!user) {
      res.status(403).render('login', { error: "You need to login first!" })
    }

    try {
      await Like.destroy({ where: { user: user.id, picture } });

      res.status(200)
    } catch (error) {
      res.json({error: `Error unliking picture: ${error}`})
    }
  }
}

module.exports = LikeController