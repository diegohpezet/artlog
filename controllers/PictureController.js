const { cloudinaryUpload, cloudinaryRemoveImage } = require('../config/cloudinaryConfig');
const request = require('superagent');
const { User, Like, Picture } = require('../models')

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
      if (!req.files.image) {
        res.json({ error: "No se ha seleccionado ninguna imagen!!" })
      }
      const image = req.files.image
      const result = await cloudinaryUpload(image.tempFilePath)
      console.log(result)
      await Picture.create({ url: result.secure_url, user: req.user.id })
      res.json({ message: "Imagen subida exitosamente!" })
    } catch (error) {
      res.json({ error: `Error uploading image: ${error}` })
    }
  },

  download: async (req, res) => {
    const { id } = req.params
    try {
      const picture = await Picture.findByPk(id)
      if (picture) {
        res.set(
          'Content-Disposition',
          `attachment; filename=artlog_${id}.png`
        );

        await request(picture.url).pipe(res);
      } else {
        return res.status(404).json({ error: 'Picture not found' })
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error downloading picture' })
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    try {
      const picture = await Picture.findOne({id: id, user: userId});

      if (!picture) {
        return res.status(404).json({error: 'Picture not found!'});
      }

      // Remove picture from database
      await picture.destroy()

      // Remove picture from cloud
      const public_id = "artlog" + picture.url.replace(/\.[^/.]+$/, "").split("/artlog")[1]
      await cloudinaryRemoveImage(public_id)

      return res.status(200).json({message: 'Picture deleted successfully'});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: 'Error trying to delete picture'});
    }
  }
};

module.exports = PictureController;