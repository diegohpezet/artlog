const express = require('express');
const router = express.Router();

const authenticateToken = require('../../middlewares/authenticateToken');
const FollowController = require('../../controllers/FollowController');

router.use(authenticateToken);

router.get('/:id/followers', FollowController.getFollowers);
router.get('/:id/following', FollowController.getFollowing);
router.post('/:userToFollow', FollowController.follow);
router.delete('/:userToUnfollow', FollowController.unfollow);

module.exports = router;