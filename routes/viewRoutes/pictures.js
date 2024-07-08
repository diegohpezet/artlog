const express = require('express');
const router = express.Router();

// Import picture model
const { Picture, User, Like } = require('../../models');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const picture = await Picture.findByPk(id, {
      include: [
        { model: User },
        { model: Like, as: 'likedBy' }
      ]
    });
    if (!picture) {
      return res.redirect('/')
    }
    return res.render('image', { picture });
  } catch (error) {
    return res.redirect('/');
  }
});

module.exports = router;