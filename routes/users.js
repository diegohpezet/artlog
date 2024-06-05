const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');

// Import controller
const UserController = require('../controllers/UserController');

router.use(authenticateToken)

router.get('/', UserController.getAll);
router.get('/:id', UserController.getById);
router.put('/:id', UserController.update);
router.put('/:id/password', UserController.updatePassword);
router.delete('/:id', UserController.delete);

module.exports = router