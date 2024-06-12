const Picture = require('../models/Picture');
const User = require('../models/User');
const { cloudinaryUpload } = require('../config/cloudinaryConfig');

const PictureController = {
  getAll: async (req, res) => {
    try {
      const pictures = await Picture.findAll({
        include: [User]
      });
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
    try {
      if(!req.files.image) {
        res.json({error: "No se ha seleccionado ninguna imagen!!"})
      }
      const image = req.files.image
      const result = await cloudinaryUpload(image.tempFilePath)
      await Picture.create({url: result.secure_url, user: req.user.id})
      res.json({message: "Imagen subida exitosamente!"})
    } catch (error) {
      res.json({error: `Error uploading image: ${error}`})
    }
  }
};

module.exports = PictureController;