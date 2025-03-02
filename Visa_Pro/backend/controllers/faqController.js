const FAQ = require('../models/FAQ');
const { validationResult } = require('express-validator');

// @route   GET /api/faqs
// @desc    Get all FAQs
// @access  Public
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/faqs/:id
// @desc    Get FAQ by ID
// @access  Public
exports.getFAQById = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);
    
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    
    res.json(faq);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/faqs
// @desc    Create a FAQ
// @access  Private
exports.createFAQ = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { question, answer, category, order } = req.body;

  try {
    const newFAQ = new FAQ({
      question,
      answer,
      category,
      order
    });

    const faq = await newFAQ.save();
    res.json(faq);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/faqs/:id
// @desc    Update a FAQ
// @access  Private
exports.updateFAQ = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { question, answer, category, order } = req.body;

  // Build FAQ object
  const faqFields = {};
  if (question) faqFields.question = question;
  if (answer) faqFields.answer = answer;
  if (category) faqFields.category = category;
  if (order !== undefined) faqFields.order = order;
  faqFields.updatedAt = Date.now();

  try {
    let faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    // Update
    faq = await FAQ.findByIdAndUpdate(
      req.params.id,
      { $set: faqFields },
      { new: true }
    );

    res.json(faq);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/faqs/:id
// @desc    Delete a FAQ
// @access  Private
exports.deleteFAQ = async (req, res) => {
  try {
    const faq = await FAQ.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    await faq.remove();

    res.json({ message: 'FAQ removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/faqs/category/:category
// @desc    Get FAQs by category
// @access  Public
exports.getFAQsByCategory = async (req, res) => {
  try {
    const faqs = await FAQ.find({ category: req.params.category }).sort({ order: 1, createdAt: -1 });
    res.json(faqs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};