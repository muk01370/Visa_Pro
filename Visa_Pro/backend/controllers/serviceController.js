const Service = require('../models/Service');
const { validationResult } = require('express-validator');

// @route   GET /api/services
// @desc    Get all services
// @access  Public
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/services/:id
// @desc    Get service by ID
// @access  Public
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   POST /api/services
// @desc    Create a service
// @access  Private
exports.createService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description,
    eligibility,
    process,
    price,
    category,
    country,
    imageUrl,
    featured
  } = req.body;

  try {
    const newService = new Service({
      title,
      description,
      eligibility,
      process,
      price,
      category,
      country,
      imageUrl,
      featured
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Private
exports.updateService = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    description,
    eligibility,
    process,
    price,
    category,
    country,
    imageUrl,
    featured
  } = req.body;

  // Build service object
  const serviceFields = {};
  if (title) serviceFields.title = title;
  if (description) serviceFields.description = description;
  if (eligibility) serviceFields.eligibility = eligibility;
  if (process) serviceFields.process = process;
  if (price) serviceFields.price = price;
  if (category) serviceFields.category = category;
  if (country) serviceFields.country = country;
  if (imageUrl) serviceFields.imageUrl = imageUrl;
  if (featured !== undefined) serviceFields.featured = featured;
  serviceFields.updatedAt = Date.now();

  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update
    service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: serviceFields },
      { new: true }
    );

    res.json(service);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Private
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.remove();

    res.json({ message: 'Service removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/services/category/:category
// @desc    Get services by category
// @access  Public
exports.getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/services/featured
// @desc    Get featured services
// @access  Public
exports.getFeaturedServices = async (req, res) => {
  try {
    const services = await Service.find({ featured: true }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};