const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

// @route   POST /api/auth/register
// @desc    Register a new admin
// @access  Private (super-admin only)
router.post(
  '/register',
  [
    auth,
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  authController.register
);

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', auth, authController.getMe);

module.exports = router;