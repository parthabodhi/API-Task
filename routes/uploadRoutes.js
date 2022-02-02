const express = require('express');

const upload = require('../Middleware/Multer');

const router = express.Router();

const uploadController = require('../controllers/uploadController');

router.post('/single', upload.single('filename'), uploadController.uploader);

module.exports = router;
