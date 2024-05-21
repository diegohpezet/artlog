const express = require('express');
const router = express.Router();

// Import controller
const AuthController = require('../controllers/AuthController');

router.post('/signin', AuthController.signin);
router.post('/signup', AuthController.signup);

module.exports = router