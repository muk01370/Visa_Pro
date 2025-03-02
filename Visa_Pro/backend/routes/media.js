const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/media
// @desc    Get all media files
// @access  Private
router.get('/', auth, mediaController.getAllMedia);

// @route   POST /api/media/upload
// @desc    Upload a file
// @access  Private
router.post('/upload', [auth, upload.single('file')], mediaController.uploadFile);

// @route   POST /api/media/uploads
// @desc    Upload multiple files
// @access  Private
router.post('/uploads', [auth, upload.array('files', 10)], mediaController.uploadMultipleFiles);

// @route   DELETE /api/media/:filename
// @desc    Delete a media file
// @access  Private
router.delete('/:filename', auth, mediaController.deleteFile);

module.exports = router;