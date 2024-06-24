const { cloudinaryUpload } = require('../config/cloudinaryConfig');
const request = require('superagent');
const {User, Like, Picture} = require('../models')

const PictureController = {
  getAll: async (req, res) => {
    try {
      const pictures = await Picture.findAll({
        include: [
          { model: User }, 
          { model: Like, as: 'likedBy' }
        ]
      });
      res.json(pictures);
    } catch (error) {
      console.log(error)
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
  },

  download: async (req, res) => {
    const { id } =req.params
    try {
      const picture = await Picture.findByPk(id)
      if (picture) {
        res.set(
          'Content-Disposition',
          `attachment; filename=artlog_${id}.png`
        );
      
        await request(picture.url).pipe(res);  
      } else {
        return res.status(404).json({error: 'Picture not found'})
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({error: 'Error downloading picture'})
    }
  }
};

module.exports = PictureController;