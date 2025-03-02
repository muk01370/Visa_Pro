const Blog = require('../models/Blog');
const { validationResult } = require('express-validator');

// @route   GET /api/blogs
// @desc    Get all blogs
// @access  Public
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ publishDate: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs/admin
// @desc    Get all blogs (including drafts) for admin
// @access  Private
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs/:id
// @desc    Get blog by ID
// @access  Public
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Only return published blogs to public
    if (blog.status !== 'published' && !req.headers['x-auth-token']) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/blogs
// @desc    Create a blog
// @access  Private
exports.createBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    content,
    imageUrl,
    author,
    tags,
    status
  } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      imageUrl,
      author,
      tags,
      status,
      publishDate: status === 'published' ? Date.now() : null
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/blogs/:id
// @desc    Update a blog
// @access  Private
exports.updateBlog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    content,
    imageUrl,
    author,
    tags,
    status
  } = req.body;

  // Build blog object
  const blogFields = {};
  if (title) blogFields.title = title;
  if (content) blogFields.content = content;
  if (imageUrl) blogFields.imageUrl = imageUrl;
  if (author) blogFields.author = author;
  if (tags) blogFields.tags = tags;
  if (status) {
    blogFields.status = status;
    // Set publish date if status changed to published
    if (status === 'published') {
      blogFields.publishDate = Date.now();
    }
  }
  blogFields.updatedAt = Date.now();

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update
    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blogFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/blogs/:id
// @desc    Delete a blog
// @access  Private
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();

    res.json({ message: 'Blog removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/blogs/tag/:tag
// @desc    Get blogs by tag
// @access  Public
exports.getBlogsByTag = async (req, res) => {
  try {
    const blogs = await Blog.find({ 
      tags: req.params.tag,
      status: 'published'
    }).sort({ publishDate: -1 });
    
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};