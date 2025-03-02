const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

// @route   GET /api/services
// @desc    Get all services
// @access  Public
router.get('/', serviceController.getAllServices);

// @route   GET /api/services/featured
// @desc    Get featured services
// @access  Public
router.get('/featured', serviceController.getFeaturedServices);

// @route   GET /api/services/category/:category
// @desc    Get services by category
// @access  Public
router.get('/category/:category', serviceController.getServicesByCategory);

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
router.get('/:id', serviceController.getServiceById);

// @route   POST /api/services
// @desc    Create a service
// @access  Private
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('eligibility', 'Eligibility is required').not().isEmpty(),
    check('process', 'Process is required').not().isEmpty(),
    check('price', 'Price is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('country', 'Country is required').not().isEmpty()
  ],
  serviceController.createService
);

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private
router.put('/:id', auth, serviceController.updateService);

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;