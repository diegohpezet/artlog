const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const authenticateToken = require('../middlewares/authenticateToken');

// Import controller
const PictureController = require('../controllers/PictureController');

router.use(authenticateToken)

router.get('/', PictureController.getAll);
router.get('/:id', PictureController.getById);
router.get('/:id/download', PictureController.download);
router.post('/', fileUpload({useTempFiles: true}), PictureController.create);

module.exports = router