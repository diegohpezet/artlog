const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Import controller
const PictureController = require('../controllers/PictureController');

router.get('/', PictureController.getAll);
router.get('/:id', PictureController.getById);
router.post('/', authenticateToken, PictureController.create);

module.exports = router