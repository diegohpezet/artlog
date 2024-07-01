const express = require('express');
const router = express.Router();

// Import controller
const AuthController = require('../../controllers/AuthController');

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);
router.get('/signout', AuthController.signout);

module.exports = router