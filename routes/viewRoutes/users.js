const express = require('express');
const router = express.Router();

// Import user model
const { User } = require('../../models');

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