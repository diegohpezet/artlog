const { cloudinaryUpload, cloudinaryRemoveImage } = require('../config/cloudinaryConfig');
const request = require('superagent');
const { User, Like, Picture } = require('../models')

const PictureController = {
  getAll: async (req, res) => {
    try {
      // Set options for query
      const queryOptions = {
        include: [
          { model: User },
          { model: Like, as: 'likedBy' }
        ],
        where: [],
        order: [
          ['createdAt', 'DESC']
        ]
      }

      // Filter pictures by user (optional)
      if (req.query.user) {
        queryOptions.where.push({ user: req.query.user });
      }

      // Filter pictures liked by some user
      if (req.query.likedBy) {
        queryOptions.include[1].where = req.query.likedBy ? { user: req.query.likedBy } : {}
      }

      // Run query and send data to client
      const pictures = await Picture.findAll(queryOptions);
      return res.status(200).json(pictures);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error retrieving pictures' });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const picture = await Picture.findByPk(id, {
        include: [{ model: User }]
      });
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
        return res.json({ error: "No se ha seleccionado ninguna imagen!!" })
      }
      const image = req.files.image
      const result = await cloudinaryUpload(image.tempFilePath)
      console.log("Categoria de la foto:", req.body.category);
      await Picture.create({ url: result.secure_url, user: req.user.id, category: req.body.category })
      return res.json({ message: "Imagen subida exitosamente!" })
    } catch (error) {
      return res.json({ error: `Error uploading image: ${error}` })
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
      const picture = await Picture.findOne({ id: id });

      if (!picture) {
        return res.status(404).json({ error: 'Picture not found!' });
      }

      if (picture.user == userId) {
        // Remove picture from database
        await picture.destroy()

        // Remove picture from cloud
        const public_id = "artlog" + picture.url.replace(/\.[^/.]+$/, "").split("/artlog")[1]
        await cloudinaryRemoveImage(public_id)

        return res.status(200).json({ message: 'Picture deleted successfully' });
      } else {
        return res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Error trying to delete picture' });
    }
  }
};

module.exports = PictureController;