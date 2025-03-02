const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const inquiryController = require('../controllers/inquiryController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private
router.get('/', auth, inquiryController.getAllInquiries);

// @route   GET /api/inquiries/status/:status
// @desc    Get inquiries by status
// @access  Private
router.get('/status/:status', auth, inquiryController.getInquiriesByStatus);

// @route   GET /api/inquiries/:id
// @desc    Get inquiry by ID
// @access  Private
router.get('/:id', auth, inquiryController.getInquiryById);

// @route   POST /api/inquiries
// @desc    Create an inquiry
// @access  Public
router.post(
  '/',
  [
    upload.array('files', 5), // Allow up to 5 files
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('serviceType', 'Service type is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty()
  ],
  inquiryController.createInquiry
);

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status
// @access  Private
router.put(
  '/:id',
  [
    auth,
    check('status', 'Status is required').isIn(['pending', 'in-progress', 'completed', 'rejected'])
  ],
  inquiryController.updateInquiryStatus
);

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Private
router.delete('/:id', auth, inquiryController.deleteInquiry);

module.exports = router;