const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Import controller
const UserController = require('../controllers/UserController');

router.use(authenticateToken)

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.get('/:id/pictures', UserController.getPictures);
router.get('/:id/pictures/liked', UserController.getLikedPictures);
router.get('/:id/profile', UserController.renderProfile);
router.put('/:id', UserController.update);
router.put('/:id/password', UserController.updatePassword);
router.delete('/:id', UserController.delete);

module.exports = router