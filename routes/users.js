const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Import controller
const UserController = require('../controllers/UserController');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', authenticateToken, UserController.update);
router.put('/:id/password', authenticateToken, UserController.updatePassword);
router.delete('/:id', authenticateToken, UserController.delete);

module.exports = router