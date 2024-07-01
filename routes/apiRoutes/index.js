const express = require('express');
const router = express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');

// Authentication middleware
router.use(authenticateToken)

// Import views
const authRoutes = require('./auth');
const pictureRoutes = require('./pictures');
const userRoutes = require('./users');
const likeRoutes = require('./likes');

router.use('/auth', authRoutes);
router.use('/pictures', pictureRoutes);
router.use('/users', userRoutes);
router.use('/likes', likeRoutes);


router.get('/', (req, res) => {
  res.render("index", { user: req.user});
});

module.exports = router