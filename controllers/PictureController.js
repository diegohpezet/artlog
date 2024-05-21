const Picture = require('../models/Picture');

const PictureController = {
  getAll: async (req, res) => {
    try {
      const pictures = await Picture.findAll();
      res.json(pictures);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving pictures' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const picture = await Picture.findByPk(id);
      if (picture) {
        res.json(picture);
      } else {
        res.status(404).json({ error: 'Picture not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Error retrieving picture' });
    }
  },

  create: async (req, res) => {
    const { title, tags } = req.body;
    const user = req.userId;
    try {
      const newPicture = await Picture.create({ title, tags, user });
      res.status(201).json(newPicture);
    } catch (error) {
      res.status(500).json({ error: 'Error creating picture' });
    }
  }
};

module.exports = PictureController;