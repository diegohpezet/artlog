const bcrypt = require('bcrypt');
const { User, Like, Picture } = require('../models')

const UserController = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getPictures: async (req, res) => {
    const { id } = req.params;
    try {
      const pictures = await Picture.findAll({
        where: { 
          user: id 
        }
      })

      if (!pictures) {
        return res.status(404).json({error: "Invalid user"})
      }
      
      return res.status(200).json(pictures)
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Internal server error"})
    }
  },

  getLikedPictures: async (req, res) => {
    const { id } = req.params;
    try {
      const likedPictures = await Like.findAll({
        where: { user: id },
        include: [{
          model: Picture,
          as: 'picture',
          include: [{
            model: User,
            as: 'user'
          }]
        }]
      })

      if (!likedPictures) {
        return res.status(404).json({error: "Invalid user"})
      }

      return res.status(200).json(likedPictures);
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Error retreiving pictures"})
    }
  },

  update: async (req, res) => {
    try {
      const { username, email } = req.body;
      await User.update({ username, email }, { where: { id: req.params.id } });
      res.json({ message: "User updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updatePassword: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await User.update({ password: hashedPassword }, { where: { id: req.params.id } });
      res.json({ message: "Password updated successfully!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await User.destroy({ where: { id: req.params.id } });
      res.json({ message: "User removed successfuly!" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  renderProfile: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.redirect('/')
      }
      return res.render('profile', { user });  
    } catch (error) {
      return res.redirect('/')
    }
  }
};

module.exports = UserController;