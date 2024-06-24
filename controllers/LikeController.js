const Like = require('../models/Like');

const LikeController = {
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