const Content = require('../models/Content');
const { validationResult } = require('express-validator');

// @route   GET /api/content/:section
// @desc    Get content by section
// @access  Public
exports.getContentBySection = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/content
// @desc    Get all content
// @access  Private
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find().sort({ section: 1 });
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/content
// @desc    Create or update content
// @access  Private
exports.updateContent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { section, data } = req.body;

  try {
    // Check if content exists
    let content = await Content.findOne({ section });

    if (content) {
      // Update existing content
      content = await Content.findOneAndUpdate(
        { section },
        { $set: { data, updatedAt: Date.now() } },
        { new: true }
      );
    } else {
      // Create new content
      content = new Content({
        section,
        data
      });

      await content.save();
    }

    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/content/:section
// @desc    Delete content
// @access  Private
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findOne({ section: req.params.section });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    await Content.findOneAndRemove({ section: req.params.section });
    
    res.json({ message: 'Content removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};