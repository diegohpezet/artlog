const express = require('express');
const router = express.Router();

// Import user model
const { User } = require('../../models');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  const queryParams = {}
  try {
    const { username } = req.query;
    if (username) {
      queryParams.where = {
        username: {
          [Op.substring]: username
        }
      }
    }
    const users = await User.findAll(queryParams);
    console.log("users: ", users)
    return res.render('list', { title: "Found users", data: users });
  } catch (error) {
    console.error(error);
    return res.redirect('/')
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.redirect('/')
    }
    return res.render('profile', { user });
  } catch (error) {
    return res.redirect('/');
  }
});


module.exports = router;