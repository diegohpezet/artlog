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
const followRoutes = require('./follows');

router.use('/auth', authRoutes);
router.use('/pictures', pictureRoutes);
router.use('/users', userRoutes);
router.use('/likes', likeRoutes);
router.use('/follow', followRoutes);

module.exports = router