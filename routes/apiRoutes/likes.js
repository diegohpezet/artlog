const express = require('express');
const router = express.Router();

const authenticateToken = require('../../middlewares/authenticateToken');
const LikeController = require('../../controllers/LikeController');

router.use(authenticateToken)

router.post('/', LikeController.like);
router.delete('/', LikeController.unlike);
router.get('/:id', LikeController.getUserLikedPictures);

module.exports = router;