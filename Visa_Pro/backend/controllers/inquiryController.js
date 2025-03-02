const Inquiry = require('../models/Inquiry');
const { validationResult } = require('express-validator');

// @route   GET /api/inquiries
// @desc    Get all inquiries
// @access  Private
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/inquiries/:id
// @desc    Get inquiry by ID
// @access  Private
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    
    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/inquiries
// @desc    Create an inquiry
// @access  Public
exports.createInquiry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    email,
    phone,
    nationality,
    serviceType,
    message
  } = req.body;

  // Get file paths if any
  const files = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

  try {
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      nationality,
      serviceType,
      message,
      files
    });

    const inquiry = await newInquiry.save();
    
    // TODO: Send email notification to admin (can be implemented later)
    
    res.status(201).json(inquiry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/inquiries/:id
// @desc    Update inquiry status
// @access  Private
exports.updateInquiryStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, notes } = req.body;

  try {
    let inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    // Update status and notes
    inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          status, 
          notes: notes || inquiry.notes,
          updatedAt: Date.now() 
        } 
      },
      { new: true }
    );

    res.json(inquiry);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/inquiries/:id
// @desc    Delete an inquiry
// @access  Private
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await inquiry.remove();

    res.json({ message: 'Inquiry removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/inquiries/status/:status
// @desc    Get inquiries by status
// @access  Private
exports.getInquiriesByStatus = async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ status: req.params.status }).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};