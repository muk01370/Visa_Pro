const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const blogController = require('../controllers/blogController');
const auth = require('../middleware/auth');

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
router.get('/', blogController.getAllBlogs);

// @route   GET /api/blogs/admin
// @desc    Get all blogs (including drafts) for admin
// @access  Private
router.get('/admin', auth, blogController.getAllBlogsAdmin);

// @route   GET /api/blogs/tag/:tag
// @desc    Get blogs by tag
// @access  Public
router.get('/tag/:tag', blogController.getBlogsByTag);

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Public
router.get('/:id', blogController.getBlogById);

// @route   POST /api/blogs
// @desc    Create a blog
// @access  Private
router.post(
  '/',
  [
    auth,
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty()
  ],
  blogController.createBlog
);

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private
router.put('/:id', auth, blogController.updateBlog);

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;