const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contentController = require('../controllers/contentController');
const auth = require('../middleware/auth');

// @route   GET /api/content/:section
// @desc    Get content by section
// @access  Public
router.get('/:section', contentController.getContentBySection);

// @route   GET /api/content
// @desc    Get all content
// @access  Private
router.get('/', auth, contentController.getAllContent);

// @route   POST /api/content
// @desc    Create or update content
// @access  Private
router.post(
  '/',
  [
    auth,
    check('section', 'Section is required').not().isEmpty(),
    check('data', 'Data is required').not().isEmpty()
  ],
  contentController.updateContent
);

// @route   DELETE /api/content/:section
// @desc    Delete content
// @access  Private
router.delete('/:section', auth, contentController.deleteContent);

module.exports = router;