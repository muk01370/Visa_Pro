const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const faqController = require('../controllers/faqController');
const auth = require('../middleware/auth');

// @route   GET /api/faqs
// @desc    Get all FAQs
// @access  Public
router.get('/', faqController.getAllFAQs);

// @route   GET /api/faqs/category/:category
// @desc    Get FAQs by category
// @access  Public
router.get('/category/:category', faqController.getFAQsByCategory);

// @route   GET /api/faqs/:id
// @desc    Get FAQ by ID
// @access  Public
router.get('/:id', faqController.getFAQById);

// @route   POST /api/faqs
// @desc    Create a FAQ
// @access  Private
router.post(
  '/',
  [
    auth,
    check('question', 'Question is required').not().isEmpty(),
    check('answer', 'Answer is required').not().isEmpty()
  ],
  faqController.createFAQ
);

// @route   PUT /api/faqs/:id
// @desc    Update a FAQ
// @access  Private
router.put('/:id', auth, faqController.updateFAQ);

// @route   DELETE /api/faqs/:id
// @desc    Delete a FAQ
// @access  Private
router.delete('/:id', auth, faqController.deleteFAQ);

module.exports = router;